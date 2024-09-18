export interface ICandidateModel {
  id: number
  name: string
  politicalParty: string
  referenceNumber: string
  slogan: string
  image: string
  role: string
  createdAt: string
  updatedAt: string
  color: string
  comments: Array<any>
}

export interface IVoteCandidateModel {
  id: number
  name: string
  image: string
  color: string
  reference_number: string
  votes_count: number
  vote_percentage: number
}
