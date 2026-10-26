import React from 'react'
import { CornerFlourish, GoldDivider, FloralMotif } from './DecorativeOrnaments'
import { Letters, Reveal } from './Reveal'

export const CoupleSection: React.FC = () => {
  return (
    <Reveal className="relative px-2 sm:px-4 py-3 sm:py-6 max-w-2xl mx-auto text-center">
      {/* Royal Card Frame */}
      <div className="relative glass-gold-card luxury-frame rounded-3xl p-5 sm:p-10 shadow-card hover:shadow-2xl transition-all duration-500">
        <CornerFlourish position="top-left" />
        <CornerFlourish position="top-right" />
        <CornerFlourish position="bottom-left" />
        <CornerFlourish position="bottom-right" />

        {/* Walima Announcement pill with foil sheen */}
        <div className="foil-sheen-container inline-block px-4 py-1 sm:py-1.5 rounded-full bg-[#142A24] border border-[#C5A059]/50 mb-3 sm:mb-4 shadow-sm">
          <div className="foil-sheen-overlay" />
          <span className="relative z-10 text-[10px] sm:text-xs font-sans tracking-[0.2em] sm:tracking-[0.25em] text-[#E5C378] uppercase font-semibold">
            Walima Reception
          </span>
        </div>

        {/* Invitation Text */}
        <p className="font-serif italic text-xs sm:text-base text-[#6B655B] max-w-lg mx-auto leading-relaxed px-2">
          Cordially request the honour of your gracious presence and blessings to celebrate the auspicious union of
        </p>

        <GoldDivider className="my-3 sm:my-5" />

        {/* Couple Names Grid */}
        <div className="py-1 space-y-4 sm:space-y-7">
          {/* Groom */}
          <div className="space-y-0.5 sm:space-y-1">
            <h1 className="font-serif italic text-[52px] sm:text-6xl lg:text-7xl leading-[1.05] text-[#142A24] tracking-tight font-normal">
              <Letters text="Omar" />
            </h1>
            <p className="font-sans text-xs sm:text-base text-[#8E6B2C] font-medium tracking-wide">
              Son of <span className="font-semibold text-[#142A24]">Afzal Yousaf</span>
            </p>
          </div>

          {/* Golden Ampersand with breathing pulse */}
          <div className="relative flex items-center justify-center">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FAF5EA] via-[#FDFBF7] to-[#F4E8D0] border border-[#C5A059]/60 flex items-center justify-center shadow-md pulse-gold-ring">
              <span className="font-script text-3xl sm:text-4xl gold-sweep pt-1 leading-none select-none">
                &amp;
              </span>
            </div>
          </div>

          {/* Bride */}
          <div className="space-y-0.5 sm:space-y-1">
            <h2 className="font-serif italic text-[52px] sm:text-6xl lg:text-7xl leading-[1.05] text-[#142A24] tracking-tight font-normal">
              <Letters text="Sabika" start={420} />
            </h2>
            <p className="font-sans text-xs sm:text-base text-[#8E6B2C] font-medium tracking-wide">
              Daughter of <span className="font-semibold text-[#142A24]">Shezad Ahmed</span>
            </p>
          </div>
        </div>

        <GoldDivider className="my-3 sm:my-5" />

        {/* Quranic Verse */}
        <div className="mt-3 px-4 py-4 sm:py-5 rounded-2xl bg-gradient-to-b from-[#FAF5EA]/80 to-[#FAF7F2]/60 border border-[#C5A059]/25 shadow-inner overflow-hidden">
          <p
            className="font-arabic text-base sm:text-xl text-[#8E6B2C] leading-loose text-center font-medium break-words"
            dir="rtl"
          >
            رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا
          </p>
          <p className="font-serif italic text-[11px] sm:text-xs text-[#6B655B] mt-1 max-w-md mx-auto px-1">
            &ldquo;Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us a leader for the righteous.&rdquo;
          </p>
          <p
            className="text-[13px] sm:text-[15px] text-[#4A5A52] mt-3 max-w-md mx-auto px-1 leading-[2.3]"
            dir="rtl"
            lang="ur"
            style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
          >
            اے ہمارے پروردگار، ہمیں ہماری بیویوں اور اولاد کی طرف سے آنکھوں کی ٹھنڈک عطا فرما، اور ہمیں پرہیزگاروں کا امام بنا۔
          </p>
          <span className="text-[9px] sm:text-[10px] font-sans text-[#8E6B2C]/70 tracking-widest uppercase block mt-0.5">
            Surah Al-Furqan (25:74)
          </span>
        </div>

        <FloralMotif className="mt-4 sm:mt-6 opacity-75" />
      </div>
    </Reveal>
  )
}
export default CoupleSection
