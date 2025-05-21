'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type FormDatePickerProps = {
    label: string;
    value?: Date;
    onChange: (date: Date | undefined) => void;
    errors?: Record<string, string>;
    disabled?: boolean;
    description?: string;
    name: string;
};

export default function FormDatePicker({ label, value, onChange, errors, disabled, description, name }: FormDatePickerProps) {
    const error = errors?.[name];

    const [open, setOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleSelect = (date: Date | undefined) => {
        onChange(date);

        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col" ref={containerRef}>
            <Label>{label}</Label>

            <div className="relative">
                <Button
                    variant="outline"
                    className={cn('w-[240px] justify-between', !value && 'text-muted-foreground')}
                    disabled={disabled}
                    onClick={() => setOpen(!open)}
                    type="button"
                >
                    {value ? format(value, 'PPP') : <span>Pick a date</span>}

                    <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>

                {open && (
                    <div className="bg-popover absolute z-50 mt-1 w-auto rounded-md border p-4 shadow-md">
                        <Calendar mode="single" selected={value} onSelect={handleSelect} disabled={false} initialFocus />
                    </div>
                )}
            </div>

            {description && <p className="text-muted-foreground text-sm">{description}</p>}

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
