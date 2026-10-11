import React, { useState } from 'react'
import { Phone, MessageCircle, Copy, Check } from 'lucide-react'
import { CornerFlourish, GoldDivider, FloralMotif } from './DecorativeOrnaments'

export const RsvpSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // Exactly the 3 numbers specified by the user, without any host names as strictly instructed
  const rsvpContacts = [
    {
      formatted: '0317 3450477',
      international: '+92 317 3450477',
      clean: '923173450477',
    },
    {
      formatted: '0301 2568746',
      international: '+92 301 2568746',
      clean: '923012568746',
    },
    {
      formatted: '0311 8402191',
      international: '+92 311 8402191',
      clean: '923118402191',
    },
  ]

  const handleCopy = (num: string, idx: number) => {
    navigator.clipboard.writeText(num)
    setCopiedIndex(idx)
    setTimeout(() => setCopiedIndex(null), 2500)
  }

  return (
    <section id="rsvp" className="px-2 sm:px-4 py-3 sm:py-6 max-w-2xl mx-auto">
      <div className="relative glass-gold-card luxury-frame rounded-3xl p-5 sm:p-10 shadow-card hover:shadow-2xl transition-all duration-500">
        <CornerFlourish position="top-left" />
        <CornerFlourish position="top-right" />
        <CornerFlourish position="bottom-left" />
        <CornerFlourish position="bottom-right" />

        <div className="text-center space-y-1.5 sm:space-y-2">
          {/* Clean RSVP title without host names, adhering strictly to user request */}
          <h3 className="font-serif text-3xl sm:text-4xl text-[#142A24] font-medium pt-1">
            R.S.V.P
          </h3>
          <p className="font-serif italic text-xs sm:text-sm text-[#6B655B] max-w-md mx-auto px-2">
            Please kindly confirm your presence at your earliest convenience via call or WhatsApp.
          </p>
        </div>

        <GoldDivider className="my-3 sm:my-5" />

        {/* 3 Contact Numbers Cards */}
        <div className="space-y-3.5 my-4 sm:my-6">
          {rsvpContacts.map((contact, index) => {
            const waDefaultText = encodeURIComponent(
              "Assalam-o-Alaikum, confirming attendance for Omar & Sabika's Walima Reception on 28th December at Sofitel."
            )
            const waUrl = `https://wa.me/${contact.clean}?text=${waDefaultText}`
            const telUrl = `tel:${contact.clean}`

            return (
              <div
                key={contact.clean}
                className="group flex flex-col sm:flex-row items-center justify-between p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-[#FAF7F2] to-white border border-[#C5A059]/35 shadow-sm hover:border-[#C5A059]/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 gap-3"
              >
                {/* Number info */}
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#FAF5EA] border border-[#C5A059]/40 flex items-center justify-center text-[#B08841] shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="font-serif font-bold text-lg sm:text-xl text-[#142A24] tracking-wide block tabular-nums">
                      {contact.formatted}
                    </span>
                    <span className="text-[11px] font-sans text-[#8E6B2C] font-medium">
                      {contact.international}
                    </span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {/* WhatsApp Button */}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-sans font-semibold shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                    aria-label={`WhatsApp ${contact.formatted}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Direct Call Button */}
                  <a
                    href={telUrl}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#142A24] hover:bg-[#1E3B33] text-[#E5C378] text-xs font-sans font-semibold shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                    aria-label={`Call ${contact.formatted}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(contact.formatted, index)}
                    className="p-2.5 rounded-xl border border-[#C5A059]/40 bg-white/80 hover:bg-[#FAF5EA] text-[#6B655B] hover:text-[#142A24] transition-all active:scale-90 cursor-pointer shadow-xs"
                    title="Copy number"
                    aria-label={`Copy number ${contact.formatted}`}
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-emerald-600 animate-in zoom-in-50" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <FloralMotif className="mt-4 sm:mt-6 opacity-75" />
      </div>
    </section>
  )
}

export default RsvpSection
