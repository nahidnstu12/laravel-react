import FormInput from '@/components/forms/FormInput';
import { FormSelect } from '@/components/forms/FormSelect';
import FormSwitch from '@/components/forms/FormSwitch';

interface FormProps {
    data: Record<string, any>;
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
    mode: 'create' | 'read' | 'edit' | 'delete';
    options: Record<string, any[]>;
}

export default function Form({ data, setData, errors, mode, options }: FormProps) {
    const isReadOnly = mode === 'read';

    return (
        <div className="space-y-4">
            <FormInput
                label="Level Name"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                errors={errors}
                disabled={isReadOnly}
            />

            <FormSelect
                label="Institution"
                name="institution_id"
                value={data.institution_id}
                onChange={(value) => setData('institution_id', value)}
                errors={errors}
                options={options.institutions}
                disabled={isReadOnly}
            />

            <FormSwitch
                label="Status"
                name="status"
                value={data.status}
                onChange={(val) => setData('status', val as true)}
                errors={errors}
                disabled={isReadOnly}
            />
        </div>
    );
}
