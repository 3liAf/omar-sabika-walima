export interface GuestWish {
  id: string
  name: string
  message: string
  timestamp: string
}

export interface RsvpContact {
  displayNumber: string
  rawNumber: string
  whatsappUrl: string
  telUrl: string
}

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
}
