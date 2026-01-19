export interface Career {
  name?: string
  careerName?: string
  category?: string
  image?: string
  resources?: {
    online: string[]
    offline: string[]
  }
  skillsRequired?: string[]
  careerPath?: CareerPathLevel[]
  description?: string
}

export interface CareerCategory {
  id: number
  category: string
  careers: Career[]
}

export interface CareerPathLevel {
  level: string
  options: string[]
}

export interface Blog {
  id?: string
  careerName?: string
  title?: string
  author?: string
  quote?: string
  quoteAuth?: string
  data?: string
  content?: BlogContent[]
}

export interface BlogContent {
  question: string
  answer: string
}

export interface Category {
  id: string
  name: string
  image: string
  careers: string[]
}
