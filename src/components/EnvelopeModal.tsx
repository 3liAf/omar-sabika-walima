import React, { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { Sparkles, Heart } from 'lucide-react'

interface EnvelopeModalProps {
  isOpen: boolean
  onOpen: () => void
}

// Stages: 1 seal cracks · 2 flap lifts · 3 letter rises · 4 fly into the letter
const STAGE_TIMES = [0, 320, 880, 1750]
const DONE_AT = 2450

const SealFace: React.FC = () => (
  <div className="relative flex items-center justify-center w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full wax-seal-gold border-2 border-[#F4E8D0]">
    <div className="absolute inset-1 rounded-full border border-dashed border-[#5B4113]/40" />
    <div className="text-center">
      <span className="font-serif font-extrabold text-xs sm:text-sm text-[#46310D] tracking-tighter block leading-none select-none">
        O &amp; S
      </span>
      <Heart className="w-2.5 h-2.5 fill-[#6E1215] text-[#6E1215] mx-auto mt-0.5" />
    </div>
  </div>
)

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({ isOpen, onOpen }) => {
  const [stage, setStage] = useState(0)
  const timers = useRef<number[]>([])
  const sealRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) setStage(0)
    return () => timers.current.forEach(clearTimeout)
  }, [isOpen])

  const handleOpenEnvelope = () => {
    if (stage > 0) return
    sealRef.current?.blur()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onOpen()
      return
    }
    STAGE_TIMES.forEach((t, i) => timers.current.push(window.setTimeout(() => setStage(i + 1), t)))
    timers.current.push(
      window.setTimeout(() => {
        try {
          const gold = ['#D4AF37', '#E5C378', '#F3DFAC', '#FAF7F2', '#B08841']
          confetti({ particleCount: 70, spread: 75, startVelocity: 32, origin: { y: 0.45 }, colors: gold, scalar: 0.9 })
          confetti({ particleCount: 30, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: gold })
          confetti({ particleCount: 30, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: gold })
        } catch {
          // Confetti is decorative only
        }
      }, STAGE_TIMES[2] + 120)
    )
    timers.current.push(window.setTimeout(onOpen, DONE_AT))
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation envelope"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A1411]/92 backdrop-blur-md transition-opacity duration-700 ${
        stage >= 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div
        className="relative w-full max-w-[340px] sm:max-w-md mx-auto transition-all duration-700 ease-[cubic-bezier(.7,0,.3,1)]"
        style={stage >= 4 ? { transform: 'scale(1.55)', opacity: 0, filter: 'blur(6px)' } : undefined}
      >
        {/* Ambient golden halo */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#C5A059]/25 via-[#E5C378]/35 to-[#9A782D]/25 rounded-3xl blur-2xl -z-10 animate-pulse-slow" />

        {/* Envelope Outer Case */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#1A332C] to-[#0D1C17] border-2 border-[#C5A059]/50 shadow-2xl p-5 sm:p-7 text-center overflow-hidden">
          <div className="absolute inset-2 border border-[#C5A059]/25 rounded-2xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C5A059]/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#C5A059]/20 via-transparent to-transparent pointer-events-none" />

          {/* Header copy fades as the envelope opens */}
          <div className={`transition-all duration-500 ${stage >= 2 ? 'opacity-0 -translate-y-2' : 'opacity-100'}`}>
            <div className="foil-sheen-container inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#142A24] border border-[#C5A059]/40 mb-3 sm:mb-4 shadow-sm">
              <div className="foil-sheen-overlay" />
              <Sparkles className="w-3 h-3 text-[#E5C378]" />
              <span className="text-[10px] sm:text-[11px] font-cinzel uppercase tracking-[0.22em] text-[#E5C378] font-medium">
                Walima Invitation
              </span>
            </div>
            <p className="font-serif italic text-[13px] sm:text-sm text-[#D8B266] mb-1 tracking-wide">
              You are cordially invited to celebrate the Walima of
            </p>
            <h2 className="font-serif text-[30px] sm:text-4xl text-white font-medium tracking-wide mb-1 leading-tight">
              Omar <span className="font-script text-[#E5C378] text-[34px] sm:text-[40px] px-0.5">&amp;</span> Sabika
            </h2>
            <p className="text-[11px] sm:text-xs font-cinzel tracking-[0.22em] text-[#E5C378]/80 uppercase mb-4 sm:mb-6">
              Monday · 28 December · Sofitel
            </p>
          </div>

          {/* 3D sealed envelope */}
          <div className="relative mt-16 mb-3 sm:mt-20 sm:mb-5 flex flex-col items-center justify-center perspective-1000">
            <div className={`relative w-64 sm:w-72 h-40 sm:h-44 ${stage === 0 ? 'env-float' : ''}`}>
              {/* Back wall with damask lining */}
              <div className="absolute inset-0 bg-[#0F201B] rounded-xl border border-[#C5A059]/40 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />
              </div>

              {/* The letter: rises out of the pocket */}
              <div
                className="absolute inset-x-4 sm:inset-x-5 top-2 h-32 sm:h-36 bg-gradient-to-b from-[#FAF7F2] to-[#F5EFE6] rounded-t-lg border-t-2 border-x border-[#C5A059]/70 shadow-lg flex flex-col items-center justify-center px-3 py-2 text-center z-10"
                style={{
                  transform: stage >= 3 ? 'translateY(-92px) scale(1.06)' : 'none',
                  transition: 'transform 0.9s cubic-bezier(.16,1,.3,1), box-shadow 0.9s',
                  boxShadow: stage >= 3 ? '0 24px 50px -10px rgba(0,0,0,.55)' : undefined,
                }}
              >
                <div className="flex items-center gap-1 text-[#8E6B2C] mb-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#B08841]" />
                  <span className="text-[8px] sm:text-[9px] font-cinzel uppercase tracking-[0.22em] font-semibold">
                    Walima Reception
                  </span>
                  <Sparkles className="w-2.5 h-2.5 text-[#B08841]" />
                </div>
                <span className="font-serif text-base sm:text-lg text-[#142A24] font-semibold tracking-tight">
                  Omar <span className="font-script text-[#B08841] text-lg sm:text-xl">&amp;</span> Sabika
                </span>
                <span className="text-[9px] font-sans text-[#8E6B2C] mt-0.5">
                  Monday, 28th December • Sofitel
                </span>
              </div>

              {/* Front pocket folds */}
              <div
                className="absolute inset-0 z-20 pointer-events-none bg-[#142822] border-l border-[#C5A059]/30 rounded-b-xl"
                style={{ clipPath: 'polygon(0 0, 50% 60%, 0 100%)' }}
              />
              <div
                className="absolute inset-0 z-20 pointer-events-none bg-[#162E27] border-r border-[#C5A059]/30 rounded-b-xl"
                style={{ clipPath: 'polygon(100% 0, 50% 60%, 100% 100%)' }}
              />
              <div
                className="absolute inset-0 z-20 pointer-events-none bg-[#10201A] border-b border-[#C5A059]/40 rounded-b-xl shadow-lg"
                style={{ clipPath: 'polygon(0 100%, 50% 52%, 100% 100%)' }}
              />

              {/* Top flap: emerald outside, gold-dotted ivory lining inside */}
              <div
                className="absolute top-0 inset-x-0 h-[105px] pointer-events-none preserve-3d"
                style={{
                  zIndex: stage >= 3 ? 5 : 30,
                  transformOrigin: 'top center',
                  transform: stage >= 2 ? 'rotateX(180deg)' : 'rotateX(0deg)',
                  transition: 'transform 0.8s cubic-bezier(.65,0,.25,1)',
                }}
              >
                <div
                  className="absolute inset-0 backface-hidden bg-gradient-to-b from-[#1C3A31] to-[#152B24]"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />
                <div
                  className="absolute inset-0 backface-hidden bg-[#F4E8D0] bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:10px_10px]"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transform: 'rotateX(180deg)' }}
                />
              </div>

              {/* Wax seal: cracks into two halves that fall away */}
              <button
                ref={sealRef}
                onClick={handleOpenEnvelope}
                className={`absolute left-1/2 -translate-x-1/2 top-[75px] z-40 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C378] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0D1C17] transition-transform duration-300 ${
                  stage === 0 ? 'hover:scale-105 active:scale-95' : 'pointer-events-none'
                }`}
                aria-label="Open wedding invitation"
              >
                <span className={`block rounded-full ${stage === 0 ? 'seal-glow' : ''}`}>
                  {stage === 0 ? (
                    <SealFace />
                  ) : (
                    <span className="relative block">
                      <span className="invisible block"><SealFace /></span>
                      {(['left', 'right'] as const).map((side) => (
                        <span
                          key={side}
                          className="absolute inset-0 block"
                          style={{
                            clipPath:
                              side === 'left'
                                ? 'polygon(0 0, 54% 0, 46% 50%, 55% 100%, 0 100%)'
                                : 'polygon(54% 0, 100% 0, 100% 100%, 55% 100%, 46% 50%)',
                            animation: `${side === 'left' ? 'sealHalfL' : 'sealHalfR'} 0.75s cubic-bezier(.5,0,.75,0) forwards`,
                          }}
                        >
                          <SealFace />
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Action prompt with foil sheen */}
          <div className={`mt-6 pt-2 transition-all duration-500 ${stage >= 1 ? 'opacity-0 translate-y-3' : 'opacity-100'}`}>
            <button
              onClick={handleOpenEnvelope}
              disabled={stage > 0}
              className="foil-sheen-container w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D8B266] via-[#F3DFAC] to-[#B08841] text-[#142A24] font-cinzel font-semibold text-xs sm:text-sm tracking-[0.18em] uppercase shadow-lg shadow-[#C5A059]/25 hover:brightness-105 hover:-translate-y-0.5 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <div className="foil-sheen-overlay" />
              <span className="relative z-10">Open Invitation</span>
              <Sparkles className="w-4 h-4 text-[#142A24] relative z-10 group-hover:rotate-12 transition-transform" />
            </button>
            <p className="text-[11px] font-sans text-[#E5C378]/70 mt-2.5">
              Tap the seal · best with sound on (Halal Duff · دف)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnvelopeModal
