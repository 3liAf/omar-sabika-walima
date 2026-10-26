import { useEffect, useState } from 'react'
import { EnvelopeModal } from './components/EnvelopeModal'
import { AudioPlayer } from './components/AudioPlayer'
import { CoupleSection } from './components/CoupleSection'
import { CountdownTimer } from './components/CountdownTimer'
import { EventCard } from './components/EventCard'
import { RsvpSection } from './components/RsvpSection'
import { OpenedContext, Reveal } from './components/Reveal'
import { BismillahSVG, AmbientGoldenParticles, FloralMotif } from './components/DecorativeOrnaments'
import { Mail, Sparkles } from 'lucide-react'

export function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      return params.get('opened') !== 'true' && !window.location.hash
    }
    return true
  })
  const [hasStartedAudio, setHasStartedAudio] = useState(false)

  // Keep the page still behind the envelope
  useEffect(() => {
    document.body.style.overflow = isEnvelopeOpen ? 'hidden' : ''
  }, [isEnvelopeOpen])

  const handleOpenInvitation = () => {
    setIsEnvelopeOpen(false)
    setHasStartedAudio(true)
    window.scrollTo({ top: 0 })
  }

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpen(true)
  }

  return (
    <OpenedContext.Provider value={!isEnvelopeOpen}>
      <div className="min-h-screen bg-damask relative text-[#161F1D] flex flex-col selection:bg-[#F3DFAC] selection:text-[#142A24] overflow-x-hidden">
        {/* Decorative top gold gradient accent line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#9A782D] via-[#F3DFAC] to-[#9A782D] fixed top-0 left-0 z-30 shadow-xs" />

        {/* Ambient Stardust Particles Floating in Background */}
        <AmbientGoldenParticles />

        {/* Floating Halal Duff Audio Player */}
        <AudioPlayer autoPlayTrigger={hasStartedAudio} />

        {/* Interactive 3D Wax Sealed Envelope Modal */}
        <EnvelopeModal isOpen={isEnvelopeOpen} onOpen={handleOpenInvitation} />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-4xl mx-auto pt-6 pb-24 px-3 sm:px-6 relative z-10 space-y-4 sm:space-y-6">
          {/* Top bar controls */}
          <Reveal className="flex items-center justify-between px-1 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#8E6B2C] font-cinzel tracking-[0.14em]">
              <Sparkles className="w-3.5 h-3.5 text-[#B08841]" />
              <span className="font-medium">Walima Invitation</span>
            </div>

            <button
              onClick={handleReopenEnvelope}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#C5A059]/40 text-xs font-sans text-[#142A24] hover:bg-[#FAF5EA] hover:border-[#C5A059]/70 hover:-translate-y-0.5 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Mail className="w-3.5 h-3.5 text-[#B08841]" />
              <span>Envelope View</span>
            </button>
          </Reveal>

          {/* Bismillah Header */}
          <Reveal delay={120} className="pt-3 pb-1 text-center">
            <BismillahSVG />
          </Reveal>

          {/* Couple & Walima Presentation */}
          <CoupleSection />

          {/* Live Countdown to 28 December */}
          <CountdownTimer />

          {/* Event Details (Walima Sofitel, evening, 1st floor) */}
          <EventCard />

          {/* RSVP Section (no host names, 3 numbers with WhatsApp and Call) */}
          <RsvpSection />

          {/* Signature Footer */}
          <Reveal className="text-center pt-6 pb-6 space-y-2">
            <FloralMotif className="opacity-70" />
            <p className="font-script text-4xl gold-sweep leading-tight">Omar &amp; Sabika</p>
            <p className="text-[11px] font-cinzel tracking-[0.2em] uppercase text-[#8E6B2C]/80">
              28 December 2026 · Sofitel · 1st Floor
            </p>
          </Reveal>
        </main>
      </div>
    </OpenedContext.Provider>
  )
}

export default App
