import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DrawerMode } from '@/hooks/useDrawer';
import { Table } from '@tanstack/react-table';
import { ChevronDown, Plus } from 'lucide-react';
import FilterModal from './FilterModal';

interface TopContentProps<T> {
    table: Table<T>;
    openDrawer: (mode: DrawerMode, id?: string) => void;
    title: string;
    filterOptions?: {
        [key: string]: {
            type: 'input' | 'select';
            options?: { label: string; value: string }[];
            fetchOptions?: () => Promise<{ label: string; value: string }[]>;
        };
    };
}

export default function TopContent<T>({ table, openDrawer, title, filterOptions }: TopContentProps<T>) {
    return (
        <div className="flex items-center py-4">
            <FilterModal table={table} filterOptions={filterOptions} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="ml-1 cursor-pointer" onClick={() => openDrawer('create')}>
                <Plus />
                Add {title}
            </Button>
        </div>
    );
}
