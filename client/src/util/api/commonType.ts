export interface PagninateType {
    page: number,
    pageSize: number,
    total:  number
}

export interface PayloadPaginate {page: number, pageSize?: number}