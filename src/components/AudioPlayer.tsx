import React, { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

interface AudioPlayerProps {
  autoPlayTrigger?: boolean
}

// Custom authentic Duff (Islamic Frame Drum) SVG Icon
const DuffIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Frame drum outer wooden rim */}
    <circle cx="12" cy="12" r="9" />
    {/* Inner skin tension ring */}
    <circle cx="12" cy="12" r="6" strokeDasharray="2 2" opacity="0.65" />
    {/* Center skin strike point */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
)

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const noiseBufRef = useRef<AudioBuffer | null>(null)
  const isPlayingRef = useRef<boolean>(false)
  const timerRef = useRef<number | null>(null)
  const stepRef = useRef<number>(0)

  // Generate 1-second white noise buffer for organic leather membrane impact texture
  const getNoiseBuffer = (ctx: AudioContext): AudioBuffer => {
    if (noiseBufRef.current) return noiseBufRef.current
    const bufferSize = ctx.sampleRate
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }
    noiseBufRef.current = buffer
    return buffer
  }

  // Authentic Duff "Dum" (deep resonant center strike on leather membrane)
  const playDum = (ctx: AudioContext, time: number, intensity = 1.0) => {
    // 1. Resonant membrane pitch drop
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()

    osc.type = 'sine'
    // Pitch starts at ~128 Hz and drops to ~72 Hz (deep wooden frame resonance)
    osc.frequency.setValueAtTime(128, time)
    osc.frequency.exponentialRampToValueAtTime(72, time + 0.35)

    oscGain.gain.setValueAtTime(0.001, time)
    oscGain.gain.linearRampToValueAtTime(0.25 * intensity, time + 0.005)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.44)

    osc.connect(oscGain)
    oscGain.connect(ctx.destination)

    osc.start(time)
    osc.stop(time + 0.46)

    // 2. Leather skin contact transient (palm slap texture)
    const noiseBuf = getNoiseBuffer(ctx)
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuf
    const noiseFilter = ctx.createBiquadFilter()
    const noiseGain = ctx.createGain()

    noiseFilter.type = 'lowpass'
    noiseFilter.frequency.setValueAtTime(320, time)

    noiseGain.gain.setValueAtTime(0.09 * intensity, time)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.04)

    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(ctx.destination)

    noiseSource.start(time)
    noiseSource.stop(time + 0.05)
  }

  // Authentic Duff "Tak" (crisp rim/edge snap on taut frame)
  const playTak = (ctx: AudioContext, time: number, intensity = 1.0) => {
    // 1. Sharp rim pitch
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(420, time)
    osc.frequency.exponentialRampToValueAtTime(260, time + 0.08)

    oscGain.gain.setValueAtTime(0.001, time)
    oscGain.gain.linearRampToValueAtTime(0.13 * intensity, time + 0.002)
    oscGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.09)

    osc.connect(oscGain)
    oscGain.connect(ctx.destination)

    osc.start(time)
    osc.stop(time + 0.1)

    // 2. Taut frame snap noise burst
    const noiseBuf = getNoiseBuffer(ctx)
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuf
    const noiseFilter = ctx.createBiquadFilter()
    const noiseGain = ctx.createGain()

    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.setValueAtTime(1400, time)
    noiseFilter.Q.setValueAtTime(1.8, time)

    noiseGain.gain.setValueAtTime(0.14 * intensity, time)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.055)

    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(ctx.destination)

    noiseSource.start(time)
    noiseSource.stop(time + 0.065)
  }

  // Traditional celebratory Walima Duff rhythm loop (Halal - Percussion only, no melody/strings)
  const startDuffLoop = () => {
    if (isPlayingRef.current) return
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass()
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }

      isPlayingRef.current = true
      setIsPlaying(true)

      const ctx = audioCtxRef.current
      stepRef.current = 0

      // 16-step celebratory Islamic wedding rhythm cycle (~94 BPM, 190ms per sixteenth note)
      const stepDurationMs = 190

      const tick = () => {
        if (!isPlayingRef.current) return
        const now = ctx.currentTime
        const step = stepRef.current % 16

        // Rhythmic Walima pattern:
        // [0: DUM, 1: -, 2: tak, 3: TAK, 4: -, 5: DUM, 6: TAK, 7: tak]
        // [8: DUM, 9: -, 10: tak, 11: TAK, 12: tak, 13: DUM, 14: TAK, 15: -]
        switch (step) {
          case 0:
            playDum(ctx, now, 1.0)
            break
          case 2:
            playTak(ctx, now, 0.4) // soft rim tap
            break
          case 3:
            playTak(ctx, now, 0.9) // crisp rim strike
            break
          case 5:
            playDum(ctx, now, 0.85) // warm center hit
            break
          case 6:
            playTak(ctx, now, 0.95) // sharp rim strike
            break
          case 7:
            playTak(ctx, now, 0.45) // light fill
            break
          case 8:
            playDum(ctx, now, 1.0) // strong center hit
            break
          case 10:
            playTak(ctx, now, 0.45)
            break
          case 11:
            playTak(ctx, now, 0.9)
            break
          case 12:
            playTak(ctx, now, 0.4)
            break
          case 13:
            playDum(ctx, now, 0.9) // syncopated center hit
            break
          case 14:
            playTak(ctx, now, 1.0) // celebratory accent
            break
          default:
            // Rhythmic space / natural membrane decay
            break
        }

        stepRef.current++
        timerRef.current = window.setTimeout(tick, stepDurationMs)
      }

      tick()
    } catch {
      // Audio autoplay policy handled
    }
  }

  const stopDuffLoop = () => {
    isPlayingRef.current = false
    setIsPlaying(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend()
    }
  }

  const toggleAudio = () => {
    if (isPlaying) {
      stopDuffLoop()
    } else {
      startDuffLoop()
    }
  }

  useEffect(() => {
    if (autoPlayTrigger && !isPlayingRef.current) {
      startDuffLoop()
    }
    return () => {
      stopDuffLoop()
    }
  }, [autoPlayTrigger])

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 sm:right-5 z-40 flex items-center gap-2">
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Pause Halal Duff sound' : 'Play Halal Duff sound'}
        title="Halal Duff (دف) • Traditional Islamic Walima Percussion (No Music)"
        className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg transition-all duration-300 border ${
          isPlaying
            ? 'bg-[#142A24] text-[#E5C378] border-[#C5A059]/60 shadow-[#C5A059]/20 scale-105'
            : 'bg-white/95 text-[#6B655B] border-[#C5A059]/30 hover:border-[#C5A059] shadow-sm'
        } backdrop-blur-md`}
      >
        {/* Animated Duff Percussion Graphic */}
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-center gap-1.5">
              <DuffIcon className="w-4 h-4 text-[#E5C378] animate-pulse" />
              {/* Rhythmic beating pulse indicators */}
              <div className="flex items-end gap-[3px] h-3.5 w-3.5">
                <span className="w-1 bg-[#E5C378] rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
                <span className="w-1 bg-[#E5C378] rounded-full animate-bounce [animation-delay:-0.15s] h-2" />
                <span className="w-1 bg-[#E5C378] rounded-full animate-bounce h-3.5" />
              </div>
            </div>
          ) : (
            <DuffIcon className="w-4 h-4 text-[#C5A059]" />
          )}
        </div>

        {/* Label clearly specifying Halal Duff */}
        <div className="flex flex-col text-left -ml-1 sm:ml-0">
          <span className="hidden sm:inline text-xs font-serif font-semibold tracking-wider">
            {isPlaying ? 'Halal Duff (دف)' : 'Play Duff (دف)'}
          </span>
          <span className="text-[9px] font-sans text-[#8E6B2C] -mt-0.5 tracking-tight hidden sm:inline">
            Islamic Walima Rhythm
          </span>
        </div>

        {/* Volume status */}
        <div className="pl-1 border-l border-[#C5A059]/30">
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-[#E5C378]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[#6B655B]" />
          )}
        </div>
      </button>
    </div>
  )
}

export default AudioPlayer
