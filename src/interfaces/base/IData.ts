export interface IData<
  TTableData,
  TTableInsertData,
  TReturnType,
  TCollectionReturnType
> {
  insert(item: TTableInsertData): TReturnType;
  update(item: TTableData): TReturnType;
  delete(id: number): TReturnType;
  getBy(columnName: string, value: string): TCollectionReturnType;
  getAll(): TCollectionReturnType;
}
