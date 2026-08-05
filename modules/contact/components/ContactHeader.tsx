'use client'

interface ContactHeaderProps {
  t: any
}

export default function ContactHeader({ t }: ContactHeaderProps) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-7 border border-white/10 space-y-3 group text-center flex flex-col items-center justify-center">
      <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-pink-500 mb-1 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 inline-block">
        {t.contactSec.tag}
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold gradient-text">
        {t.contactSec.heading}
      </h2>
      <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
        {t.contactSec.description}
      </p>
    </div>
  )
}
