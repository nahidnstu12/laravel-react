import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomColumnDef } from '@/types/shared-types';
import { Table } from '@tanstack/react-table';
import { Filter } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import DateRangeInput from './DateRangeInput';
import { useDatatableStore } from '@/store/datatableStore';

interface FilterModalProps<T> {
    table: Table<T>;
    onFilterChange: (filters: Record<string, any>) => void;
    filters?: Record<string, any>;
}
function toDateInputValue(val?: string | Date): string | undefined {
    if (!val) return undefined;
    if (val instanceof Date) {
      return val.toISOString().split('T')[0];
    }
    if (typeof val === 'string' && val.includes('T')) {
      return val.split('T')[0];
    }
    return val;
  }
export default function FilterModal<T>({ table, onFilterChange, filters = {} }: FilterModalProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const { filters: globalFilters, setFilters } = useDatatableStore();

    // Track filter values locally
    const filterableColumns = useMemo(() => table.getAllColumns().filter((col) => col.columnDef?.enableColumnFilter), [table]);

    // Initialize filter values from URL parameters
    const initialFilterState = useMemo(() => {
        const state: Record<string, any> = {};
        filterableColumns.forEach((col) => {
            const columnId = col.id;
            const columnDef = col.columnDef as CustomColumnDef<T>;
            // Use URL parameters if available, otherwise use empty string or default value
            if (columnDef.filterField === 'daterange') {
                // For native input type="date" (string format)
                state[columnId] = {
                  from: toDateInputValue(filters[`${columnId}_from`]),
                  to: toDateInputValue(filters[`${columnId}_to`]),
                };
              } else {
                state[columnId] = filters[columnId] || '';
            }
        });
        return state;
    }, [filterableColumns, filters]);

    // const [filterValues, setFilterValues] = useState<Record<string, any>>(initialFilterState);

    console.log('filterValues', globalFilters);

    // Update local state when filters prop changes
    useEffect(() => {
        setFilters(initialFilterState);
    }, [filters]);

    // Update local state when modal opens
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            setFilters(initialFilterState);
        }
    };

    const handleInputChange = (
        columnId: string,
        value: string | { from: Date | undefined; to: Date | undefined } | { from: string | undefined; to: string | undefined }
      ) => {
        setFilters({...globalFilters, [columnId]: value});
      };

    const handleApply = () => {
        // Process filters for server request
        const activeFilters = Object.entries(globalFilters).reduce(
            (acc, [key, value]) => {
                if (value) {
                    if (typeof value === 'object' && 'from' in value) {
                        // Handle date range
                        if (value.from) {
                            
                            // acc[`${key}_from`] = value.from.toISOString().split('T')[0];
                            acc[`${key}_from`] = value.from
                        }
                        if (value.to) {
                            acc[`${key}_to`] = value.to;
                        }
                    } else if (value !== 'all') {
                        // Handle other filters
                        acc[key] = value;
                    }
                }
                return acc;
            },
            {} as Record<string, any>,
        );

        onFilterChange(activeFilters);
        setIsOpen(false);
    };

    const handleReset = () => {
        // Clear all filter values
        const clearedFilters = Object.keys(globalFilters).reduce(
            (acc, key) => {
                const columnDef = filterableColumns.find((col) => col.id === key) as CustomColumnDef<T>;
                if (columnDef?.filterField === 'daterange') {
                    acc[key] = { from: undefined, to: undefined };
                } else {
                    acc[key] = '';
                }
                return acc;
            },
            {} as Record<string, any>,
        );

        setFilters(clearedFilters);
        onFilterChange(clearedFilters);
        setIsOpen(false);
    };

    const getColumnLabel = (header: any) => {
        const columnDef = header.column.columnDef as CustomColumnDef<T>;
        if (typeof columnDef.header === 'function') {
            const context = header.getContext();
            const headerContent = columnDef.header(context);
            if (headerContent && typeof headerContent === 'object') {
                return headerContent.props?.children || header.column.id;
            }
            return headerContent;
        }
        return columnDef.header || header.column.id;
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="ml-2">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Filter Table</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {table.getHeaderGroups().map((headerGroup) =>
                        headerGroup.headers
                            .filter((header) => {
                                const columnDef = header.column.columnDef as CustomColumnDef<T>;
                                return columnDef.enableColumnFilter;
                            })
                            .map((header) => {
                                const columnDef = header.column.columnDef as CustomColumnDef<T>;
                                const filterField = columnDef.filterField;
                                const label = getColumnLabel(header);
                                const filteredItems = columnDef.filteredItems || [];
                                const column = header.column;
                                const columnId = column.id;

                                if (filterField === 'daterange') {
                                    return (
                                        <DateRangeInput
                                            label="Joining Date"
                                            value={globalFilters.joining_date || { from: undefined, to: undefined }}
                                            onChange={(val) => handleInputChange('joining_date', val)}
                                            name="joining_date"
                                        />
                                    );
                                }

                                if (filterField === 'select') {
                                    return (
                                        <div key={columnId} className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor={columnId} className="text-right">
                                                {label}
                                            </label>
                                            <Select
                                                value={globalFilters[columnId] ?? 'all'}
                                                onValueChange={(value) => handleInputChange(columnId, value)}
                                            >
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder={`Filter by ${label}`} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All</SelectItem>
                                                    {filteredItems.map((option: any) => (
                                                        <SelectItem key={option.value ?? option.id} value={String(option.value ?? option.id)}>
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
                                            value={globalFilters[columnId] ?? ''}
                                            onChange={(e) => handleInputChange(columnId, e.target.value)}
                                            className="col-span-3"
                                            placeholder={`Filter by ${label}`}
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
