import React, { useState } from 'react'
import { Calendar, Clock, MapPin, ExternalLink, Download, Check, Sparkles } from 'lucide-react'
import { CornerFlourish, GoldDivider } from './DecorativeOrnaments'
import { Reveal } from './Reveal'

export const EventCard: React.FC = () => {
  const [downloadedIcs, setDownloadedIcs] = useState(false)

  // 1:00 – 4:00 PM Pakistan time (UTC+5); the hall is booked until 4 PM.
  const details = 'Walima reception of Omar S/o Afzal Yousaf & Sabika D/o Shezad Ahmed. 1:00 – 4:00 PM, Sofitel (1st Floor).'

  const createGoogleCalendarUrl = () => {
    const url = new URL('https://calendar.google.com/calendar/render')
    url.searchParams.set('action', 'TEMPLATE')
    url.searchParams.set('text', 'Omar & Sabika — Walima Reception')
    url.searchParams.set('dates', '20261228T080000Z/20261228T110000Z')
    url.searchParams.set('details', details)
    url.searchParams.set('location', 'Sofitel, 1st Floor')
    return url.toString()
  }

  // .ics file for Apple Calendar / Outlook
  const downloadIcsFile = () => {
    const esc = (v: string) => v.replace(/[,;]/g, (m) => '\\' + m)
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Omar & Sabika//Walima Invitation//EN',
      'BEGIN:VEVENT',
      'UID:omar-sabika-walima-20261228@invitation',
      'DTSTAMP:20261026T000000Z',
      'DTSTART:20261228T080000Z',
      'DTEND:20261228T110000Z',
      'SUMMARY:' + esc('Omar & Sabika Walima Reception'),
      'DESCRIPTION:' + esc(details),
      'LOCATION:' + esc('Sofitel, 1st Floor'),
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', 'Omar-Sabika-Walima.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setDownloadedIcs(true)
    setTimeout(() => setDownloadedIcs(false), 3000)
  }

  return (
    <Reveal className="px-2 sm:px-4 py-3 sm:py-6 max-w-2xl mx-auto">
      <div className="relative glass-gold-card luxury-frame rounded-3xl p-5 sm:p-10 shadow-card hover:shadow-2xl transition-all duration-500">
        <CornerFlourish position="top-left" />
        <CornerFlourish position="top-right" />
        <CornerFlourish position="bottom-left" />
        <CornerFlourish position="bottom-right" />

        <div className="text-center space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF5EA] border border-[#C5A059]/40 text-[#8E6B2C] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B08841]" />
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase font-semibold">
              Event Details &amp; Venue
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl text-[#142A24] font-medium pt-1">
            Walima Reception
          </h3>
          <p className="font-serif italic text-xs sm:text-sm text-[#6B655B]">
            Honour us with your gracious company
          </p>
        </div>

        <GoldDivider className="my-4 sm:my-6" />

        {/* 3 Detail Cards with hover micro-elevation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 my-5 sm:my-7">
          {/* Date Card */}
          <div className="group p-4 rounded-2xl bg-[#FAF7F2] border border-[#C5A059]/35 text-left sm:text-center flex flex-row sm:flex-col items-center gap-4 sm:gap-0 sm:justify-between hover:-translate-y-1 hover:border-[#C5A059]/70 hover:shadow-md transition-all duration-300">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-white to-[#FAF5EA] border border-[#C5A059]/40 flex items-center justify-center text-[#B08841] sm:mb-2.5 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-sans uppercase tracking-wider text-[#8E6B2C] font-semibold block">
                Date
              </span>
              <p className="font-serif text-lg sm:text-xl font-bold text-[#142A24] mt-0.5">
                28 December
              </p>
              <span className="text-xs text-[#6B655B] font-sans block mt-0.5">
                Monday
              </span>
            </div>
          </div>

          {/* Time Card */}
          <div className="group p-4 rounded-2xl bg-[#FAF7F2] border border-[#C5A059]/35 text-left sm:text-center flex flex-row sm:flex-col items-center gap-4 sm:gap-0 sm:justify-between hover:-translate-y-1 hover:border-[#C5A059]/70 hover:shadow-md transition-all duration-300">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-white to-[#FAF5EA] border border-[#C5A059]/40 flex items-center justify-center text-[#B08841] sm:mb-2.5 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-sans uppercase tracking-wider text-[#8E6B2C] font-semibold block">
                Time
              </span>
              <p className="font-serif text-lg sm:text-xl font-bold text-[#142A24] mt-0.5">
                1 – 4 PM
              </p>
              <span className="text-xs text-[#6B655B] font-sans block mt-0.5">
                Walima Feast
              </span>
            </div>
          </div>

          {/* Venue Card */}
          <div className="group p-4 rounded-2xl bg-[#FAF7F2] border border-[#C5A059]/35 text-left sm:text-center flex flex-row sm:flex-col items-center gap-4 sm:gap-0 sm:justify-between hover:-translate-y-1 hover:border-[#C5A059]/70 hover:shadow-md transition-all duration-300">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-white to-[#FAF5EA] border border-[#C5A059]/40 flex items-center justify-center text-[#B08841] sm:mb-2.5 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-sans uppercase tracking-wider text-[#8E6B2C] font-semibold block">
                Venue
              </span>
              <p className="font-serif text-lg sm:text-xl font-bold text-[#142A24] mt-0.5">
                Sofitel
              </p>
              <span className="text-xs text-[#B08841] font-sans font-semibold block mt-0.5">
                1st Floor
              </span>
            </div>
          </div>
        </div>

        {/* Venue specifics banner with foil sheen button */}
        <div className="rounded-2xl bg-gradient-to-r from-[#142A24] via-[#1A332C] to-[#142A24] text-white p-5 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-4 border border-[#C5A059]/40 shadow-lg">
          <div className="space-y-1 mb-4 sm:mb-0">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5C378] animate-ping" />
              <h4 className="font-serif text-lg sm:text-xl text-[#F4E8D0] font-medium">
                Sofitel • 1st Floor
              </h4>
            </div>
            <p className="text-xs text-[#E5C378]/80 font-sans">
              1:00 – 4:00 PM · Walima Feast
            </p>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Sofitel"
            target="_blank"
            rel="noopener noreferrer"
            className="foil-sheen-container inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D8B266] via-[#F3DFAC] to-[#B08841] text-[#142A24] font-sans text-xs uppercase tracking-wider font-semibold shadow-md hover:brightness-105 active:scale-95 transition-all w-full sm:w-auto cursor-pointer"
          >
            <div className="foil-sheen-overlay" />
            <span className="relative z-10">Open Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 relative z-10" />
          </a>
        </div>

        {/* Calendar Add Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={createGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/95 border border-[#C5A059]/40 text-[#142A24] hover:bg-[#FAF5EA] hover:border-[#C5A059]/70 font-sans text-xs font-semibold shadow-sm hover:shadow transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4 text-[#B08841]" />
            <span>Add to Google Calendar</span>
          </a>

          <button
            onClick={downloadIcsFile}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/95 border border-[#C5A059]/40 text-[#142A24] hover:bg-[#FAF5EA] hover:border-[#C5A059]/70 font-sans text-xs font-semibold shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
          >
            {downloadedIcs ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Calendar Invite Added</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#B08841]" />
                <span>Download Apple / Outlook Invite (.ics)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Reveal>
  )
}

export default EventCard
