<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Teacher extends Model
{
  use HasFactory;
  protected $fillable = [
    "institution_id",
    'user_id',
    'pds_id',
    'designation',
    'joining_date',
    'address',
    'district',
    'status'
  ];

  public function levels(): BelongsToMany
  {
    return $this->belongsToMany(Level::class);
  }

  public function subjects(): BelongsToMany
  {
    return $this->belongsToMany(Subject::class);
  }

  // public function sections(): BelongsToMany
  // {
  //   return $this->belongsToMany(Section::class);
  // }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function institution(): BelongsTo
  {
    return $this->belongsTo(Institution::class);
  }
}
