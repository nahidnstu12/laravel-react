import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table } from '@tanstack/react-table';
import { Filter } from 'lucide-react';
import { useState } from 'react';

interface FilterModalProps<T> {
    table: Table<T>;
    filterOptions?: {
        [key: string]: {
            type: 'input' | 'select';
            options?: { label: string; value: string }[];
            fetchOptions?: () => Promise<{ label: string; value: string }[]>;
        };
    };
}

export default function FilterModal<T>({ table, filterOptions = {} }: FilterModalProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [dynamicOptions, setDynamicOptions] = useState<{ [key: string]: { label: string; value: string }[] }>({});

    const handleFilterChange = (columnId: string, value: string) => {
        const column = table.getColumn(columnId);
        if (column) {
            column.setFilterValue(value);
        }
    };

    const loadDynamicOptions = async (columnId: string) => {
        const option = filterOptions[columnId];
        if (option?.fetchOptions && !dynamicOptions[columnId]) {
            const options = await option.fetchOptions();
            setDynamicOptions((prev) => ({ ...prev, [columnId]: options }));
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                    {table.getAllColumns().map((column) => {
                        const filterOption = filterOptions[column.id];
                        if (!filterOption) return null;

                        if (filterOption.type === 'input') {
                            return (
                                <div key={column.id} className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor={column.id} className="text-right">
                                        {column.id}
                                    </label>
                                    <Input
                                        id={column.id}
                                        value={(column.getFilterValue() as string) ?? ''}
                                        onChange={(e) => handleFilterChange(column.id, e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                            );
                        }

                        if (filterOption.type === 'select') {
                            const options = filterOption.options || dynamicOptions[column.id] || [];

                            if (filterOption.fetchOptions && !dynamicOptions[column.id]) {
                                loadDynamicOptions(column.id);
                            }

                            return (
                                <div key={column.id} className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor={column.id} className="text-right">
                                        {column.id}
                                    </label>
                                    <Select
                                        value={(column.getFilterValue() as string) ?? ''}
                                        onValueChange={(value) => handleFilterChange(column.id, value)}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder={`Select ${column.id}`} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">All</SelectItem>
                                            {options.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}
