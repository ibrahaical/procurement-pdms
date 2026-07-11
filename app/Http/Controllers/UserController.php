<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->latest()->get();
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        // Mengirim daftar role agar bisa dipilih saat membuat user baru
        $roles = Role::select('id', 'name')->get();

        return Inertia::render('Users/Create', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|exists:roles,name',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Assign role menggunakan Spatie
        $user->assignRole($request->role);

        return redirect()->route('users.index')->with('success', 'Pengguna berhasil ditambahkan.');
    }

    public function edit(User $user)
    {
        $roles = Role::select('id', 'name')->get();

        // Memuat role saat ini agar bisa ditampilkan sebagai nilai default di form
        $user->load('roles');

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            // Validasi email agar mengabaikan email milik user ini sendiri
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|exists:roles,name',
            // Password bersifat opsional saat edit
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // Update password hanya jika kolom password diisi
        if ($request->filled('password')) {
            $user->update([
                'password' => Hash::make($request->password)
            ]);
        }

        // Sinkronisasi role yang baru
        $user->syncRoles([$request->role]);

        return redirect()->route('users.index')->with('success', 'Data pengguna berhasil diperbarui.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'Pengguna berhasil dihapus.');
    }
}
