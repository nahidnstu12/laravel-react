import FormInput from '@/components/forms/FormInput';
import { FormSelect } from '@/components/forms/FormSelect';
import FormSwitch from '@/components/forms/FormSwitch';
import FormTextarea from '@/components/forms/FormTextarea';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormProps } from '@/types/shared-types';

export default function Form({ data, setData, errors, mode, options }: FormProps) {
    const isReadOnly = mode === 'read';
    const [levels, setLevels] = useState<any[]>([]);

    // Fetch levels when institution changes
    const fetchLevels = async (institutionId: string | number) => {
        try {
            const response = await axios.get(route('api.institutions.levels', institutionId));
            setLevels(response.data);
        } catch (error) {
            console.error('Error fetching levels:', error);
            setLevels([]);
        }
    };

    // Handle institution change
    const handleInstitutionChange = (value: string) => {
        setData('institution_id', value);
        setData('level_id', ''); // Clear level selection
        if (value) {
            fetchLevels(value);
        } else {
            setLevels([]);
        }
    };

    // Initial fetch of levels if institution is selected
    useEffect(() => {
        if (data.institution_id) {
            fetchLevels(data.institution_id); // Clear level selection``
            setData('level_id', data.level_id.toString());
        }
    }, [data.institution_id]);

    console.log('level data', data, levels);

    return (
        <div className="space-y-4">
            <FormInput
                label="Subject Name"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                errors={errors}
                disabled={isReadOnly}
            />

            <FormTextarea
                label="Description"
                name="description"
                value={data.description}
                onChange={(e) => setData('description', e)}
                errors={errors}
                disabled={isReadOnly}
            />
            <FormSelect
                label="Institution"
                name="institution_id"
                value={data.institution_id}
                onChange={handleInstitutionChange}
                errors={errors}
                options={options.institutions}
                disabled={isReadOnly}
            />
            <FormSelect
                label="Level"
                name="level_id"
                value={data.level_id}
                onChange={(value) => setData('level_id', value)}
                errors={errors}
                options={levels}
                disabled={isReadOnly || !data.institution_id}
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
