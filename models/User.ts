import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  name: string
  email: string
  dob: Date
  college: string
  contactNumber: string
  password: string
  isAdmin: boolean
  enrolledCourses: ObjectId[]
  enrolledProjects: ObjectId[]
}

