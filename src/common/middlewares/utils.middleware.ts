import { Pagination } from "../models/pagination.model";

export class Utils {
    public ValidatePagination(strPageSize: string, strPage: string): Pagination {
        
        const pageSize = parseInt(strPageSize + "" ?? 10);
        const page = parseInt(strPage ?? 1); 
        const pagination: Pagination = { pageSize, page: page < 1 ? 1: page  };
        pagination.skip = pagination.page === 1 ? pagination.page : ((pagination.page - 1) * pagination.pageSize);
        return pagination
    }

    public GetTotalPages(count: number, pageSize: number): number {
        const tempTotal = count / pageSize;
        return (tempTotal | 0) < tempTotal ? (tempTotal | 0) + 1 : tempTotal ; 
    }
}