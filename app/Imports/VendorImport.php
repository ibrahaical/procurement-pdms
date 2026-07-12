<?php

namespace App\Imports;

use App\Models\Vendor;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class VendorImport implements ToModel, WithHeadingRow, ShouldQueue, WithChunkReading
{
    public function model(array $row)
    {
        if (!isset($row['name'])) {
            return null;
        }

        return new Vendor([
            'name' => $row['name'],
        ]);
    }

    public function chunkSize(): int
    {
        return 100;
    }
}
