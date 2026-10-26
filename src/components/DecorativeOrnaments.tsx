import React from 'react'

export const GoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-2 sm:gap-3 my-4 sm:my-6 max-w-full overflow-hidden ${className}`}>
    <div className="draw-line from-right h-[1px] w-10 sm:w-28 bg-gradient-to-r from-transparent via-[#C5A059] to-[#C5A059]" />
    <div className="flex items-center gap-1 sm:gap-1.5 text-[#C5A059] shrink-0">
      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-[#C5A059]" viewBox="0 0 24 24">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
    </div>
    <div className="draw-line from-left h-[1px] w-10 sm:w-28 bg-gradient-to-l from-transparent via-[#C5A059] to-[#C5A059]" />
  </div>
)

export const CornerFlourish: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ position }) => {
  const transformMap = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2 scale-x-[-1]',
    'bottom-left': 'bottom-2 left-2 scale-y-[-1]',
    'bottom-right': 'bottom-2 right-2 scale-[-1]',
  }

  return (
    <svg
      className={`absolute w-6 h-6 sm:w-8 sm:h-8 text-[#C5A059]/40 pointer-events-none transition-colors duration-400 group-hover:text-[#C5A059]/70 ${transformMap[position]}`}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
    >
      <path d="M2 38V12C2 6.47715 6.47715 2 12 2H38" strokeWidth="1.5" />
      <path d="M6 38V14C6 9.58172 9.58172 6 14 6H38" strokeWidth="0.75" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

export const FloralMotif: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 30"
    className={`w-24 sm:w-28 h-7 sm:h-8 mx-auto text-[#C5A059] ${className}`}
    fill="currentColor"
  >
    <path d="M50 0 C45 10 35 15 20 15 C35 15 45 20 50 30 C55 20 65 15 80 15 C65 15 55 10 50 0 Z" opacity="0.8" />
    <circle cx="50" cy="15" r="3" />
    <circle cx="20" cy="15" r="2" />
    <circle cx="80" cy="15" r="2" />
    <path d="M5 15 Q 12 12 20 15 Q 12 18 5 15" />
    <path d="M95 15 Q 88 12 80 15 Q 88 18 95 15" />
  </svg>
)

export const BismillahSVG: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex flex-col items-center justify-center px-4 max-w-sm sm:max-w-md mx-auto ${className}`}>
    <p
      className="font-arabic text-2xl sm:text-3xl lg:text-4xl text-[#B08841] tracking-wide leading-relaxed font-bold text-center select-none drop-shadow-sm"
      style={{ fontFamily: "'Amiri', serif" }}
    >
      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
    </p>
    <span className="text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#8E6B2C] mt-1 font-sans text-center max-w-xs leading-tight">
      In the Name of Allah, The Most Gracious, The Most Merciful
    </span>
  </div>
)

// Ambient drifting golden stardust particles for high-end luxury atmosphere
export const AmbientGoldenParticles: React.FC = () => {
  const particles = [
    { top: '8%', left: '12%', size: '3px', delay: '0s', duration: '5s' },
    { top: '15%', left: '88%', size: '4px', delay: '1.2s', duration: '7s' },
    { top: '22%', left: '25%', size: '2.5px', delay: '2.5s', duration: '6s' },
    { top: '30%', left: '75%', size: '3.5px', delay: '0.8s', duration: '5.5s' },
    { top: '38%', left: '8%', size: '3px', delay: '3.1s', duration: '6.5s' },
    { top: '45%', left: '92%', size: '4px', delay: '1.8s', duration: '7.2s' },
    { top: '55%', left: '18%', size: '2.5px', delay: '0.4s', duration: '5.8s' },
    { top: '63%', left: '82%', size: '3px', delay: '2.2s', duration: '6.8s' },
    { top: '72%', left: '10%', size: '3.5px', delay: '1.5s', duration: '6.2s' },
    { top: '80%', left: '90%', size: '2.5px', delay: '3.5s', duration: '7.5s' },
    { top: '88%', left: '22%', size: '3px', delay: '0.9s', duration: '5.4s' },
    { top: '94%', left: '78%', size: '3.5px', delay: '2.8s', duration: '6.6s' },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, idx) => (
        <span
          key={idx}
          className="absolute rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FFF4D0] shadow-[0_0_8px_rgba(212,175,55,0.7)] animate-particle"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            // @ts-expect-error CSS custom variable
            '--delay': p.delay,
            '--duration': p.duration,
          }}
        />
      ))}
    </div>
  )
}
