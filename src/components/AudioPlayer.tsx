import React, { useEffect, useRef, useState } from 'react'
import { Music2, Volume2, VolumeX } from 'lucide-react'

interface AudioPlayerProps {
  autoPlayTrigger?: boolean
}

// Background nasheed: Maher Zain · Barak Allah Lakuma (vocals only), streamed from YouTube
const VIDEO_ID = '61C6FxprHuY'
const START_AT = 37 // seconds

type YTPlayer = {
  playVideo?: () => void
  pauseVideo?: () => void
  setVolume?: (v: number) => void
  seekTo?: (s: number, allowSeekAhead: boolean) => void
}
type YTApi = {
  Player: new (el: HTMLElement, opts: object) => YTPlayer
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number }
}
declare global {
  interface Window {
    YT?: YTApi
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<YTApi> | null = null
const loadYouTube = () =>
  (apiPromise ??= new Promise<YTApi>((resolve, reject) => {
    if (window.YT?.Player) return resolve(window.YT)
    window.onYouTubeIframeAPIReady = () => resolve(window.YT!)
    const s = document.createElement('script')
    s.src = 'https://www.youtube.com/iframe_api'
    s.onerror = () => reject(new Error('YouTube API failed to load'))
    document.head.appendChild(s)
  }))

type Status = 'loading' | 'ready' | 'playing' | 'paused' | 'error'

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTrigger }) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)
  const wantPlay = useRef(false) // start as soon as the player is ready
  const userPaused = useRef(false) // never auto-resume after the guest paused
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    let cancelled = false
    loadYouTube()
      .then((YT) => {
        if (cancelled || !hostRef.current) return
        // The API swaps this element for its iframe, so React never owns it
        const el = document.createElement('div')
        hostRef.current.appendChild(el)
        const player = new YT.Player(el, {
          videoId: VIDEO_ID,
          width: 200,
          height: 200,
          playerVars: { autoplay: 0, controls: 0, start: START_AT, playsinline: 1, rel: 0 },
          events: {
            onReady: () => {
              player.setVolume?.(70)
              setStatus('ready')
              if (wantPlay.current) player.playVideo?.()
            },
            onStateChange: (e: { data: number }) => {
              if (e.data === YT.PlayerState.PLAYING) setStatus('playing')
              else if (e.data === YT.PlayerState.PAUSED) setStatus('paused')
              else if (e.data === YT.PlayerState.ENDED) {
                player.seekTo?.(START_AT, true)
                player.playVideo?.()
              }
            },
            onError: () => setStatus('error'),
          },
        })
        playerRef.current = player
      })
      .catch(() => !cancelled && setStatus('error'))
    return () => {
      cancelled = true
    }
  }, [])

  const play = () => {
    userPaused.current = false
    wantPlay.current = true
    playerRef.current?.playVideo?.()
  }

  // Browsers only allow sound after a tap, so start on the guest's first tap (the envelope seal)
  useEffect(() => {
    const first = (e: Event) => {
      if ((e.target as Element | null)?.closest?.('[data-music]')) return
      if (!userPaused.current) play()
      document.removeEventListener('pointerdown', first, true)
      document.removeEventListener('keydown', first, true)
    }
    document.addEventListener('pointerdown', first, true)
    document.addEventListener('keydown', first, true)
    return () => {
      document.removeEventListener('pointerdown', first, true)
      document.removeEventListener('keydown', first, true)
    }
  }, [])

  useEffect(() => {
    if (autoPlayTrigger && !userPaused.current) play()
  }, [autoPlayTrigger])

  const toggleAudio = () => {
    if (status === 'playing') {
      userPaused.current = true
      wantPlay.current = false
      playerRef.current?.pauseVideo?.()
    } else {
      play()
    }
  }

  const isPlaying = status === 'playing'
  const failed = status === 'error'

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 sm:right-5 z-40 flex items-center gap-2">
      <div ref={hostRef} aria-hidden="true" className="fixed -left-[9999px] top-0 w-[200px] h-[200px] pointer-events-none" />
      <button
        data-music
        onClick={toggleAudio}
        disabled={failed}
        aria-pressed={isPlaying}
        aria-label={failed ? 'Music unavailable' : isPlaying ? 'Pause music' : 'Play music'}
        title={failed ? 'The music could not be loaded' : 'Maher Zain · Barak Allah Lakuma'}
        className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg transition-all duration-300 border ${
          isPlaying
            ? 'bg-[#142A24] text-[#E5C378] border-[#C5A059]/60 shadow-[#C5A059]/20 scale-105'
            : 'bg-white/95 text-[#6B655B] border-[#C5A059]/30 hover:border-[#C5A059] shadow-sm'
        } ${failed ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} backdrop-blur-md`}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-center gap-1.5">
              <Music2 className="w-4 h-4 text-[#E5C378]" />
              <div className="flex items-end gap-[3px] h-3.5 w-3.5">
                <span className="w-1 bg-[#E5C378] rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
                <span className="w-1 bg-[#E5C378] rounded-full animate-bounce [animation-delay:-0.15s] h-2" />
                <span className="w-1 bg-[#E5C378] rounded-full animate-bounce h-3.5" />
              </div>
            </div>
          ) : (
            <Music2 className="w-4 h-4 text-[#C5A059]" />
          )}
        </div>

        <div className="flex flex-col text-left -ml-1 sm:ml-0">
          <span className="hidden sm:inline text-xs font-serif font-semibold tracking-wider">
            {failed ? 'Music unavailable' : 'Barak Allah Lakuma'}
          </span>
          <span className="text-[9px] font-sans text-[#8E6B2C] -mt-0.5 tracking-tight hidden sm:inline">
            Maher Zain
          </span>
        </div>

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
