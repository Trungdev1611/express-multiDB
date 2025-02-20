import { PagninateType } from "../commonType";

export interface UserType {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
    role_id: number;
    department_id: number;
    role_name: string;
    department_name: string;
  }

  export interface DataPagninateUser {
    data: UserType[],
    paginate: PagninateType
  }

  export interface ParamsGetUserType {
  page: number;
  pageSize: number;
  sortBy: string;
  sort: string;
}