import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { Sparkles, Heart } from 'lucide-react'

interface EnvelopeModalProps {
  isOpen: boolean
  onOpen: () => void
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({ isOpen, onOpen }) => {
  const [openingStage, setOpeningStage] = useState<number>(0) // 0: closed, 1: seal pop, 2: flap open & card slide, 3: fade out

  const handleOpenEnvelope = () => {
    if (openingStage > 0) return

    // Stage 1: Wax seal pop & shine
    setOpeningStage(1)

    // Trigger celebratory royal gold and emerald confetti
    try {
      setTimeout(() => {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#D4AF37', '#E5C378', '#FAF7F2', '#142A24', '#B08841', '#25D366'],
        })
      }, 300)
    } catch {
      // Confetti fallback
    }

    // Stage 2: Flap flips open and inner card slides upward
    setTimeout(() => {
      setOpeningStage(2)
    }, 200)

    // Stage 3: Smooth dissolve to reveal main page
    setTimeout(() => {
      setOpeningStage(3)
    }, 1100)

    // Completion callback
    setTimeout(() => {
      onOpen()
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A1411]/92 backdrop-blur-md transition-opacity duration-700 ${
        openingStage === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div
        className={`relative w-full max-w-[340px] sm:max-w-md mx-auto transition-all duration-700 ease-out ${
          openingStage === 3
            ? 'scale-105 opacity-0 -translate-y-8'
            : 'scale-100 opacity-100 translate-y-0'
        }`}
      >
        {/* Ambient golden halo */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#C5A059]/25 via-[#E5C378]/35 to-[#9A782D]/25 rounded-3xl blur-2xl -z-10 animate-pulse-slow" />

        {/* Envelope Outer Case */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#1A332C] to-[#0D1C17] border-2 border-[#C5A059]/50 shadow-2xl p-5 sm:p-7 text-center overflow-hidden">
          {/* Subtle gold ornamental filigree background */}
          <div className="absolute inset-2 border border-[#C5A059]/25 rounded-2xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C5A059]/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#C5A059]/20 via-transparent to-transparent pointer-events-none" />

          {/* Top header badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#142A24] border border-[#C5A059]/40 mb-3 sm:mb-4 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#E5C378] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#E5C378] font-medium">
              Royal Wedding Invitation
            </span>
          </div>

          {/* Subtitle */}
          <p className="font-serif italic text-xs sm:text-sm text-[#D8B266] mb-1 tracking-wide">
            You are cordially invited to celebrate the Walima of
          </p>

          {/* Couple Names Preview */}
          <h2 className="font-serif text-2xl sm:text-4xl text-white font-medium tracking-wide mb-1">
            Omar &amp; Sabika
          </h2>
          <p className="text-[11px] sm:text-xs font-sans tracking-widest text-[#E5C378]/80 uppercase mb-4 sm:mb-6">
            28th December • Sofitel
          </p>

          {/* Realistic 3D Interactive Sealed Envelope Container */}
          <div className="relative my-3 sm:my-5 flex flex-col items-center justify-center perspective-1000">
            <div className="relative w-64 sm:w-72 h-40 sm:h-44">
              {/* Envelope Back Wall */}
              <div className="absolute inset-0 bg-[#0F201B] rounded-xl border border-[#C5A059]/40 shadow-2xl overflow-hidden">
                {/* Royal damask pattern inside envelope lining */}
                <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />
              </div>

              {/* The Inner Invitation Card (slides smoothly out of pocket) */}
              <div
                className={`absolute inset-x-4 sm:inset-x-5 h-32 sm:h-36 bg-gradient-to-b from-[#FAF7F2] to-[#F5EFE6] rounded-t-lg border-t-2 border-x border-[#C5A059]/70 shadow-lg flex flex-col items-center justify-center px-3 py-2 text-center transition-all duration-700 ease-out z-10 ${
                  openingStage >= 2
                    ? '-translate-y-20 scale-105 shadow-2xl'
                    : 'top-2 translate-y-0 scale-100'
                }`}
              >
                <div className="flex items-center gap-1 text-[#8E6B2C] mb-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#B08841]" />
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-bold">
                    Walima Reception
                  </span>
                  <Sparkles className="w-2.5 h-2.5 text-[#B08841]" />
                </div>
                <span className="font-serif text-sm sm:text-base text-[#142A24] font-bold tracking-tight">
                  Omar &amp; Sabika
                </span>
                <span className="text-[9px] font-sans text-[#8E6B2C] mt-0.5">
                  Sunday, 28th December • Sofitel
                </span>
              </div>

              {/* Front Pocket of Envelope (hardware-accelerated CSS clip-paths) */}
              {/* Left Pocket Fold */}
              <div
                className="absolute inset-0 z-20 pointer-events-none bg-[#142822] border-l border-[#C5A059]/30 rounded-b-xl"
                style={{ clipPath: 'polygon(0 0, 50% 60%, 0 100%)' }}
              />
              {/* Right Pocket Fold */}
              <div
                className="absolute inset-0 z-20 pointer-events-none bg-[#162E27] border-r border-[#C5A059]/30 rounded-b-xl"
                style={{ clipPath: 'polygon(100% 0, 50% 60%, 100% 100%)' }}
              />
              {/* Bottom Pocket Fold */}
              <div
                className="absolute inset-0 z-20 pointer-events-none bg-[#10201A] border-b border-[#C5A059]/40 rounded-b-xl shadow-lg"
                style={{ clipPath: 'polygon(0 100%, 50% 52%, 100% 100%)' }}
              />

              {/* Top Triangular Flap (flips upward 180 degrees in 3D) */}
              <div
                className="absolute top-0 inset-x-0 h-[105px] z-30 origin-top pointer-events-none transition-transform duration-700 ease-out preserve-3d"
                style={{
                  transformOrigin: 'top center',
                  transform: openingStage >= 2 ? 'rotateX(180deg)' : 'rotateX(0deg)',
                }}
              >
                <div
                  className="w-full h-full bg-gradient-to-b from-[#1C3A31] to-[#152B24] border-t border-[#C5A059]/50 shadow-xl"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
                  }}
                />
              </div>

              {/* Royal Wax Seal Button (centered right over the flap tip) */}
              <button
                onClick={handleOpenEnvelope}
                className={`absolute left-1/2 -translate-x-1/2 z-40 group cursor-pointer focus:outline-none transition-all duration-500 ${
                  openingStage >= 2
                    ? 'top-[90px] scale-110 opacity-0 pointer-events-none'
                    : 'top-[75px] scale-100 hover:scale-105 active:scale-95'
                }`}
                aria-label="Open wedding invitation"
              >
                <div className="relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full wax-seal-gold border-2 border-[#F4E8D0] shadow-2xl">
                  <div className="absolute inset-1 rounded-full border border-dashed border-[#5B4113]/40" />
                  <div className="text-center">
                    <span className="font-serif font-extrabold text-xs sm:text-sm text-[#46310D] tracking-tighter block leading-none select-none">
                      O &amp; S
                    </span>
                    <Heart className="w-2.5 h-2.5 fill-[#6E1215] text-[#6E1215] mx-auto mt-0.5" />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Action prompt with foil sheen */}
          <div className="mt-6 pt-2">
            <button
              onClick={handleOpenEnvelope}
              disabled={openingStage > 0}
              className="foil-sheen-container w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D8B266] via-[#F3DFAC] to-[#B08841] text-[#142A24] font-sans font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-[#C5A059]/25 hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <div className="foil-sheen-overlay" />
              <span className="relative z-10">
                {openingStage > 0 ? 'Unsealing Invitation...' : 'Tap to Open Invitation'}
              </span>
              <Sparkles className="w-4 h-4 text-[#142A24] relative z-10 group-hover:rotate-12 transition-transform" />
            </button>
            <p className="text-[11px] font-sans text-[#E5C378]/70 mt-2.5">
              Best experienced with audio turned on (Halal Duff • دف)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnvelopeModal
