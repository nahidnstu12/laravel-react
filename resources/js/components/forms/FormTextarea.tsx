import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

type FormTextareaProps = {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    errors: Record<string, string>;
    disabled?: boolean;
};

export default function FormTextarea({ label, name, value, onChange, errors, disabled }: FormTextareaProps) {
    const error = errors[name];
    return (
        <div>
            <Label>{label}</Label>
            <Textarea value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
