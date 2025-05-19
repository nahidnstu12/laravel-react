import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    handleSave: () => void;
    isLoading: boolean;
    mode: 'create' | 'read' | 'edit' | 'delete';
    itemId: string | undefined;
}

export function DrawerContainer({ isOpen, onClose, handleSave, isLoading, mode, itemId }: DrawerProps) {
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
    return (
        <Drawer open={isOpen} onOpenChange={onClose} direction="right">
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>{getTitle()}</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4">{/* Create form */}</div>
                    <DrawerFooter>
                        <Button onClick={handleSave} disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
