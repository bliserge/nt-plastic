type ManufacturingStep = { no: string; title: string; description: string }
import { Reveal } from '@/components/reveal'

export function ProcessSteps({ invert = false, manufacturingSteps }: { invert?: boolean; manufacturingSteps: ManufacturingStep[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-border sm:grid-cols-2 lg:grid-cols-4">
      {manufacturingSteps.map((step, i) => (
        <Reveal
          key={step.no}
          delay={i * 60}
          className={
            invert
              ? 'bg-industrial-muted p-6 text-industrial-foreground'
              : 'bg-card p-6'
          }
        >
          <span className="font-mono text-sm font-bold text-nt-green">{step.no}</span>
          <h3
            className={`mt-3 font-display text-lg font-bold ${invert ? 'text-industrial-foreground' : 'text-foreground'}`}
          >
            {step.title}
          </h3>
          <p
            className={`mt-2 text-sm leading-relaxed ${invert ? 'text-industrial-foreground/65' : 'text-muted-foreground'}`}
          >
            {step.description}
          </p>
        </Reveal>
      ))}
    </div>
  )
}
