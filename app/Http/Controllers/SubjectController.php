<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subject;
use App\Models\Institution;
use App\Models\Level;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::with('institution', 'level')->get();
        $institutions = Institution::all();
        $levels = Level::all();
        return Inertia::render('subject/index', compact('subjects', 'institutions', 'levels'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'status' => 'boolean',
            'institution_id' => 'required|exists:institutions,id',
            'level_id' => 'required|exists:levels,id',
        ]);

        Subject::create($validated);
        return redirect()->back()->with('success', 'Subject created successfully!');
    }

    public function update(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);
        $subject->update($request->all());
        return redirect()->back()->with('success', 'Subject updated successfully!');
    }

    public function destroy($id)
    {
        $subject = Subject::findOrFail($id);
        $subject->delete();
        return redirect()->back()->with('success', 'Subject deleted successfully!');
    }

    public function show($id)
    {
        $subject = Subject::with('institution', 'level')->findOrFail($id);
        return response()->json($subject);
    }
}
