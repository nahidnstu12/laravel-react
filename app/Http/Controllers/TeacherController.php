<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;


class TeacherController extends Controller
{
  public function index()
  {
    $teachers = Teacher::all();
    return Inertia::render('teacher/index', compact('teachers'));
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|string',
      'user_name' => 'required|string',
      'user_email' => 'required|email|unique:users,email',
      'pds_id' => 'nullable|string',
      'designation' => 'nullable|string',
      'joining_date' => 'nullable|date',
      'address' => 'nullable|string',
      'district' => 'nullable|string',
      'status' => 'boolean',
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
      DB::rollBack();
      return redirect()->back()->with('error', 'Failed to create teacher. Please try again.');
    }
  }

  public function show($id)
  {
    $teacher = Teacher::findOrFail($id);
    return response()->json($teacher);
  }

  public function update(Request $request, $id)
  {
    $teacher = Teacher::findOrFail($id);
    $teacher->update($request->all());
    return response()->json($teacher);
  }

  public function destroy($id)
  {
    $teacher = Teacher::findOrFail($id);
    $teacher->delete();
    return response()->json($teacher);
  }
}
