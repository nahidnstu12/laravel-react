// ... existing imports ...
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomColumnDef } from '@/types/shared-types';
import { Table } from '@tanstack/react-table';
import { Filter } from 'lucide-react';
import { useMemo, useState } from 'react';

interface FilterModalProps<T> {
    table: Table<T>;
}

export default function FilterModal<T>({ table }: FilterModalProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    // Track filter values locally
    const filterableColumns = useMemo(() => table.getAllColumns().filter((col) => col.columnDef?.enableColumnFilter), [table]);
    const initialFilterState = useMemo(() => {
        const state: Record<string, string> = {};
        filterableColumns.forEach((col) => {
            state[col.id] = (col.getFilterValue() as string) ?? '';
        });
        return state;
    }, [filterableColumns]);
    const [filterValues, setFilterValues] = useState<Record<string, string>>(initialFilterState);

    // Update local state when modal opens
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            // Reset local state to current table filter values
            const state: Record<string, string> = {};
            filterableColumns.forEach((col) => {
                state[col.id] = (col.getFilterValue() as string) ?? '';
            });
            setFilterValues(state);
        }
    };

    const handleInputChange = (columnId: string, value: string) => {
        setFilterValues((prev) => ({ ...prev, [columnId]: value }));
    };

    const handleApply = () => {
        filterableColumns.forEach((col) => {
            col.setFilterValue(filterValues[col.id]);
        });
        setIsOpen(false);
    };

    const handleReset = () => {
        filterableColumns.forEach((col) => {
            col.setFilterValue('');
        });
        setFilterValues({});
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="ml-2">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Filter Table</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {table.getHeaderGroups().map((headerGroup) =>
                        headerGroup.headers
                            .filter((header) => header.column.columnDef?.enableColumnFilter)
                            .map((header) => {
                                const columnDef = header.column.columnDef as CustomColumnDef<T>;
                                const filterField = columnDef.filterField;
                                const label =
                                    typeof columnDef.header === 'function'
                                        ? columnDef.header(header.getContext())
                                        : columnDef.header || header.column.id;
                                const filteredItems = columnDef.filteredItems || [];
                                const column = header.column;
                                const columnId = column.id;

                                if (filterField === 'select') {
                                    return (
                                        <div key={columnId} className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor={columnId} className="text-right">
                                                {label}
                                            </label>
                                            <Select
                                                value={filterValues[columnId] ?? ''}
                                                onValueChange={(value) => handleInputChange(columnId, value)}
                                            >
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder={`Select ${label}`} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="">All</SelectItem>
                                                    {filteredItems.map((option: any) => (
                                                        <SelectItem key={option.value ?? option.id} value={option.value ?? option.id}>
                                                            {option.label ?? option.title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    );
                                }

                                // Default to input
                                return (
                                    <div key={columnId} className="grid grid-cols-4 items-center gap-4">
                                        <label htmlFor={columnId} className="text-right">
                                            {label}
                                        </label>
                                        <Input
                                            id={columnId}
                                            value={filterValues[columnId] ?? ''}
                                            onChange={(e) => handleInputChange(columnId, e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                );
                            }),
                    )}
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={handleReset} type="button">
                        Reset
                    </Button>
                    <Button onClick={handleApply} type="button">
                        Apply
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
