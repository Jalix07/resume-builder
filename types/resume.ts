export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin?: string
  website?: string
  summary: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Skill {
  id: string
  name: string
  level: number // 1-5
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
}

export interface Template {
  id: string
  name: string
  thumbnail: string
  isPremium: boolean
}
