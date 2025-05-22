import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import Form from './Form';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'create' | 'read' | 'edit' | 'delete';
    itemId: string | undefined;
    options: Record<string, any[]>;
}

export function DrawerContainer({ isOpen, onClose, mode, itemId, options }: DrawerProps) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
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
    });

    useEffect(() => {
        if (isOpen && itemId && (mode === 'read' || mode === 'edit')) {
            // Fetch institution data
            axios
                .get(route('teachers.show', itemId))
                .then((response) => {
                    const teacherData = {
                        user_name: response.data.user?.name || '',
                        name: response.data.name || '',
                        pds_id: response.data.pds_id || '',
                        designation: response.data.designation || '',
                        address: response.data.address || '',
                        status: response.data.status || false,
                        created_at: response.data.created_at || '',
                        updated_at: response.data.updated_at || '',
                        location: response.data.location || '',
                        joining_date: response.data.joining_date || '',
                        institution_id: response.data.institution_id || '',
                        user: {
                            id: response.data.user?.id || '',
                        },
                        user_email: response.data.user?.email || '',
                        district: response.data.district || '',
                    };
                    setData(teacherData);
                })
                .catch((error) => {
                    console.error('Error fetching teacher:', error);
                });
        }
    }, [isOpen, itemId, mode]);

    const handleSubmit = () => {
        if (mode === 'create') {
            post(route('teachers.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    // onClose();
                    reset();
                },
            });
        } else if (mode === 'edit') {
            patch(route('teachers.update', itemId), {
                preserveScroll: true,
                onSuccess: () => {
                    // onClose();
                    // reset();
                },
            });
        }
    };

    const getTitle = () => {
        switch (mode) {
            case 'create':
                return 'Add New Teacher';
            case 'read':
                return 'Teacher Details';
            case 'edit':
                return 'Edit Teacher';
            default:
                return 'Teacher';
        }
    };

    console.log('errors>>', errors, 'data>>', data);

    return (
        <Drawer open={isOpen} onOpenChange={onClose} direction="right">
            <DrawerContent className="flex h-full flex-col">
                <div className="mx-auto flex h-full w-full max-w-sm flex-col">
                    <DrawerHeader>
                        <DrawerClose
                            asChild
                            className="ml-auto"
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                        >
                            <X className="h-4 w-4 cursor-pointer" />
                        </DrawerClose>
                        <DrawerTitle>{getTitle()}</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex-1 overflow-y-auto p-4">
                        <form onSubmit={handleSubmit} className="w-full space-y-4">
                            <Form data={data} setData={setData} errors={errors} mode={mode} options={options} />
                        </form>
                    </div>
                    {mode !== 'read' && (
                        <DrawerFooter className="border-t">
                            <div className="flex gap-2">
                                <Button onClick={handleSubmit} disabled={processing} className="w-1/2">
                                    {processing ? 'Saving...' : 'Save'}
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="w-1/2" onClick={() => reset()}>
                                        Cancel
                                    </Button>
                                </DrawerClose>
                            </div>
                        </DrawerFooter>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}
