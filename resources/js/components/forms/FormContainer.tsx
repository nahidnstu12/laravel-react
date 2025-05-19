import { router } from '@inertiajs/react';
import React from 'react';
import { Button } from '../ui/button';
type FormContainerProps = {
    children: React.ReactNode;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    route: string;
};

export default function FormContainer({ children, handleSubmit, processing, route }: FormContainerProps) {
    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            {children}
            <Button variant="outline" type="button" onClick={() => router.visit(route)} className="mr-4">
                Cancel
            </Button>
            <Button type="submit" disabled={processing}>
                {processing ? 'Saving...' : 'Create Institution'}
            </Button>
        </form>
    );
}
