import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

export default function InstitutionCreateForm({ users = [], images = [] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    user_id: '',
    name: '',
    registration_no: '',
    no_of_students: '',
    no_of_teachers: '',
    type: '1', // Assuming you map integer to enum in backend
    cover_photo: '',
    logo: '',
    location: '',
    status: true,
    limit: '',
    extra_infos: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('institutions.store'));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="space-y-6 p-6">
        <h1 className="text-2xl font-bold text-center">Create Institution</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>User</Label>
            {/* <select
              value={data.user_id}
              onChange={(e) => setData('user_id', e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select> */}
            {/* {errors.user_id && <p className="text-red-500">{errors.user_id}</p>} */}
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
              <Switch checked={data.status} onCheckedChange={(val) => setData('status', val)} />
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
  );
}
