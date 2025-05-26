<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\ItemTag;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemTagSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run() {
        // Ensure there are items and tags available
        if (Item::count() === 0 || Tag::count() === 0) {
            $this->command->warn('No items or tags found. Please seed items and tags first.');
            return;
        }

        // Generate random associations
        Item::all()->each(function ($item) {
            // Associate each item with random tags
            $tags = Tag::inRandomOrder()->take(rand(1, 3))->pluck('id');
            foreach ($tags as $tagId) {
                ItemTag::factory()->create([
                    'item_id' => $item->id,
                    'tag_id' => $tagId,
                ]);
            }
        });
    }
}
