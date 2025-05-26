<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Section;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'student_id' => Student::inRandomOrder()->first()->id ?? Student::factory(),
            'item_id' => Item::inRandomOrder()->first()->id ?? Item::factory(),
            'section_id' => Section::inRandomOrder()->first()->id ?? Section::factory(),
            'order_status' => $this->faker->randomElement(['PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED', 'REJECTED', 'RETURNED']),
            'payment_status' => $this->faker->randomElement(['PENDING', 'SUCCESS', 'FAILED', 'REJECT']),
            'payment_type' => $this->faker->randomElement(['COD', 'BKASH', 'NAGAD', 'MOBILE']),
            'unit_price' => $this->faker->randomFloat(2, 50, 500),
            'discount' => $this->faker->randomFloat(2, 0, 50),
            'quantity' => $this->faker->numberBetween(1, 10),
            'transaction_id' => $this->faker->uuid,
            'shipment_address' => $this->faker->address,
            'phone' => $this->faker->phoneNumber,
        ];
    }
}
