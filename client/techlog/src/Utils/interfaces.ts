export interface IReport {
  _id?: string,
  title: string,
  tags: string[],
  description: string,
  steps: string[],
  images?: string[]
}
