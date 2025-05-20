import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface ConfirmationDialogProps {
    title?: string;
    description?: string;
    deleteText?: string;
    cancelText?: string;
    children: React.ReactNode;
    route: string;
    onSuccess?: () => void;
}

export function ConfirmationDialog({
    title = 'Are you sure?',
    description = 'This action cannot be undone.',
    deleteText = 'Delete',
    cancelText = 'Cancel',
    children,
    route,
    onSuccess,
}: ConfirmationDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route, {
            onSuccess: () => {
                setIsOpen(false);
                onSuccess?.();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary" disabled={processing}>
                            {cancelText}
                        </Button>
                    </DialogClose>

                    <Button variant="destructive" onClick={handleDelete} disabled={processing}>
                        {processing ? 'Deleting...' : deleteText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
