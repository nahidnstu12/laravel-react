import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { DrawerMode } from '@/hooks/useDrawer';
import { Column, Table } from '@tanstack/react-table';
import { ChevronDown, Plus } from 'lucide-react';
interface TopContentProps<T> {
    table: Table<T>;
    openDrawer: (mode: DrawerMode, id?: string) => void;
}

export default function TopContent<T>({ table, openDrawer }: TopContentProps<T>) {
    return (
        <div className="flex items-center py-4">
            <Input
                placeholder="Filter emails..."
                value={(table.getColumn('user.email')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('user.email')?.setFilterValue(event.target.value)}
                className="max-w-sm"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter((column: Column<T>) => column.getCanHide())
                        .map((column: Column<T>) => {
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
                Add Institution
            </Button>
        </div>
    );
}
