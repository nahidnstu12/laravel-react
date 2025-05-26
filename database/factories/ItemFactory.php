<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'title' => $this->faker->sentence(3), // Generates a random title
            'description' => $this->faker->paragraph, // Generates a random description
            'category_id' => Category::inRandomOrder()->first()->id, // Associates with a category
            'publication' => $this->faker->company, // Random company name
            'price' => $this->faker->randomFloat(2, 100, 9999), // Price between 100 and 9999
            'discount' => $this->faker->optional()->randomFloat(2, 1, 50), // Discount 1%-50%
            'author_name' => $this->faker->name, // Random author name
            'edition' => $this->faker->randomElement(['1st', '2nd', '3rd', '4th']), // Edition
            'print_type' => $this->faker->randomElement(['NEWSPAPER', 'WHITE']), // Print type
            'cover_photo' => $this->faker->optional()->randomNumber(), // Optional cover photo
        ];
    }
}
