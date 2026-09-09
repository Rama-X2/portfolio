export type Language = 'id' | 'en'

export interface PersonalInfo {
  name: string
  title: string
  avatar: string
  location: string
  github: string
  linkedin: string
  instagram: string
  discord?: string
  website?: string
  email?: string
  phone?: string
  whatsapp?: string
}

export interface TechStackItem {
  name: string
  icon: string
}

export interface ExperienceItem {
  position: string
  positionEn: string
  period: string
  periodEn: string
  descriptions: string[]
  descriptionsEn: string[]
  color: string
}

export interface EducationItem {
  institution: string
  degree: string
  degreeEn: string
  period: string
  periodEn: string
  location: string
  locationEn: string
  logo: string | null
  ongoing: boolean
}

export interface StatItem {
  icon: any
  value: string | number
  labelId: string
  labelEn: string
  descId: string
  descEn: string
  gradient: string
  color: string
  bg: string
  targetId?: string
}

export interface ProjectItem {
  id: number
  title: string
  description: string
  descriptionEn: string
  longDescription?: string
  longDescriptionEn?: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  liveDemoUrl?: string
  sourceCodeUrl?: string
  category: string
  featured?: boolean
}

export interface AchievementItem {
  id: number
  title: string
  issuer: string
  date: string
  dateEn?: string
  image: string
  verifyUrl?: string
}

export interface SectionNav {
  id: string
  name: string
  icon: any
}
