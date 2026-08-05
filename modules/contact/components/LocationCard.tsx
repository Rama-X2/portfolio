'use client'

import { MapPin, ExternalLink } from 'lucide-react'

interface LocationCardProps {
  t: any
}

export default function LocationCard({ t }: LocationCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)] transition-all relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-xl pointer-events-none" />
      <div className="flex items-start gap-4">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          <MapPin className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
            {t.contactSec.locationTag}
          </span>
          <h3 className="font-bold text-white text-base md:text-lg">
            {t.contactSec.locationHeading}
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            {t.contactSec.locationDesc}
          </p>
          <a
            href="https://maps.google.com/?q=Sukabumi,Jawa+Barat"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors pt-2"
          >
            <span>{t.contactSec.openMaps}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
