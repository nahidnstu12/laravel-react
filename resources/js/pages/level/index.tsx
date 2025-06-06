import DataTable from '@/components/datatable';
import { ConfirmationDialog } from '@/components/shared/ConfirmationDialog';
import { DrawerContainer } from '@/components/shared/drawer-container';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import useDrawer from '@/hooks/useDrawer';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Institution, Level } from '@/types/feature-types';
import { CustomColumnDef } from '@/types/shared-types';
import { Eye, Pencil, Trash } from 'lucide-react';
import Form from './Form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Levels',
        href: '/levels',
    },
];

interface LevelListProps {
    levels: {
        data: Level[];
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
        status?: boolean;
        sort_field?: string;
        sort_direction?: 'asc' | 'desc';
        per_page?: number;
    };
    institutions: Institution[];
}

function LevelList({ levels, institutions, filters }: LevelListProps) {
    const { isOpen, mode, itemId, openDrawer, closeDrawer } = useDrawer();

    const columns: CustomColumnDef<Level>[] = [
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
            enableColumnFilter: true,
            filterField: 'input',

        },
        {
            accessorFn: (row) => row.institution?.name,
            id: 'institution_id',
            header: () => <div className="text-center">Institution</div>,
            cell: ({ row }) => {
                const institution = row.original.institution?.name;
                return <div className="text-center font-medium">{institution || 'N/A'}</div>;
            },
            enableColumnFilter: true,
            filterField: 'select',
            filteredItems: institutions.map((institution) => ({ label: institution.name, value: institution.id })),
        },

        {
            accessorKey: 'status',
            header: () => <div className="text-center">Status</div>,
            cell: ({ row }) => {
                const status = row.getValue('status');
                return <div className="text-center font-medium">{status === true ? 'Active' : 'Inactive'}</div>;
            },
            enableColumnFilter: true,
            filterField: 'select',
            filteredItems: [
                { label: 'Active', value: 'true' },
                { label: 'Inactive', value: 'false' },
            ],
        },
        {
            id: 'actions',
            enableHiding: false,
            enableSorting: false,
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
                            title="Delete Level"
                            description="Are you sure you want to delete this level?"
                            deleteText="Delete"
                            cancelText="Cancel"
                            route={route('levels.destroy', row.original.id)}
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
                <h1 className="mb-4 text-center text-2xl font-bold">Levels List</h1>
                <DataTable columns={columns}
                    data={levels.data}
                    openDrawer={openDrawer}
                    title="Level"
                    routeName={route('levels.index')}
                    paginationMeta={{
                        current_page: levels.current_page,
                        last_page: levels.last_page,
                        per_page: levels.per_page,
                        total: levels.total,
                    }}
                    filters={filters}
                />
            </div>
            <DrawerContainer
                drawerSettings={{ isOpen, onClose: closeDrawer, mode, itemId }}
                formSettings={{
                    initialData: {
                        name: '',
                        status: false,
                        institution_id: '',
                    },
                    postRoute: 'levels.store',
                    updateRoute: 'levels.update',
                    showRoute: 'levels.show',
                    transformResponse: (data) => ({
                        name: data.name || '',
                        status: data.status || false,
                        institution_id: data.institution_id || '',
                    }),
                }}
                featureTitle="Level"
            >
                {({ data, setData, errors, mode }) => <Form data={data} setData={setData} errors={errors} mode={mode} options={{ institutions }} />}
            </DrawerContainer>
        </AppLayout>
    );
}

export default LevelList;
