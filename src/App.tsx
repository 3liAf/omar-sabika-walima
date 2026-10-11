import { useState } from 'react'
import { EnvelopeModal } from './components/EnvelopeModal'
import { AudioPlayer } from './components/AudioPlayer'
import { CoupleSection } from './components/CoupleSection'
import { CountdownTimer } from './components/CountdownTimer'
import { EventCard } from './components/EventCard'
import { RsvpSection } from './components/RsvpSection'
import { BismillahSVG, AmbientGoldenParticles } from './components/DecorativeOrnaments'
import { Mail, Sparkles } from 'lucide-react'

export function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      return params.get('opened') !== 'true'
    }
    return true
  })
  const [hasStartedAudio, setHasStartedAudio] = useState(false)

  const handleOpenInvitation = () => {
    setIsEnvelopeOpen(false)
    setHasStartedAudio(true)
  }

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpen(true)
  }

  return (
    <div className="min-h-screen bg-damask relative text-[#161F1D] flex flex-col selection:bg-[#F3DFAC] selection:text-[#142A24] overflow-x-hidden">
      {/* Decorative top gold gradient accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#9A782D] via-[#F3DFAC] to-[#9A782D] fixed top-0 left-0 z-30 shadow-xs" />

      {/* Ambient Stardust Particles Floating in Background */}
      <AmbientGoldenParticles />

      {/* Floating Halal Duff Audio Player */}
      <AudioPlayer autoPlayTrigger={hasStartedAudio} />

      {/* Interactive 3D Wax Sealed Envelope Modal */}
      <EnvelopeModal
        isOpen={isEnvelopeOpen}
        onOpen={handleOpenInvitation}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto pt-6 pb-12 px-3 sm:px-6 relative z-10 space-y-4 sm:space-y-6">
        {/* Top bar controls */}
        <div className="flex items-center justify-between px-1 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#8E6B2C] font-serif">
            <Sparkles className="w-3.5 h-3.5 text-[#B08841] animate-pulse" />
            <span className="font-medium">Official Web Invitation</span>
          </div>

          <button
            onClick={handleReopenEnvelope}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#C5A059]/40 text-xs font-sans text-[#142A24] hover:bg-[#FAF5EA] hover:border-[#C5A059]/70 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Mail className="w-3.5 h-3.5 text-[#B08841]" />
            <span>Envelope View</span>
          </button>
        </div>

        {/* Bismillah Header */}
        <header className="pt-3 pb-1 text-center">
          <BismillahSVG />
        </header>

        {/* Couple & Walima Presentation */}
        <CoupleSection />

        {/* Live Countdown to 28 December */}
        <CountdownTimer targetDate="2026-12-28T13:00:00" />

        {/* Event Details (Walima Sofitel, afternoon, 1st floor) */}
        <EventCard />

        {/* RSVP Section (Strictly no names on RSVP, 3 numbers with WhatsApp and Call) */}
        <RsvpSection />

        {/* Clean Signature Footer */}
        <footer className="text-center pt-4 pb-16 sm:pb-12 space-y-1">
          <p className="font-serif text-sm font-semibold text-[#142A24]">
            Omar &amp; Sabika
          </p>
          <p className="text-[11px] font-sans text-[#8E6B2C]/80">
            Sunday, 28th December 2026 • Sofitel (1st Floor)
          </p>
        </footer>
      </main>
    </div>
  )
}

export default App
