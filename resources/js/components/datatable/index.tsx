import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DrawerMode } from '@/hooks/useDrawer';
import { router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import BottomContent from './BottomContent';
import TopContent from './TopContent';
import { CustomColumnDef } from '@/types/shared-types';

interface DataTableProps<TData, TValue> {
    columns: CustomColumnDef<TData>[];
    data: TData[];
    openDrawer: (mode: DrawerMode, id?: string) => void;
    title: string;
    filters?: Record<string, any>;
    onSortingChange?: (field: string, direction: 'asc' | 'desc') => void;
    routeName: string;
    paginationMeta: {
        current_page: number;
        last_page: number;
        per_page: number;
    };
}

export default function DataTable<TData, TValue>({
    columns,
    data,
    openDrawer,
    title,
    filters = {},
    onSortingChange,
    routeName,
    paginationMeta,
}: DataTableProps<TData, TValue>) {
    // No local sorting/columnFilters state, use filters from props
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true, // Enable manual sorting
        state: {
            sorting: filters.sort_field ? [{ id: filters.sort_field, desc: filters.sort_direction === 'desc' }] : [],
        },
    });

    const handleSorting = (header: any) => {
        if (!header.column.getCanSort()) return;
        const currentField = filters.sort_field;
        const currentDirection = filters.sort_direction;
        let newDirection: 'asc' | 'desc' = 'asc';
        if (currentField === header.column.id && currentDirection === 'asc') {
            newDirection = 'desc';
        }
        if (onSortingChange) {
            onSortingChange(header.column.id, newDirection);
        } else {
            router.get(
                routeName,
                {
                    ...filters,
                    sort_field: header.column.id,
                    sort_direction: newDirection,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }
    };

    return (
        <>
            <TopContent table={table} openDrawer={openDrawer} title={title} />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const isSorted = filters.sort_field === header.column.id ? filters.sort_direction : undefined;
                                    return (
                                        <TableHead
                                            key={header.id}
                                            onClick={() => handleSorting(header)}
                                            className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                {isSorted === 'asc' && <ArrowUp className="h-4 w-4" />}
                                                {isSorted === 'desc' && <ArrowDown className="h-4 w-4" />}
                                            </div>
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <BottomContent routeName={routeName} filters={filters} paginationMeta={paginationMeta} />
        </>
    );
}
