<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use Illuminate\Http\Request;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;


class TeacherController extends Controller
{
  public function index()
  {
    $teachers = Teacher::with('institution', 'user')->get();
    $institutions = Institution::all();
    return Inertia::render('teacher/index', compact('teachers', 'institutions'));
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'user_name' => 'required|string',
      'user_email' => 'required|email|unique:users,email',
      'pds_id' => 'nullable|string',
      'designation' => 'nullable|string',
      'joining_date' => 'nullable|date',
      'address' => 'nullable|string',
      'district' => 'nullable|string',
      'status' => 'boolean',
      'institution_id' => 'required|exists:institutions,id',
    ]);

    DB::beginTransaction();

    try {
      $user = User::create([
        'name' => $validated['user_name'],
        'email' => $validated['user_email'],
        'password' => Hash::make("password"), // or a default one
      ]);

      Teacher::create([
        'user_id' => $user->id,
        'institution_id' => $validated['institution_id'],
        'pds_id' => $validated['pds_id'],
        'designation' => $validated['designation'],
        'joining_date' => $validated['joining_date'],
        'address' => $validated['address'],
        'district' => $validated['district'],
        'status' => $validated['status'],
      ]);

      DB::commit();

      return to_route('teachers.index')->with('success', 'Teacher created successfully!');
    } catch (\Throwable $th) {
      dd($th);
      DB::rollBack();
      return redirect()->back()->with('error', 'Failed to create teacher. Please try again.');
    }
  }

  public function show($id)
  {
    $teacher = Teacher::with('institution', 'user')->findOrFail($id);
    return response()->json($teacher);
  }

 public function update(Request $request, $id)
{
    $teacher = Teacher::with('user')->findOrFail($id);

    $validated = $request->validate([
        'user_name' => 'required|string',
        'user_email' => [
            'required',
            'email',
            Rule::unique('users', 'email')->ignore($teacher->user->id),
        ],
        'pds_id' => 'nullable|string',
        'designation' => 'nullable|string',
        'joining_date' => 'nullable|date',
        'address' => 'nullable|string',
        'district' => 'nullable|string',
        'status' => 'boolean',
        'institution_id' => 'required|exists:institutions,id',
    ]);

    DB::beginTransaction();

    try {
        $teacher->user->update([
            'name' => $validated['user_name'],
            'email' => $validated['user_email'],
        ]);

        $teacher->update([
            'institution_id' => $validated['institution_id'],
            'pds_id' => $validated['pds_id'],
            'designation' => $validated['designation'],
            'joining_date' => $validated['joining_date'],
            'address' => $validated['address'],
            'district' => $validated['district'],
            'status' => $validated['status'],
        ]);

        DB::commit();

        return to_route('teachers.index')->with('success', 'Teacher updated successfully!');
    } catch (\Throwable $th) {
        DB::rollBack();
        return redirect()->back()->with('error', 'Failed to update teacher. Please try again.');
    }
}


  public function destroy($id)
  {
    $teacher = Teacher::findOrFail($id);
    $teacher->user->delete();
    return redirect()->back()->with('success', 'Teacher and associated user deleted successfully!');
  }
}
