import FormDatePicker from '@/components/forms/FormDatePicker';
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

// Define fields that should be disabled in edit mode
// const EDIT_MODE_DISABLED_FIELDS = ['user_email', 'user_name'];

export default function Form({ data, setData, errors, mode, options }: FormProps) {
    const isReadOnly = mode === 'read';
    const isEditMode = mode === 'edit';

    // Combine mode-specific disabled fields with custom disabled fields
    // const getDisabledFields = (fieldName: string) => {
    //     if (isReadOnly) return true;
    //     if (isEditMode && EDIT_MODE_DISABLED_FIELDS.includes(fieldName)) return true;
    // };

    return (
        <div className="space-y-4">
            <FormInput
                label="User Name"
                name="user_name"
                value={data.user_name}
                onChange={(e) => setData('user_name', e.target.value)}
                errors={errors}
                disabled={isReadOnly}
            />

            <FormInput
                label="User Email"
                name="user_email"
                value={data.user_email}
                onChange={(e) => setData('user_email', e.target.value)}
                errors={errors}
                disabled={isReadOnly || isEditMode}
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
            {/* <FormInput
                label="Phone"
                name="phone"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                errors={errors}
                type="number"
                disabled={isReadOnly}
            /> */}

            {/* Teacher Details */}

            {/* <FormInput
                label="Teacher Name"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                errors={errors}
                disabled={isReadOnly}
            /> */}

            <FormInput
                label="PDS ID"
                name="pds_id"
                value={data.pds_id}
                onChange={(e) => setData('pds_id', e.target.value)}
                errors={errors}
                disabled={isReadOnly}
            />

            <FormInput
                label="Designation"
                name="designation"
                value={data.designation}
                onChange={(e) => setData('designation', e.target.value)}
                errors={errors}
                disabled={isReadOnly}
            />

            <FormDatePicker
                label="Joining Date"
                value={data.joining_date}
                onChange={(date) => setData('joining_date', date)}
                errors={errors}
                name="joining_date"
                disabled={isReadOnly}
            />

            <FormInput
                label="Address"
                name="address"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                errors={errors}
                disabled={isReadOnly}
            />

            <FormInput
                label="Location"
                name="location"
                value={data.location}
                onChange={(e) => setData('location', e.target.value)}
                errors={errors}
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
