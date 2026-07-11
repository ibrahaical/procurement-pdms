<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    public function index()
    {
        // Mengambil seluruh data vendor dengan urutan terbaru
        $vendors = Vendor::latest()->get();
        return Inertia::render('Vendors/Index', [
            'vendors' => $vendors
        ]);
    }

    public function create()
    {
        return Inertia::render('Vendors/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:vendors,name',
        ]);

        Vendor::create([
            'name' => $request->name,
        ]);

        return redirect()->route('vendors.index')->with('success', 'Vendor berhasil ditambahkan.');
    }

    public function edit(Vendor $vendor)
    {
        return Inertia::render('Vendors/Edit', [
            'vendor' => $vendor
        ]);
    }

    public function update(Request $request, Vendor $vendor)
    {
        // Pengecualian nama vendor ini sendiri agar bisa di-update tanpa error 'unique'
        $request->validate([
            'name' => 'required|string|max:255|unique:vendors,name,' . $vendor->id,
        ]);

        $vendor->update([
            'name' => $request->name,
        ]);

        return redirect()->route('vendors.index')->with('success', 'Vendor berhasil diperbarui.');
    }

    public function destroy(Vendor $vendor)
    {
        $vendor->delete();
        return redirect()->route('vendors.index')->with('success', 'Vendor berhasil dihapus.');
    }
}
