import DataTable from '@/components/datatable';
import { ConfirmationDialog } from '@/components/shared/ConfirmationDialog';
import { DrawerContainer } from '@/components/shared/drawer-container';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import useDrawer from '@/hooks/useDrawer';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Institution, Teacher } from '@/types/feature-types';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Trash } from 'lucide-react';
import Form from './Form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teachers',
        href: '/teachers',
    },
];

interface TeacherListProps {
    teachers: {
        data: Teacher[];
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

function TeacherList({ teachers, institutions, filters }: TeacherListProps) {
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
            header: () => <div className="text-center">User Name</div>,
            cell: ({ row }) => {
                const username = row.original.user.name;
                return <div className="text-center font-medium">{username}</div>;
            },
        },
        {
            accessorFn: (row) => row.user.email,
            id: 'user.email',
            header: () => <div className="text-center">User Email</div>,
            cell: ({ row }) => {
                const email = row.original.user.email;
                return <div className="text-center font-medium">{email}</div>;
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
            accessorKey: 'pds_id',
            header: () => <div className="text-center">PDS ID</div>,
            cell: ({ row }) => {
                const pds_id = row.getValue('pds_id') as string;
                return <div className="text-center font-medium">{pds_id}</div>;
            },
        },

        {
            accessorKey: 'designation',
            header: () => <div className="text-center">Designation</div>,
            cell: ({ row }) => {
                const designation = row.getValue('designation') as string;
                return <div className="text-center font-medium">{designation}</div>;
            },
        },
        {
            accessorKey: 'joining_date',
            header: () => <div className="text-center">Joining Date</div>,
            cell: ({ row }) => {
                const joining_date = row.getValue('joining_date') as string;
                return <div className="text-center font-medium">{joining_date}</div>;
            },
        },

        {
            accessorKey: 'address',
            header: () => <div className="text-center">Address</div>,
            cell: ({ row }) => {
                const address = row.getValue('address') as string;
                return <div className="text-center font-medium">{address}</div>;
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
                <DataTable
                    columns={columns}
                    data={teachers.data}
                    openDrawer={openDrawer}
                    title="Teacher"
                    routeName={route('teachers.index')}
                    paginationMeta={{ current_page: teachers.current_page, last_page: teachers.last_page, per_page: teachers.per_page }}
                    filters={filters}
                />
            </div>
            <DrawerContainer
                drawerSettings={{ isOpen, onClose: closeDrawer, mode, itemId }}
                formSettings={{
                    initialData: {
                        pds_id: '',
                        designation: '',
                        address: '',
                        status: false,
                        institution_id: '',
                        district: '',
                        created_at: '',
                        updated_at: '',
                        location: '',
                        joining_date: '',
                        user: {
                            id: '',
                        },
                        user_name: '',
                        user_email: '',
                    },
                    postRoute: 'teachers.store',
                    updateRoute: 'teachers.update',
                    showRoute: 'teachers.show',
                    transformResponse: (data) => ({
                        user_name: data.user?.name || '',
                        name: data.name || '',
                        pds_id: data.pds_id || '',
                        designation: data.designation || '',
                        address: data.address || '',
                        status: data.status || true,
                        institution_id: data.institution_id || '',
                        district: data.district || '',
                        created_at: data.created_at || '',
                        updated_at: data.updated_at || '',
                        location: data.location || '',
                        joining_date: data.joining_date || '',
                        user_email: data.user?.email || '',
                    }),
                }}
                featureTitle="Teacher"
            >
                {({ data, setData, errors, mode }) => <Form data={data} setData={setData} errors={errors} mode={mode} options={{ institutions }} />}
            </DrawerContainer>
        </AppLayout>
    );
}

export default TeacherList;
