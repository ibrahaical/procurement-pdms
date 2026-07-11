<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class RoleAndAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::create(['name' => 'Administrator']);
        Role::create(['name' => 'User']);

        $admin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@pdm.com',
            'password' => Hash::make('password123'),
        ]);
        $admin->assignRole($adminRole);
    }
}
