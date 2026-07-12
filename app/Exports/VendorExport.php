<?php

namespace App\Exports;

use App\Models\Vendor;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Illuminate\Contracts\Queue\ShouldQueue;

class VendorExport implements FromQuery, WithHeadings, WithMapping, ShouldQueue
{
    use Exportable;

    protected $selectedColumns;

    public function __construct(array $selectedColumns)
    {
        $this->selectedColumns = $selectedColumns;
    }

    public function query()
    {
        return Vendor::query();
    }

    public function headings(): array
    {
        $headings = [];
        foreach ($this->selectedColumns as $col) {
            $headings[] = strtoupper(str_replace('_', ' ', $col));
        }
        return $headings;
    }

    public function map($vendor): array
    {
        $row = [];
        foreach ($this->selectedColumns as $col) {
            $row[] = $vendor->$col;
        }
        return $row;
    }
}
