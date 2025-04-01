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
  sortBy?: string;
  sort?: string;
}

export interface FilterUser {
  department_id: number,
  role_id: number
}

export interface ParamsUserFilter  {
  page: number,
  pageSize: number,
  sortBy: string,
  sort: string,
  department_id?: number | null | string | undefined,
  role_id?: number | null | string | undefined,
  search: string
}

export interface ParamsCreateNewUser {
  department_id:  string ,
  role_id:  string ,
  username: string,
  password: string,
  email: string
}

export interface PayloadDelete {
  listIdsDelete: Array<number>
}
export interface FilterUserProps {
  setParams:  React.Dispatch<React.SetStateAction<ParamsUserFilter>>
}