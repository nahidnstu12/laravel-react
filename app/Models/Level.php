<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Level extends Model
{
  use HasFactory;
  protected $fillable = [
    'institution_id',
    'name',
    'status'
  ];

  public function institution(): BelongsTo {
    return $this->belongsTo(Institution::class);
  }

  // public function groups(): HasMany {
  //   return $this->hasMany(Group::class);
  // }

  // public function sections(): HasMany {
  //   return $this->hasMany(Section::class);
  // }

  // public function shifts(): HasMany {
  //   return $this->hasMany(Shift::class);
  // }

  public function subjects(): HasMany {
    return $this->hasMany(Subject::class);
  }

  public function teachers(): BelongsToMany {
    return $this->belongsToMany(Teacher::class);
  }

  // public function students(): HasMany {
  //   return $this->hasMany(Student::class);
  // }

  // public function scopeFilter($query, $filters)
  // {
  //   return $query->when(isset($filters['institution_id']), function ($query) use ($filters) {
  //     $query->where('institution_id', $filters['institution_id']);
  //   });
  // }
}
