<?php

namespace App\Imports;

use App\Models\Procurement;
use App\Models\Vendor;
use App\Models\Category;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class ProcurementsImport implements ToModel, WithHeadingRow, ShouldQueue, WithChunkReading
{
    public function model(array $row)
    {
        if (!isset($row['title'])) {
            return null;
        }

        $categoryId = null;
        $categoryName = $row['category_id'] ?? null;

        if ($categoryName && $categoryName !== '-') {
            $category = Category::where('name', $categoryName)->first();
            $categoryId = $category ? $category->id : null;
        }

        $vendorId = null;
        $vendorSnapshot = null;
        $vendorName = $row['vendor_id'] ?? null;

        if ($vendorName && $vendorName !== '-') {
            $vendor = Vendor::where('name', $vendorName)->first();

            if ($vendor) {
                $vendorId = $vendor->id;
                $vendorSnapshot = [
                    'id' => $vendor->id,
                    'name' => $vendor->name,
                    'captured_at' => now()->toDateTimeString(),
                ];
            }
        }

        if (!$vendorId) {
            return null;
        }

        return new Procurement([
            'title' => $row['title'],
            'category_id' => $categoryId,
            'vendor_id' => $vendorId,
            'deadline_date' => $row['deadline_date'] ?? now(),
            'is_approved' => strtolower($row['is_approved'] ?? '') === 'approved' ? 1 : 0,
            'vendor_snapshot' => $vendorSnapshot,
        ]);
    }

    public function chunkSize(): int
    {
        return 100;
    }
}
