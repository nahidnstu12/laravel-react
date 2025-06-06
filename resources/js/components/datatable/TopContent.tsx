import { Button } from '@/components/ui/button';
import { DrawerMode } from '@/hooks/useDrawer';
import { Table } from '@tanstack/react-table';
import FilterModal from './FilterModal';

interface TopContentProps<T> {
    table: Table<T>;
    openDrawer: (mode: DrawerMode, id?: string) => void;
    title: string;
    onFilterChange: (filters: Record<string, any>) => void;
    filters?: Record<string, any>;
    totalItems: number;
}

export default function TopContent<T>({ table, openDrawer, title, onFilterChange, filters = {}, totalItems }: TopContentProps<T>) {
    return (
        <div className="flex items-center justify-between py-4">
            <h2 className="text-lg font-semibold">
                {title} <span className="text-sm text-gray-500">(showing {totalItems} items)</span>
            </h2>
            <div className="flex items-center space-x-2">
                <FilterModal table={table} onFilterChange={onFilterChange} filters={filters} />
                <Button onClick={() => openDrawer('create')}>Add New</Button>
            </div>
        </div>
    );
}
