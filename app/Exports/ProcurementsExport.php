<?php

namespace App\Exports;

use App\Models\Procurement;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Illuminate\Contracts\Queue\ShouldQueue;

class ProcurementsExport implements FromQuery, WithHeadings, WithMapping, ShouldQueue
{
    use Exportable;

    protected $selectedColumns;

    public function __construct(array $selectedColumns)
    {
        $this->selectedColumns = $selectedColumns;
    }

    public function query()
    {
        return Procurement::query()->with(['category', 'vendor']);
    }

    public function headings(): array
    {
        $headings = [];
        foreach ($this->selectedColumns as $col) {
            $headings[] = strtoupper(str_replace('_', ' ', $col));
        }
        return $headings;
    }

    public function map($procurement): array
    {
        $row = [];
        foreach ($this->selectedColumns as $col) {
            if ($col === 'category_id') {
                $row[] = $procurement->category ? $procurement->category->name : '-';
            } elseif ($col === 'vendor_id') {
                // Konsep Historical Data terpakai di sini saat export
                $row[] = $procurement->vendor_snapshot ? $procurement->vendor_snapshot['name'] : '-';
            } elseif ($col === 'is_approved') {
                $row[] = $procurement->is_approved ? 'Approved' : 'Pending';
            } else {
                $row[] = $procurement->$col;
            }
        }
        return $row;
    }
}
