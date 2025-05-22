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
        name: '',
        description: '',
        status: false,
        institution_id: '',
        level_id: '',
    });

    useEffect(() => {
        if (isOpen && itemId && (mode === 'read' || mode === 'edit')) {
            // Fetch institution data
            axios
                .get(route('subjects.show', itemId))
                .then((response) => {
                    const subjectData = {
                        name: response.data.name || '',
                        description: response.data.description || '',
                        status: response.data.status || false,
                        institution_id: response.data.institution_id || '',
                        level_id: response.data.level_id || '',
                    };
                    setData(subjectData);
                })
                .catch((error) => {
                    console.error('Error fetching subject:', error);
                });
        }
    }, [isOpen, itemId, mode]);

    const handleSubmit = () => {
        if (mode === 'create') {
            post(route('subjects.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    // onClose();
                    reset();
                },
            });
        } else if (mode === 'edit') {
            patch(route('subjects.update', itemId), {
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
                return 'Add New Subject';
            case 'read':
                return 'Subject Details';
            case 'edit':
                return 'Edit Subject';
            default:
                return 'Subject';
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
