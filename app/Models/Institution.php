<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Institution extends Model
{
  use HasFactory;

  protected $fillable = [
    'uuid',
    'user_id',
    'name',
    'registration_no',
    'no_of_students',
    'no_of_teachers',
    'type',
    'cover_photo',
    'logo',
    'location',
    'status',
    'limit',
    'extra_infos',
  ];

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  public function levels(): HasMany
  {
    return $this->hasMany(Level::class);
  }

  public function subjects(): HasMany
  {
    return $this->hasMany(Subject::class);
  }
}
