<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Subject extends Model
{
  use HasFactory;
  protected $fillable = [
    'institution_id',
    'level_id',
    'name',
    'description',
    'status'

  ];

  public function teachers(): BelongsToMany
  {
    return $this->belongsToMany(Teacher::class);
  }

  public function level(): BelongsTo
  {
    return $this->belongsTo(Level::class);
  }

  public function institution(): BelongsTo
  {
    return $this->belongsTo(Institution::class);
  }

  // public function teacherAssigns()
  // {
  //   return $this->hasMany(TeacherAssign::class);
  // }

  // public function scopeFilter($query, $filters)
  // {
  //   return $query->when(array_key_exists('institution_id', $filters), function ($query) use ($filters) {
  //     $query->where('institution_id', $filters['institution_id']);
  //   })->when(array_key_exists('level_id', $filters), function ($query) use ($filters) {
  //     $query->where('level_id', $filters['level_id']);
  //   })->when(array_key_exists('name', $filters), function ($query) use ($filters) {
  //     $query->where('name', 'like', '%' . $filters['name'] . '%');
  //   });
  // }
}
