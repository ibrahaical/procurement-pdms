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

    public function index(Request $request)
    {
        $query = Procurement::with(['category', 'vendor' => function ($q) {
            $q->withTrashed();
        }]);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('title', 'like', "%{$search}%")
                ->orWhereHas('category', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
        }

        if ($request->filled('status')) {
            $query->where('is_approved', $request->status === 'approved' ? 1 : 0);
        }

        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $procurements = $query->paginate(10)->withQueryString();

        return Inertia::render('Procurements/Index', [
            'procurements' => $procurements,
            'filters' => $request->only(['search', 'status', 'sort_field', 'sort_direction'])
        ]);
    }

    public function create()
    {
        $categories = Category::select('id', 'name')->get();
        $vendors = Vendor::select('id', 'name')->get();

        return Inertia::render('Procurements/Create', [
            'categories' => $categories,
            'vendors' => $vendors,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'vendor_id' => 'required|exists:vendors,id',
            'title' => 'required|string|max:255',
            'deadline_date' => 'required|date',
            'document' => 'required|file|mimes:pdf|min:100|max:500',
        ]);

        $documentPath = null;
        if ($request->hasFile('document')) {
            $documentPath = $request->file('document')->store('procurements', 'public');
        }

        $vendor = Vendor::findOrFail($request->vendor_id);
        $vendorSnapshot = [
            'id' => $vendor->id,
            'name' => $vendor->name,
            'captured_at' => now()->toDateTimeString(),
        ];

        Procurement::create([
            'category_id' => $validated['category_id'],
            'vendor_id' => $validated['vendor_id'],
            'title' => $validated['title'],
            'deadline_date' => $validated['deadline_date'],
            'document_path' => $documentPath,
            'vendor_snapshot' => $vendorSnapshot,
        ]);

        return redirect()->route('procurements.index')->with('success', 'Transaksi Pengadaan berhasil dibuat.');
    }
    public function edit(Procurement $procurement)
    {
        $categories = Category::select('id', 'name')->get();
        $vendors = Vendor::select('id', 'name')->get();

        $procurement->load(['audits.user']);

        return Inertia::render('Procurements/Edit', [
            'procurement' => $procurement,
            'categories' => $categories,
            'vendors' => $vendors,
            'audits' => $procurement->audits,
        ]);
    }

    public function update(Request $request, Procurement $procurement)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'vendor_id' => 'required|exists:vendors,id',
            'title' => 'required|string|max:255',
            'deadline_date' => 'required|date',
            'document' => 'nullable|file|mimes:pdf|min:100|max:500',
        ]);

        if ($request->hasFile('document')) {
            if ($procurement->document_path) {
                Storage::disk('public')->delete($procurement->document_path);
            }
            $procurement->document_path = $request->file('document')->store('procurements', 'public');
        }

        if ($procurement->vendor_id !== $request->vendor_id) {
            $vendor = Vendor::findOrFail($request->vendor_id);
            $procurement->vendor_snapshot = [
                'id' => $vendor->id,
                'name' => $vendor->name,
                'captured_at' => now()->toDateTimeString(),
            ];
        }

        $procurement->category_id = $validated['category_id'];
        $procurement->vendor_id = $validated['vendor_id'];
        $procurement->title = $validated['title'];
        $procurement->deadline_date = $validated['deadline_date'];
        if ($request->has('is_approved')) {
            $procurement->is_approved = filter_var($request->is_approved, FILTER_VALIDATE_BOOLEAN);
        }
        $procurement->save();

        return redirect()->route('procurements.index')->with('success', 'Transaksi Pengadaan berhasil diperbarui.');
    }

    public function destroy(Procurement $procurement)
    {
        $procurement->delete();
        return redirect()->route('procurements.index')->with('success', 'Transaksi Pengadaan berhasil dihapus.');
    }
}
