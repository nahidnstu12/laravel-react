import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';

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

  console.log("institution create errors", errors);
  console.log("institution create data", data);

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
    <Card className="max-w-2xl mx-auto">
      <CardContent className="space-y-6 p-6">
        <h1 className="text-2xl font-bold text-center">Create Institution</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>User Name</Label>
            <Input value={data.user_name} onChange={(e) => setData('user_name', e.target.value)} />
            {errors.user_name && <p className="text-red-500">{errors.user_name}</p>}
          </div>
          <div>
            <Label>User Email</Label>
            <Input value={data.user_email} onChange={(e) => setData('user_email', e.target.value)} />
            {errors.user_email && <p className="text-red-500">{errors.user_email}</p>}
          </div>

          <div>
            <Label>Name</Label>
            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div>
            <Label>Registration No</Label>
            <Input value={data.registration_no} onChange={(e) => setData('registration_no', e.target.value)} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>No of Students</Label>
              <Input type="number" value={data.no_of_students} onChange={(e) => setData('no_of_students', e.target.value)} />
            </div>
            <div>
              <Label>No of Teachers</Label>
              <Input type="number" value={data.no_of_teachers} onChange={(e) => setData('no_of_teachers', e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Type</Label>
            <select
              value={data.type}
              onChange={(e) => setData('type', e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="college">College</option>
              {/* match your backend enum mapping */}
            </select>
          </div>

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

          <div>
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
          </div>

          <Button type="submit" disabled={processing}>
            {processing ? 'Saving...' : 'Create Institution'}
          </Button>
        </form>
      </CardContent>
    </Card>
    </AppLayout>
  );
}
