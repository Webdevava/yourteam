import { ObjectId } from 'mongodb'

export interface ContactForm {
  _id?: ObjectId
  name: string
  email: string
  phone: string
  courseInterested: string
  dateSubmitted: Date
}

