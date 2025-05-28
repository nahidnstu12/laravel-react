import DataTable from '@/components/datatable';
import { ConfirmationDialog } from '@/components/shared/ConfirmationDialog';
import { DrawerContainer } from '@/components/shared/drawer-container';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import useDrawer from '@/hooks/useDrawer';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Institution, Subject } from '@/types/feature-types';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Trash } from 'lucide-react';
import Form from './Form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subjects',
        href: '/subjects',
    },
];

interface SubjectListProps {
    subjects: {
        data: Subject[];
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
    };
    filters: {
        name?: string;
        institution_id?: string;
        level_id?: string;
        status?: boolean;
        sort_field?: string;
        sort_direction?: 'asc' | 'desc';
        per_page?: number;
    };
    institutions: Institution[];
}

function SubjectList({ subjects, institutions, filters }: SubjectListProps) {
    const { isOpen, mode, itemId, openDrawer, closeDrawer } = useDrawer();

    // const filterOptions = {
    //     name: {
    //         type: 'input' as const,
    //     },
    //     'institution.name': {
    //         type: 'select' as const,
    //         options: institutions.map((institution) => ({
    //             label: institution.name,
    //             value: institution.id.toString(),
    //         })),
    //     },
    //     level: {
    //         type: 'select' as const,
    //         options: levels.map((level) => ({
    //             label: level.name,
    //             value: level.id.toString(),
    //         })),
    //     },
    // };

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
            header: () => <div className="text-center">Name</div>,
            cell: ({ row }) => {
                const name = row.getValue('name') as string;
                return <div className="text-center font-medium">{name}</div>;
            },
        },
        {
            accessorFn: (row) => row.institution.name,
            id: 'institution.name',
            header: () => <div className="text-center">Institution</div>,
            cell: ({ row }) => {
                const institution = row.original.institution.name;
                return <div className="text-center font-medium">{institution}</div>;
            },
        },
        {
            accessorFn: (row) => row.level.name,
            id: 'level.name',
            header: () => <div className="text-center">Level</div>,
            cell: ({ row }) => {
                const level = row.original.level.name;
                return <div className="text-center font-medium">{level}</div>;
            },
        },
        {
            accessorKey: 'status',
            header: () => <div className="text-center">Status</div>,
            cell: ({ row }) => {
                const status = row.getValue('status');
                return <div className="text-center font-medium">{status === true ? 'Active' : 'Inactive'}</div>;
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
                <DataTable
                    columns={columns}
                    data={subjects.data}
                    openDrawer={openDrawer}
                    title="Subject"
                    routeName={route('subjects.index')}
                    paginationMeta={{ current_page: subjects.current_page, last_page: subjects.last_page, per_page: subjects.per_page }}
                    filters={filters}
                />
            </div>
            <DrawerContainer
                drawerSettings={{ isOpen, onClose: closeDrawer, mode, itemId }}
                formSettings={{
                    initialData: {
                        name: '',
                        description: '',
                        status: false,
                        institution_id: '',
                        level_id: '',
                    },
                    postRoute: 'subjects.store',
                    updateRoute: 'subjects.update',
                    showRoute: 'subjects.show',
                    transformResponse: (data) => ({
                        name: data.name || '',
                        description: data.description || '',
                        status: data.status || false,
                        institution_id: data.institution_id || '',
                        level_id: data.level_id || '',
                    }),
                }}
                featureTitle="Subject"
            >
                {({ data, setData, errors, mode }) => <Form data={data} setData={setData} errors={errors} mode={mode} options={{ institutions }} />}
            </DrawerContainer>
        </AppLayout>
    );
}

export default SubjectList;
