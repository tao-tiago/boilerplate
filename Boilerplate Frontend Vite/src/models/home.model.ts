export interface IData {
  id: string
  name: string
}

export interface IHomePage {
  data: IData[]
  isLoading: boolean
  refetch: () => void
}
