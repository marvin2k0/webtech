export interface CourseDetails {
  _id?: string,
  name: string,
  description: string,
  members: any[]
}

export const EMPTY_COURSE: CourseDetails = {
  name: "",
  description: "",
  members: []
}
