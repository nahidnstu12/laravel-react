import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type FormInputProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: Record<string, string>;
    type?: string;
    disabled?: boolean;
};

export default function FormInput({ label, name, value, onChange, errors, type = 'text', disabled }: FormInputProps) {
    const error = errors[name];
    return (
        <div>
            <Label>{label}</Label>
            <Input type={type} value={value} onChange={onChange} disabled={disabled} />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
