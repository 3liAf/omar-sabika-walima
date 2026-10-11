import React, { useState, useEffect } from 'react'
import { Heart, Send, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'
import { CornerFlourish, GoldDivider } from './DecorativeOrnaments'
import { GuestWish } from '../types'

export const GuestWishes: React.FC = () => {
  const initialWishes: GuestWish[] = [
    {
      id: '1',
      name: 'Farhan & Family',
      message: 'بارك الله لكما وبارك عليكما وجمع بينكما في خير — Wishing dearest Omar and Sabika endless love, harmony, and barakah!',
      timestamp: 'Today',
    },
    {
      id: '2',
      name: 'Dr. Kamran & Huma',
      message: 'Heartiest congratulations to Afzal Yousaf sahib & Shezad Ahmed sahib on this blessed occasion! May Allah bless the couple with immense happiness.',
      timestamp: 'Yesterday',
    },
    {
      id: '3',
      name: 'Zainab & Bilal',
      message: 'So thrilled to celebrate with you both at Sofitel! May your new journey together be filled with beautiful smiles and companionship.',
      timestamp: '2 days ago',
    },
  ]

  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const saved = localStorage.getItem('omar_sabika_wishes')
      if (saved) return JSON.parse(saved)
    } catch {
      // fallback
    }
    return initialWishes
  })

  const [authorName, setAuthorName] = useState('')
  const [wishMessage, setWishMessage] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('omar_sabika_wishes', JSON.stringify(wishes))
    } catch {
      // fallback
    }
  }, [wishes])

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!authorName.trim() || !wishMessage.trim()) return

    const newWish: GuestWish = {
      id: Date.now().toString(),
      name: authorName.trim(),
      message: wishMessage.trim(),
      timestamp: 'Just now',
    }

    setWishes([newWish, ...wishes])
    setAuthorName('')
    setWishMessage('')

    try {
      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.8 },
        colors: ['#D4AF37', '#B08841', '#FAF7F2'],
      })
    } catch {
      // fallback
    }
  }

  return (
    <section className="px-4 py-8 max-w-2xl mx-auto">
      <div className="relative glass-gold-card luxury-frame rounded-3xl p-6 sm:p-10 shadow-card">
        <CornerFlourish position="top-left" />
        <CornerFlourish position="top-right" />
        <CornerFlourish position="bottom-left" />
        <CornerFlourish position="bottom-right" />

        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EA] border border-[#C5A059]/40 text-[#8E6B2C]">
            <Heart className="w-3.5 h-3.5 fill-[#B08841]" />
            <span className="text-[11px] font-sans tracking-[0.25em] uppercase font-semibold">
              Guest Book &amp; Duas
            </span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl text-[#142A24] font-medium pt-1">
            Warm Wishes &amp; Blessings
          </h3>
          <p className="font-serif italic text-sm text-[#6B655B]">
            Leave your heartfelt prayers for Omar &amp; Sabika
          </p>
        </div>

        <GoldDivider className="my-5" />

        {/* Wish Submission Form */}
        <form onSubmit={handleSubmitWish} className="space-y-3.5 mb-8">
          <div>
            <label htmlFor="wish-author" className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#8E6B2C] mb-1 text-left">
              Your Name
            </label>
            <input
              id="wish-author"
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Asad & Ayesha"
              className="w-full px-4 py-2.5 rounded-xl border border-[#C5A059]/40 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
            />
          </div>

          <div>
            <label htmlFor="wish-message" className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#8E6B2C] mb-1 text-left">
              Your Message or Dua
            </label>
            <textarea
              id="wish-message"
              required
              rows={3}
              value={wishMessage}
              onChange={(e) => setWishMessage(e.target.value)}
              placeholder="Write your loving prayers for the bride and groom..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#C5A059]/40 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#D8B266] via-[#F3DFAC] to-[#B08841] text-[#142A24] font-sans font-semibold text-xs uppercase tracking-wider shadow hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Blessing to the Couple</span>
          </button>
        </form>

        {/* Existing Wishes Feed */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="p-4 rounded-2xl bg-[#FAF7F2]/90 border border-[#C5A059]/25 text-left space-y-1.5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-[#142A24] text-sm flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#B08841]" />
                  {wish.name}
                </span>
                <span className="text-[10px] font-sans text-[#8E6B2C]/70">
                  {wish.timestamp}
                </span>
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                "{wish.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
