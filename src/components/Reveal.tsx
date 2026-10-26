import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

// True once the envelope has been opened; reveals wait for it so nothing animates unseen behind the modal.
export const OpenedContext = createContext(true)

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

// Scroll reveal: content lifts up out of a slight backward tilt, like a card being raised from a table.
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '' }) => {
  const opened = useContext(OpenedContext)
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!opened || shown) return
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [opened, shown])

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
      style={{ '--rd': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

// Splits a word into letters that rise in one after another once their Reveal parent is shown.
export const Letters: React.FC<{ text: string; start?: number }> = ({ text, start = 0 }) => (
  <span aria-label={text}>
    {[...text].map((ch, i) => (
      <span
        key={i}
        aria-hidden="true"
        className="letter"
        style={{ '--ld': `${start + i * 70}ms` } as React.CSSProperties}
      >
        {ch}
      </span>
    ))}
  </span>
)

export default Reveal
