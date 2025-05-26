<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        $name = $this->faker->unique()->word; // Generates a random word
        return [
            'name' => ucfirst($name), // Capitalize the first letter of the name
            'slug' => Str::slug($name), // Generates a URL-friendly slug
        ];
    }
}
