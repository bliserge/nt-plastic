import { NextResponse } from 'next/server'

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
      attachments,
      receivedAt: new Date().toISOString(),
    }

    console.log('[contact-inquiry]', payload)

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to process request.' },
      { status: 500 },
    )
  }
}
