export type Language = 'id' | 'en'

export interface PersonalInfo {
  name: string
  title: string
  avatar: string
  location: string
  email: string
  website: string
  github: string
  linkedin: string
  instagram: string
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
  color: string
  descriptions: string[]
  descriptionsEn: string[]
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

export interface ProjectItem {
  id: number
  title: string
  description: string
  descriptionEn: string
  longDescription?: string
  longDescriptionEn?: string
  category: string
  technologies: string[]
  image: string
  liveDemoUrl?: string
  sourceCodeUrl?: string
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
