import { ObjectId } from 'mongodb'

export interface Course {
  _id?: ObjectId
  title: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  description: string
  thumbnail: string
  content: {
    type: 'pdf' | 'video' | 'image'
    url: string
  }[]
  datePublished: Date
  author: string
  colleges: ObjectId[]
}