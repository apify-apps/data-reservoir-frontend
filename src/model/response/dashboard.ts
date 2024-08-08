export interface DashboardResponse {
  category: string,
  owner: string,
  tables: DashboardTableResponse[]
}

export interface DashboardTableResponse {
  tableName: string,
  rowCount: number,
}