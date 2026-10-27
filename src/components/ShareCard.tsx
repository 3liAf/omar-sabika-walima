import React, { useState } from 'react'
import { Share2, Link2, Check, MessageCircle, Heart } from 'lucide-react'

export const ShareCard: React.FC = () => {
  const [copied, setCopied] = useState(false)

  const shareText = encodeURIComponent(
    "💍 Walima Invitation\n\nYou are cordially invited to celebrate the Walima reception of Omar S/o Afzal Yousaf & Sabika D/o Shahzad Ahmed.\n\n📅 Date: Monday, 28th December\n🕒 Time: 1:00 – 4:00 PM\n📍 Venue: Sofitel (1st Floor)\n\nView the interactive wedding invitation webpage here:"
  )

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleWhatsAppShare = () => {
    const waUrl = `https://wa.me/?text=${shareText}%20${encodeURIComponent(window.location.href)}`
    window.open(waUrl, '_blank')
  }

  return (
    <div className="px-4 py-8 max-w-md mx-auto text-center">
      <div className="p-6 rounded-3xl bg-white/80 border border-[#C5A059]/30 shadow-md backdrop-blur-sm space-y-4">
        <div className="w-10 h-10 rounded-full bg-[#FAF5EA] border border-[#C5A059]/40 text-[#B08841] flex items-center justify-center mx-auto">
          <Share2 className="w-4 h-4" />
        </div>

        <div>
          <h4 className="font-serif text-lg font-bold text-[#142A24]">
            Share Invitation With Family
          </h4>
          <p className="text-xs text-[#6B655B] font-sans mt-0.5">
            Forward this elegant card to beloved relatives and friends
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
          <button
            onClick={handleWhatsAppShare}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-sans text-xs font-semibold shadow transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share via WhatsApp</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#C5A059]/40 bg-white hover:bg-[#FAF5EA] text-[#142A24] font-sans text-xs font-semibold shadow-sm transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4 text-[#B08841]" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer Signature */}
      <footer className="mt-8 text-center space-y-2 pb-12">
        <div className="flex items-center justify-center gap-1.5 text-xs font-serif text-[#8E6B2C]">
          <span>With warmest regards &amp; prayers</span>
          <Heart className="w-3.5 h-3.5 fill-[#B08841] text-[#B08841]" />
        </div>
        <p className="font-serif text-sm font-semibold text-[#142A24]">
          Omar &amp; Sabika
        </p>
        <p className="text-[11px] font-sans text-[#8E6B2C]/70">
          28th December 2026 • Sofitel (1st Floor)
        </p>
      </footer>
    </div>
  )
}
