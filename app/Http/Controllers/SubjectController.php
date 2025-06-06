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
  public function index(Request $request)
  {
    $query = Subject::with('institution', 'level');

    if ($request->has('name')) {
      $name = $request->name;
      $query->where('name', 'ilike', "%{$name}%");
    }

    if ($request->has('status')) {
      $query->where('status', $request->status);
    }

    if ($request->has('institution_id')) {
      $query->where('institution_id', $request->institution_id);
    }

    if ($request->has('level_id')) {
      $query->where('level_id', $request->level_id);
    }

    $sortField = $request->sort_field ?? 'created_at';
    $sortDirection = $request->sort_direction ?? 'desc';

    if ($sortField === 'institution.name') {
      $query->join('institutions', 'subjects.institution_id', '=', 'institutions.id')
        ->orderBy('institutions.name', $sortDirection)
        ->select('subjects.*');
    } elseif ($sortField === 'level.name') {
      $query->join('levels', 'subjects.level_id', '=', 'levels.id')
        ->orderBy('levels.name', $sortDirection)
        ->select('subjects.*');
    } else {
      $query->orderBy($sortField, $sortDirection);
    }

    $perPage = $request->per_page ?? 10;
    $subjects = $query->paginate($perPage);

    $institutions = Institution::all();
    $levels = Level::all();
    return Inertia::render('subject/index', [
      'subjects' => $subjects,
      'institutions' => $institutions,
      'filters' => $request->only(['name', 'status', 'institution_id', 'level_id', 'sort_field', 'sort_direction', 'per_page']),
      'levels' => $levels,
    ]);
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
