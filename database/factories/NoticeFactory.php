<?php

namespace Database\Factories;

use App\Models\Notice;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class NoticeFactory extends Factory
{
  protected $model = Notice::class;

  public function definition()
  {
    return [
      'institution_id' => \App\Models\Institution::factory(),
      'group_id' => \App\Models\Group::factory(),
      'level_id' => \App\Models\Level::factory(),
      'subject_id' => \App\Models\Subject::factory(),
      'section_id' => \App\Models\Section::factory(),
      'shift_id' => \App\Models\Shift::factory(),
      'created_by' => User::factory(), // Assuming User model for created_by
      'status' => true,
      'is_pinned' => $this->faker->boolean,
      'title' => $this->faker->sentence,
      'body' => $this->faker->text,
      'attachment' => null, // or any default value for attachment
      'published_at' => $this->faker->dateTime,
    ];
  }
}
