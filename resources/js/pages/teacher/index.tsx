import { ConfirmationDialog } from '@/components/shared/ConfirmationDialog';
import DataTable from '@/components/datatable';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import useDrawer from '@/hooks/useDrawer';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Trash } from 'lucide-react';
import { DrawerContainer } from './drawer';
import { Institution, Teacher } from '@/types/feature-types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teachers',
        href: '/teachers',
    },
];



function TeacherList({ teachers, institutions }: { teachers: Teacher[], institutions: Institution[] }) {
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
            accessorFn: (row) => row.institution.name,
            id: 'institution.name',
            header: () => <div className="text-right">Institution</div>,
            cell: ({ row }) => {
                const institution = row.original.institution.name;
                return <div className="text-right font-medium">{institution}</div>;
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
                const status = row.getValue('status');
                return <div className="text-right font-medium">{status === true ? 'Active' : 'Inactive'}</div>;
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
            <DrawerContainer isOpen={isOpen} onClose={closeDrawer} mode={mode} itemId={itemId} options={{institutions}} />
        </AppLayout>
    );
}

export default TeacherList;
