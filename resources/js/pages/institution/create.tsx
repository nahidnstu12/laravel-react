import FormContainer from '@/components/forms/FormContainer';
import FormInput from '@/components/forms/FormInput';
import { FormSelect } from '@/components/forms/FormSelect';
import FormSwitch from '@/components/forms/FormSwitch';
import FormTextarea from '@/components/forms/FormTextarea';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';

// TODO: REMOVE THIS FILE LATER

export default function InstitutionCreateForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_name: '',
        name: '',
        registration_no: '',
        no_of_students: '',
        no_of_teachers: '',
        type: 'primary',
        cover_photo: '',
        logo: '',
        location: '',
        status: true as const,
        limit: '',
        extra_infos: '',
        user_email: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('institutions.store'), {
            preserveScroll: true,
        });
    };

    console.log('institution create errors', errors);
    console.log('institution create data', data);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Institutions',
            href: '/institutions',
        },
        {
            title: 'Create Institution',
            href: '/institutions/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card className="mx-auto my-5 w-1/2 max-w-2xl">
                <CardContent className="space-y-6 p-6">
                    <h1 className="text-center text-2xl font-bold">Create Institution</h1>
                    <FormContainer handleSubmit={handleSubmit} processing={processing} route={route('institutions.index')}>
                        <FormInput
                            label="User Name"
                            name="user_name"
                            value={data.user_name}
                            onChange={(e) => setData('user_name', e.target.value)}
                            errors={errors}
                        />

                        <FormInput
                            label="User Email"
                            name="user_email"
                            value={data.user_email}
                            onChange={(e) => setData('user_email', e.target.value)}
                            errors={errors}
                        />

                        <FormInput
                            label="Institution Name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            errors={errors}
                        />

                        <FormInput
                            label="Registration Number"
                            name="registration_no"
                            value={data.registration_no}
                            onChange={(e) => setData('registration_no', e.target.value)}
                            errors={errors}
                        />

                        <FormInput
                            label="No of Students"
                            name="no_of_students"
                            value={data.no_of_students}
                            onChange={(e) => setData('no_of_students', e.target.value)}
                            errors={errors}
                            type="number"
                        />
                        <FormInput
                            label="No of Teachers"
                            name="no_of_teachers"
                            value={data.no_of_teachers}
                            onChange={(e) => setData('no_of_teachers', e.target.value)}
                            errors={errors}
                            type="number"
                        />

                        {/* <FormInput label="Type" name="type" value={data.type} onChange={(e) => setData('type', e.target.value)} errors={errors} /> */}
                        <FormSelect
                            label="Type"
                            name="type"
                            options={[
                                { id: 1, name: 'Primary' },
                                { id: 2, name: 'Secondary' },
                                { id: 3, name: 'College' },
                            ]}
                            errors={errors}
                        />

                        <FormInput
                            label="Location"
                            name="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            errors={errors}
                        />

                        <FormSwitch label="Status" name="status" value={data.status} onChange={(val) => setData('status', val as true)} errors={errors} />

                        <FormInput label="Limit" name="limit" value={data.limit} onChange={(e) => setData('limit', e.target.value)} errors={errors} />

                        <FormTextarea
                            label="Extra Infos"
                            name="extra_infos"
                            value={data.extra_infos}
                            onChange={(e) => setData('extra_infos', e)}
                            errors={errors}
                        />

                        {/* <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>No of Students</Label>
              <Input type="number" value={data.no_of_students} onChange={(e) => setData('no_of_students', e.target.value)} />
            </div>
            <div>
              <Label>No of Teachers</Label>
              <Input type="number" value={data.no_of_teachers} onChange={(e) => setData('no_of_teachers', e.target.value)} />
            </div>
          </div> */}

                        {/* <div>
            <Label>Type</Label>
            <select
              value={data.type}
              onChange={(e) => setData('type', e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="college">College</option>
            </select>
          </div> */}

                        {/* <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Cover Photo</Label>
              <select
                value={data.cover_photo}
                onChange={(e) => setData('cover_photo', e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Select Image</option>
                {images.map((img) => (
                  <option key={img.id} value={img.id}>{img.name}</option>
                ))}
              </select>
            </div>

            <div>
              <Label>Logo</Label>
              <select
                value={data.logo}
                onChange={(e) => setData('logo', e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Select Image</option>
                {images.map((img) => (
                  <option key={img.id} value={img.id}>{img.name}</option>
                ))}
              </select>
            </div>
          </div> */}

                        {/* <div>
            <Label>Location</Label>
            <Input value={data.location} onChange={(e) => setData('location', e.target.value)} />
          </div>

          <div>
            <Label>Status</Label>
            <div className="flex items-center space-x-2">
              <Switch checked={data.status} onCheckedChange={(val) => setData('status', val as true)} />
              <span>{data.status ? 'Active' : 'Inactive'}</span>
            </div>
          </div>

          <div>
            <Label>Limit</Label>
            <Input type="number" value={data.limit} onChange={(e) => setData('limit', e.target.value)} />
          </div>

          <div>
            <Label>Extra Infos (JSON)</Label>
            <Textarea value={data.extra_infos} onChange={(e) => setData('extra_infos', e.target.value)} />
            {errors.extra_infos && <p className="text-red-500">{errors.extra_infos}</p>}
          </div> */}
                    </FormContainer>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
