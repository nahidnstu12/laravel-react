import { ConfirmationDialog } from '@/components/ConfirmationDialog';
import DataTable from '@/components/datatable';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import useDrawer from '@/hooks/useDrawer';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Trash } from 'lucide-react';
import { Institution } from '../institution';
import { Level } from '../level';
import { DrawerContainer } from './drawer';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subjects',
        href: '/subjects',
    },
];

export type Subject = {
    id: string;
    name: string;
    status: string;
    level_id: string;
    institution_id: string;
    level: {
        id: number;
        name: string;
    };
    institution: {
        id: number;
        name: string;
    };
};

function SubjectList({ subjects, institutions, levels }: { subjects: Subject[]; institutions: Institution[]; levels: Level[] }) {
    const { isOpen, mode, itemId, openDrawer, closeDrawer } = useDrawer();

    const columns: ColumnDef<Subject>[] = [
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
            header: () => <div className="text-right">Name</div>,
            cell: ({ row }) => {
                const name = row.getValue('name') as string;
                return <div className="text-right font-medium">{name}</div>;
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
            accessorKey: 'level',
            header: () => <div className="text-right">Level</div>,
            cell: ({ row }) => {
                const level = row.original.level.name;
                return <div className="text-right font-medium">{level}</div>;
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
                            title="Delete Subject"
                            description="Are you sure you want to delete this subject?"
                            deleteText="Delete"
                            cancelText="Cancel"
                            route={route('subjects.destroy', row.original.id)}
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
                <h1 className="mb-4 text-center text-2xl font-bold">Subjects List</h1>
                <DataTable columns={columns} data={subjects} openDrawer={openDrawer} title="Subject" />
            </div>
            <DrawerContainer isOpen={isOpen} onClose={closeDrawer} mode={mode} itemId={itemId} options={{ institutions, levels }} />
        </AppLayout>
    );
}

export default SubjectList;
