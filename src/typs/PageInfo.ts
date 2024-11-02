export interface PageInfo<T> {
  endRow: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  isFirstPage: boolean
  isLastPage: boolean
  list: T[]
  navigateFirstPage: number
  navigateLastPage: number
  navigatePages: number
  navigatepageNums: number[]
  nextPage: number
  pageNum: number
  pageSize: number
  pages: number
  prePage: number
  size: number
  startRow: number
  total: number
}
