<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstitutionController extends Controller
{
    public function index()
    {
        return Inertia::render('institution/index');
    }
    public function create()
    {
        return Inertia::render('institution/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'registration_no' => 'nullable|string',
            'no_of_students' => 'nullable|integer',
            'no_of_teachers' => 'nullable|integer',
            'type' => 'required|integer',
            'cover_photo' => 'nullable|exists:images,id',
            'logo' => 'nullable|exists:images,id',
            'location' => 'nullable|string',
            'status' => 'boolean',
            'limit' => 'nullable|integer',
            'extra_infos' => 'nullable|json',
    ]);

    Institution::create($validated + ['uuid' => Str::uuid()]);

    return redirect()->route('institutions.index')->with('success', 'Institution created successfully!');
}
}
