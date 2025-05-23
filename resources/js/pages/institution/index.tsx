import { ConfirmationDialog } from '@/components/shared/ConfirmationDialog';
import DataTable from '@/components/datatable';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import useDrawer from '@/hooks/useDrawer';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, Pencil, Trash } from 'lucide-react';
import { Institution } from '@/types/feature-types';
import { DrawerContainer } from '@/components/shared/drawer-container';
import Form from './Form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Institutions',
        href: '/institutions',
    },
];

function InstitutionList({ institutions }: { institutions: Institution[] }) {
    const { isOpen, mode, itemId, openDrawer, closeDrawer } = useDrawer();

    const columns: ColumnDef<Institution>[] = [
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
            accessorKey: 'registration_no',
            header: () => <div className="text-right">Registration No</div>,
            cell: ({ row }) => {
                const registration_no = row.getValue('registration_no') as string;
                return <div className="text-right font-medium">{registration_no}</div>;
            },
        },

        {
            accessorKey: 'no_of_students',
            header: () => <div className="text-right">No of Students</div>,
            cell: ({ row }) => {
                const no_of_students = row.getValue('no_of_students') as number;
                return <div className="text-right font-medium">{no_of_students}</div>;
            },
        },
        {
            accessorKey: 'no_of_teachers',
            header: () => <div className="text-right">No of Teachers</div>,
            cell: ({ row }) => {
                const no_of_teachers = row.getValue('no_of_teachers') as number;
                return <div className="text-right font-medium">{no_of_teachers}</div>;
            },
        },
        {
            accessorKey: 'type',
            header: () => <div className="text-right">Type</div>,
            cell: ({ row }) => {
                const type = Number(row.getValue('type'));

                return <div className="text-right font-medium">{type === 3 ? 'Collage' : type === 2 ? 'Secondary' : 'Primary'}</div>;
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
                            title="Delete Institution"
                            description="Are you sure you want to delete this institution?"
                            deleteText="Delete"
                            cancelText="Cancel"
                            route={route('institutions.destroy', row.original.id)}
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
                <h1 className="mb-4 text-center text-2xl font-bold">Institutions List</h1>
                <DataTable columns={columns} data={institutions} openDrawer={openDrawer} title="Institution" />
            </div>
            <DrawerContainer 
                drawerSettings={{ isOpen, onClose: closeDrawer, mode, itemId }}
                formSettings={{ 
                    initialData: {
                        user_name: '',
                        name: '',
                        registration_no: '',
                        no_of_students: '',
                        no_of_teachers: '',
                        type: 'primary',
                        cover_photo: '',
                        logo: '',
                        location: '',
                        status: true as const,
                        limit: '',
                        extra_infos: '',
                        user_email: '',
                    }, 
                    postRoute: 'institutions.store', 
                    updateRoute: 'institutions.update', 
                    showRoute: 'institutions.show',
                    transformResponse: (data) => ({
                        user_name: data.user?.name || '',
                        name: data.name || '',
                        registration_no: data.registration_no || '',
                        no_of_students: data.no_of_students || '',
                        no_of_teachers: data.no_of_teachers || '',
                        type: data.type || 1,
                        cover_photo: data.cover_photo || '',
                        logo: data.logo || '',
                        location: data.location || '',
                        status: data.status || true,
                        limit: data.limit || '',
                        extra_infos: data.extra_infos || '',
                        user_email: data.user?.email || '',
                    })
                }}  
                featureTitle="Institution"
            >
                {({ data, setData, errors, mode }) => (
                    <Form 
                        data={data}
                        setData={setData}
                        errors={errors}
                        mode={mode}
                        options={{}}
                    />
                )}
            </DrawerContainer>
        </AppLayout>
    );
}

export default InstitutionList;
