import { Pagination } from "./pagination.model"

export interface ResultSearch<T> {
    data: T
    pagination: Pagination;
}