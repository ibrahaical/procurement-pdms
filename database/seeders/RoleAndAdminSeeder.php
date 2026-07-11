<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class RoleAndAdminSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::firstOrCreate([
            'name' => 'Administrator',
        ]);

        Role::firstOrCreate([
            'name' => 'User',
        ]);

        $admin = User::firstOrCreate(
            [
                'email' => 'admin@pdm.com',
            ],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password123'),
            ]
        );

        $admin->assignRole($adminRole);
    }
}
