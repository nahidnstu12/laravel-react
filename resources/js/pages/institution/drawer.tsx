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
}

export function DrawerContainer({ isOpen, onClose, mode, itemId }: DrawerProps) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
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
    });

    useEffect(() => {
        if (isOpen && itemId && (mode === 'read' || mode === 'edit')) {
            // Fetch institution data
            axios
                .get(route('institutions.show', itemId))
                .then((response) => {
                    const institutionData = {
                        user_name: response.data.user?.name || '',
                        name: response.data.name || '',
                        registration_no: response.data.registration_no || '',
                        no_of_students: response.data.no_of_students || '',
                        no_of_teachers: response.data.no_of_teachers || '',
                        type: response.data.type || 1,
                        cover_photo: response.data.cover_photo || '',
                        logo: response.data.logo || '',
                        location: response.data.location || '',
                        status: response.data.status || true,
                        limit: response.data.limit || '',
                        extra_infos: response.data.extra_infos || '',
                        user_email: response.data.user?.email || '',
                    };
                    setData(institutionData);
                })
                .catch((error) => {
                    console.error('Error fetching institution:', error);
                });
        }
    }, [isOpen, itemId, mode]);

    const handleSubmit = () => {
        if (mode === 'create') {
            post(route('institutions.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    // onClose();
                    reset();
                },
            });
           
        } else if (mode === 'edit') {
            patch(route('institutions.update', itemId), {
                preserveScroll: true,
                onSuccess: () => {
                    // onClose();
                    reset();
                },
            });
           
        }
    };

    const getTitle = () => {
        switch (mode) {
            case 'create':
                return 'Add New Institution';
            case 'read':
                return 'Institution Details';
            case 'edit':
                return 'Edit Institution';
            default:
                return 'Institution';
        }
    };

  console.log("errors>>", errors);
  

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
                            <Form data={data} setData={setData} errors={errors} mode={mode} />
                        </form>
                    </div>
                    {mode !== 'read' && (
                        <DrawerFooter className="border-t">
                            <div className="flex gap-2">
                                <Button onClick={handleSubmit} disabled={processing} className="w-1/2">
                                    {processing ? 'Saving...' : 'Save Changes'}
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
