<?php

namespace App\Imports;

use App\Models\Category;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class CategoryImport implements ToModel, WithHeadingRow, ShouldQueue, WithChunkReading
{
    public function model(array $row)
    {
        if (!isset($row['name'])) {
            return null;
        }

        return new Category([
            'name' => $row['name'],
        ]);
    }

    public function chunkSize(): int
    {
        return 100;
    }
}
