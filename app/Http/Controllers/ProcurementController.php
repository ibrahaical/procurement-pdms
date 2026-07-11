<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Procurement;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProcurementController extends Controller
{
    public function create()
    {
        // Mengambil data untuk Select2 React
        $categories = Category::select('id', 'name')->get();
        $vendors = Vendor::select('id', 'name')->get();

        return Inertia::render('Procurements/Create', [
            'categories' => $categories,
            'vendors' => $vendors,
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validasi Backend (Laravel Validation) [cite: 26]
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'vendor_id' => 'required|exists:vendors,id',
            'title' => 'required|string|max:255',
            'deadline_date' => 'required|date',
            // Validasi wajib dokumen: Hanya PDF, ukuran 100 KB - 500 KB [cite: 115]
            'document' => 'required|file|mimes:pdf|min:100|max:500',
        ]);

        // 2. Upload File Dokumen
        $documentPath = null;
        if ($request->hasFile('document')) {
            $documentPath = $request->file('document')->store('procurements', 'public');
        }

        // 3. Mengambil Data Vendor Master untuk JSON Snapshot [cite: 28, 116]
        $vendor = Vendor::findOrFail($request->vendor_id);
        $vendorSnapshot = [
            'id' => $vendor->id,
            'name' => $vendor->name,
            'captured_at' => now()->toDateTimeString(),
        ];

        // 4. Menyimpan ke Database
        Procurement::create([
            'category_id' => $validated['category_id'],
            'vendor_id' => $validated['vendor_id'],
            'title' => $validated['title'],
            'deadline_date' => $validated['deadline_date'],
            'document_path' => $documentPath,
            'vendor_snapshot' => $vendorSnapshot, // Menyimpan JSON snapshot [cite: 16]
        ]);

        return redirect()->route('dashboard')->with('success', 'Transaksi Pengadaan berhasil dibuat.');
    }
}
