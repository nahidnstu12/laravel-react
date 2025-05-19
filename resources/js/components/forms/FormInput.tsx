import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

type FormInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
  type?: string;
};

export default function FormInput({label, name, value, onChange, errors, type="text"}: FormInputProps) {
    const error = errors[name];
  return (
    <div>
    <Label>{label}</Label>
    <Input type={type} value={value} onChange={onChange} />
    {error && <p className="text-red-500">{error}</p>}
  </div>
  )
}


