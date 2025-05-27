import { router } from '@inertiajs/react';
import { Pagination } from '../ui/pagination';

interface BottomContentProps<T> {
    filters: Record<string, any>;
    paginationMeta: {
        current_page: number;
        last_page: number;
        per_page: number;
    };
    routeName: string;
}

export default function BottomContent<T>({ filters, paginationMeta, routeName }: BottomContentProps<T>) {
    const handlePageChange = (page: number) => {
        router.get(
            routeName,
            {
                ...filters,
                page,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handlePageSizeChange = (size: number) => {
        router.get(
            routeName,
            {
                ...filters,
                per_page: size,
                page: 1,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <Pagination
            currentPage={paginationMeta.current_page}
            totalPages={paginationMeta.last_page}
            pageSize={paginationMeta.per_page}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
        />
    );
}
