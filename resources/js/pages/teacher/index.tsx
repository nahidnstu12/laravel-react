import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import DataTable from '@/components/datatable';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import useDrawer from '@/hooks/useDrawer';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, Pencil, Trash } from 'lucide-react';
import { DrawerContainer } from './drawer';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teachers',
        href: '/teachers',
    },
];

export type Teacher = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
    created_at: string;
    updated_at: string;
    location: string;
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        created_at: string;
        updated_at: string;
    };
};

function TeacherList({ teachers }: { teachers: Teacher[] }) {
    const { isOpen, mode, itemId, openDrawer, closeDrawer } = useDrawer();

    const columns: ColumnDef<Teacher>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
            ),
            enableSorting: false,
            enableHiding: false,
        },

        {
            accessorKey: 'name',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Name
                        <ArrowUpDown />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue('name')}</div>,
        },
        {
            accessorFn: (row) => row.user.name,
            id: 'user.name',
            header: () => <div className="text-right">User Name</div>,
            cell: ({ row }) => {
                const username = row.original.user.name;
                return <div className="text-right font-medium">{username}</div>;
            },
        },
        {
            accessorFn: (row) => row.user.email,
            id: 'user.email',
            header: () => <div className="text-right">User Email</div>,
            cell: ({ row }) => {
                const email = row.original.user.email;
                return <div className="text-right font-medium">{email}</div>;
            },
        },
        {
            accessorKey: 'pds_id',
            header: () => <div className="text-right">PDS ID</div>,
            cell: ({ row }) => {
                const pds_id = row.getValue('pds_id') as string;
                return <div className="text-right font-medium">{pds_id}</div>;
            },
        },

        {
            accessorKey: 'designation',
            header: () => <div className="text-right">Designation</div>,
            cell: ({ row }) => {
                const designation = row.getValue('designation') as string;
                return <div className="text-right font-medium">{designation}</div>;
            },
        },
        {
            accessorKey: 'phone',
            header: () => <div className="text-right">Phone</div>,
            cell: ({ row }) => {
                const phone = row.getValue('phone') as string;
                return <div className="text-right font-medium">{phone}</div>;
            },
        },
        {
            accessorKey: 'address',
            header: () => <div className="text-right">Address</div>,
            cell: ({ row }) => {
                const address = row.getValue('address') as string;
                return <div className="text-right font-medium">{address}</div>;
            },
        },
        {
            accessorKey: 'status',
            header: () => <div className="text-right">Status</div>,
            cell: ({ row }) => {
                const status = row.getValue('status') as string;
                return <div className="text-right font-medium">{status}</div>;
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            header: () => <div className="text-center">Actions</div>,
            cell: ({ row }) => {
                return (
                    <div className="flex justify-center gap-2">
                        <Button variant="outline" onClick={() => openDrawer('read', row.original.id)}>
                            <Eye />{' '}
                        </Button>
                        <Button variant="outline" onClick={() => openDrawer('edit', row.original.id)}>
                            <Pencil />{' '}
                        </Button>
                        <ConfirmationDialog
                            title="Delete Teacher"
                            description="Are you sure you want to delete this teacher?"
                            deleteText="Delete"
                            cancelText="Cancel"
                            route={route('teachers.destroy', row.original.id)}
                        >
                            <Button variant="outline">
                                <Trash />{' '}
                            </Button>
                        </ConfirmationDialog>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="container mx-auto my-10 w-full">
                <h1 className="mb-4 text-center text-2xl font-bold">Teachers List</h1>
                <DataTable columns={columns} data={teachers} openDrawer={openDrawer} title="Teacher" />
            </div>
            <DrawerContainer isOpen={isOpen} onClose={closeDrawer} mode={mode} itemId={itemId} />
        </AppLayout>
    );
}

export default TeacherList;
