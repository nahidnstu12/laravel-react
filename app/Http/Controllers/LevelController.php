<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use App\Models\Level;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LevelController extends Controller
{
    public function index(Request $request)
    {
        $query = Level::with('institution');

        if ($request->has('name')) {
            $name = $request->name;
            $query->where('name', 'like', "%{$name}%");
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('institution_id')) {
            $query->where('institution_id', $request->institution_id);
        }

        $sortField = $request->sort_field ?? 'created_at';
        $sortDirection = $request->sort_direction ?? 'desc';
        $query->orderBy($sortField, $sortDirection);

        $perPage = $request->per_page ?? 10;
        $levels = $query->paginate($perPage);

        $institutions = Institution::all();
        return Inertia::render('level/index', [
            'levels' => $levels,
            'institutions' => $institutions,
            'filters' => $request->only(['name', 'status', 'institution_id', 'sort_field', 'sort_direction', 'per_page']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'status' => 'boolean',
            'institution_id' => 'required|exists:institutions,id',
        ]);

        Level::create($validated);
        return redirect()->back()->with('success', 'Level created successfully!');
    }

    public function update(Request $request, $id)
    {
        $level = Level::findOrFail($id);
        $level->update($request->all());
        return redirect()->back()->with('success', 'Level updated successfully!');
    }

    public function destroy($id)
    {
        $level = Level::findOrFail($id);
        $level->delete();
        return redirect()->back()->with('success', 'Level deleted successfully!');
    }

    public function show($id)
    {
        $level = Level::with('institution')->findOrFail($id);
        return response()->json($level);
    }
    
}
