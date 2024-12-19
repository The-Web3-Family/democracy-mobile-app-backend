// pagination-metadata.interface.ts

export interface PaginationMetadata {
    totalCount: number;   // Total number of items
    page: number;         // Current page number
    perPage: number;      // Number of items per page
    totalPages: number;  // Total number of pages
  }
  