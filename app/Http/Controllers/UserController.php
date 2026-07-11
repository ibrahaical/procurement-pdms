<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        // Ambil data user beserta role-nya
        $users = User::with('roles')->latest()->get();
        return Inertia::render('Users/Index', ['users' => $users]);
    }
}
