<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
