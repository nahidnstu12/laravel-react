<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Str;

class InstitutionController extends Controller
{
    public function index()
    {
        $institutions = Institution::with('user')->get();
        return Inertia::render('institution/index', compact('institutions'));
    }
    public function create()
    {
        return Inertia::render('institution/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'user_name' => 'required|string',
            'user_email' => 'required|email|unique:users,email',
            'registration_no' => 'nullable|string',
            'no_of_students' => 'nullable|integer',
            'no_of_teachers' => 'nullable|integer',
            'type' => 'required|string',
            'cover_photo' => 'nullable|exists:images,id',
            'logo' => 'nullable|exists:images,id',
            'location' => 'nullable|string',
            'status' => 'boolean',
            'limit' => 'nullable|integer',
            'extra_infos' => 'nullable|json',
        ]);

        // Institution::create($validated + ['uuid' => Str::uuid()]);

        DB::beginTransaction();

        try {
            // Create user
            $user = User::create([
                'name' => $validated['user_name'],
                'email' => $validated['user_email'],
                'password' => Hash::make("password"), // or a default one
            ]);

            // Create institution
            Institution::create([
                'user_id' => $user->id,
                'uuid' => Str::uuid(),
                'name' => $validated['name'],
                'registration_no' => $validated['registration_no'] ?? null,
                'no_of_students' => $validated['no_of_students'] ?? null,
                'no_of_teachers' => $validated['no_of_teachers'] ?? null,
                'type' => $validated['type'],
                'cover_photo' => $validated['cover_photo'] ?? null,
                'logo' => $validated['logo'] ?? null,
                'location' => $validated['location'] ?? null,
                'status' => $validated['status'] ?? true,
                'limit' => $validated['limit'] ?? null,
                'extra_infos' => $validated['extra_infos'] ?? null,
            ]);

            DB::commit();
            return to_route('institutions.index')->with('success', 'Institution created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to create institution. Please try again.');
        }
    }

    public function show($id)
    {
        $institution = Institution::with('user')->findOrFail($id);
        return response()->json($institution);
    }

    public function update(Request $request, $id)
    {
        $institution = Institution::findOrFail($id);
        $institution->update($request->all());
        return redirect()->back()->with('success', 'Institution updated successfully!');
    }

    public function destroy($id)
    {
        $institution = Institution::findOrFail($id);
        $institution->user->delete();
        return redirect()->back()->with('success', 'Institution and associated user deleted successfully!');
    }

    /**
     * Get all levels for a specific institution
     */
    public function levels($id)
    {
        $institution = Institution::findOrFail($id);
        $levels = $institution->levels()
            ->select('id', 'name', 'status')
            ->where('status', true)
            ->orderBy('name')
            ->get();

        return response()->json($levels);
    }
}
