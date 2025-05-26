<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ItemTagFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'item_id' => Item::inRandomOrder()->first()->id, // Random existing item
            'tag_id' => Tag::inRandomOrder()->first()->id,   // Random existing tag
        ];
    }
}
