import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

type FormTextareaProps = {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    errors: Record<string, string>;
};
export default function FormTextarea({ label, name, value, onChange, errors }: FormTextareaProps) {
    const error = errors[name];
    return (
        <div>
            <Label>{label}</Label>
            <Textarea value={value} onChange={(e) => onChange(e.target.value)} />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
