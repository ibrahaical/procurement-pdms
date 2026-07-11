<?php

namespace App\Http\Controllers;

use Spatie\Permission\Models\Role;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::latest()->get();
        return Inertia::render('Roles/Index', ['roles' => $roles]);
    }
}
