<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Parents;
use App\Models\Teacher;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::factory()->create([
            'first_name' => 'student',
            'last_name' => 'student',
            'email' => 'student@student.com',
            'password' => Hash::make('Abde@1234'),
        ]);

        Admin::factory()->create([
            'first_name' => 'admin',
            'last_name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('Abde@1234'),
        ]);

        Teacher::factory()->create([
            'first_name' => 'teacher',
            'last_name' => 'teacher',
            'email' => 'teacher@teacher.com',
            'password' => Hash::make('Abde@1234'),
        ]);

        Parents::factory()->create([
            'first_name' => 'parent',
            'last_name' => 'parent',
            'email' => 'parent@parent.com',
            'password' => Hash::make('Abde@1234'),
        ]);
    }
}