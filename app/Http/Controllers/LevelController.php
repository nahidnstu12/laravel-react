<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use App\Models\Level;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LevelController extends Controller
{
    public function index()
    {
        $levels = Level::with('institution')->get();
        $institutions = Institution::all();
        return Inertia::render('level/index', compact('levels', 'institutions'));
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
