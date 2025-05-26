<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
  /**
   * The current password being used by the factory.
   */
  protected static ?string $password;

  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'email' => fake()->unique()->safeEmail(),
      // 'avatar' => null,
      // 'avatar' => $this->faker->randomElement([1, 2, 3]),
      // 'first_name' => $this->faker->firstName,
      // 'last_name' => $this->faker->lastName,
      // 'phone' => $this->faker->phoneNumber,
      // 'status' => true,
      'password' => static::$password ??= Hash::make('password123'),
      'email_verified_at' => now(),
      'remember_token' => Str::random(10),
    ];
  }

  /**
   * Indicate that the model's email address should be unverified.
   */
  public function unverified(): static
  {
    return $this->state(fn (array $attributes) => [
      'email_verified_at' => null,
    ]);
  }
}
