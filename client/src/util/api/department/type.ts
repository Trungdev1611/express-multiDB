import { PagninateType } from "../commonType";

export interface DepartmentType {
    id: number,
    name: string,
    created_at: string
}

export interface DepartmentPaginate {
    paginate: PagninateType,
    data: DepartmentType[]

}