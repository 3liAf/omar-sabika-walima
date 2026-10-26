import React, { useEffect, useState } from 'react'
import { TimeLeft } from '../types'
import { Clock } from 'lucide-react'
import { Reveal } from './Reveal'
import { CornerFlourish } from './DecorativeOrnaments'

interface CountdownTimerProps {
  targetDate?: string // Walima start, Pakistan time
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDate = '2026-12-28T13:00:00+05:00'
}) => {
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(targetDate).getTime()
    const now = new Date().getTime()
    const difference = target - now

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isComplete: false,
    }
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <Reveal className="px-2 sm:px-4 py-3 sm:py-6 max-w-2xl mx-auto text-center">
      <div className="relative glass-gold-card luxury-frame rounded-3xl px-4 py-6 sm:p-9 shadow-card">
        <CornerFlourish position="top-left" />
        <CornerFlourish position="top-right" />
        <CornerFlourish position="bottom-left" />
        <CornerFlourish position="bottom-right" />
      {/* Header with ticking clock icon */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3">
        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B08841] animate-pulse" />
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8E6B2C] font-semibold">
          Counting Down To The Big Day
        </span>
      </div>

      {/* 4 Luxury Countdown Cards */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm sm:max-w-md mx-auto">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="group relative flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-2xl bg-gradient-to-b from-white to-[#FAF7F2] border border-[#C5A059]/40 shadow-sm hover:shadow-md hover:border-[#C5A059]/70 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
          >
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#142A24] tabular-nums leading-none tracking-tight">
              <span key={unit.value} className="tick-in">{String(unit.value).padStart(2, '0')}</span>
            </span>
            <span className="text-[9px] sm:text-xs uppercase font-sans text-[#8E6B2C] tracking-wider mt-1 sm:mt-1.5 font-semibold">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
      
      <p className="text-[11px] sm:text-xs font-serif italic text-[#6B655B] mt-2.5 sm:mt-3">
        Monday, 28th December 2026 • 1 PM • Sofitel
      </p>
      </div>
    </Reveal>
  )
}

export default CountdownTimer
