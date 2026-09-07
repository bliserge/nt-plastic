import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

const toEmail = process.env.MAIL_TO || 'ntplasticindustries@gmail.com'
const smtpUser = process.env.SMTP_USER || 'ntplasticindustries@gmail.com'

function buildMessageBody(payload: Record<string, string>) {
  const lines = Object.entries(payload)
    .filter(([, value]) => value && value.trim() !== '')
    .map(([label, value]) => `${label}: ${value}`)

  return lines.join('\n')
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const fullName = String(formData.get('fullName') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const inquiryType = String(formData.get('inquiryType') ?? '').trim()
    const message = String(formData.get('additionalRequirements') ?? '').trim()

    if (!fullName || !email || !message) {
      return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 })
    }

    const attachments = formData
      .getAll('attachments')
      .filter((item): item is File => item instanceof File && item.size > 0)
      .map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      }))

    const payload = {
      fullName,
      company: String(formData.get('company') ?? '').trim(),
      email,
      phone: String(formData.get('phone') ?? '').trim(),
      country: String(formData.get('country') ?? '').trim(),
      inquiryType,
      productCategory: String(formData.get('productCategory') ?? '').trim(),
      product: String(formData.get('product') ?? '').trim(),
      quantity: String(formData.get('quantity') ?? '').trim(),
      projectType: String(formData.get('projectType') ?? '').trim(),
      deliveryLocation: String(formData.get('deliveryLocation') ?? '').trim(),
      message,
      attachments: attachments.map((attachment) => `${attachment.name} (${attachment.type}, ${attachment.size} bytes)`).join(', ') || 'None',
      receivedAt: new Date().toISOString(),
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
    const smtpPort = Number(process.env.SMTP_PORT || '465')
    const smtpSecure = process.env.SMTP_SECURE !== 'false'
    const smtpPass = process.env.SMTP_PASS

    if (!smtpPass) {
      return NextResponse.json(
        {
          error:
            'Email is not configured. Add SMTP_USER and SMTP_PASS to your environment variables before submitting the form.',
        },
        { status: 500 },
      )
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const mailInfo = await transporter.sendMail({
      from: `NT Plastic Industries Website <${smtpUser}>`,
      to: toEmail,
      replyTo: `${fullName} <${email}>`,
      subject: `[Website Contact] ${inquiryType || 'General Inquiry'} from ${fullName}`,
      text: buildMessageBody(payload),
      html: `
        <h2>New contact inquiry</h2>
        <p><strong>Inquiry type:</strong> ${inquiryType || 'General Inquiry'}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${payload.company || '—'}</p>
        <p><strong>Phone:</strong> ${payload.phone || '—'}</p>
        <p><strong>Country:</strong> ${payload.country || '—'}</p>
        <p><strong>Delivery location:</strong> ${payload.deliveryLocation || '—'}</p>
        <p><strong>Product category:</strong> ${payload.productCategory || '—'}</p>
        <p><strong>Product:</strong> ${payload.product || '—'}</p>
        <p><strong>Quantity:</strong> ${payload.quantity || '—'}</p>
        <p><strong>Project type:</strong> ${payload.projectType || '—'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
        <p><strong>Attachments:</strong> ${payload.attachments || 'None'}</p>
        <p><strong>Received at:</strong> ${payload.receivedAt}</p>
      `,
    })

    console.log('[contact-inquiry]', payload)
    console.log('[contact-email-sent]', mailInfo.messageId)

    return NextResponse.json({ ok: true, messageId: mailInfo.messageId })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to process request.' },
      { status: 500 },
    )
  }
}
