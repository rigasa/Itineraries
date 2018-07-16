export interface IFavorite {
  name: string,
  path: string,
  userId?: string,
  created?: {
    $date: string
  },
  modified?: {
    $date: string
  },
  lang?: string
};