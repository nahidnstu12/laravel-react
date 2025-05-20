import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '../ui/label';

type FormSelectProps = {
    label: string;
    name: string;
    options: { id: number; name: string }[];
    errors: Record<string, string>;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
};

export function FormSelect({ label, name, options, errors, value, onChange, disabled }: FormSelectProps) {
    const error = errors[name];
    return (
        <>
            <Label>{label}</Label>
            <Select value={value} onValueChange={onChange} disabled={disabled}>
                <SelectTrigger className="">
                    <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map((option) => (
                            <SelectItem key={option.id} value={option.id.toString()}>
                                {option.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
}
