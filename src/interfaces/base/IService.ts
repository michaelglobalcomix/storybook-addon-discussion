import { IComment } from "@interfaces/comment";

export interface IService<TTableData, TReturnType, TCollectionReturnType> {
  insert(item: IComment): TReturnType;
  update(item: TTableData): TReturnType;
  delete(id: number): TReturnType;
  getBy(columnName: string, value: string): TCollectionReturnType;
  getAll(): TCollectionReturnType;
}
