<?php

namespace App\Http\Controllers;

use App\Exports\ProcurementsExport;
use App\Imports\ProcurementsImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ProcurementExcelController extends Controller
{
    public function export(Request $request)
    {
        $request->validate([
            'columns' => 'required|array|min:1'
        ]);

        $fileName = 'exports/pengadaan_terbaru_' . time() . '.xlsx';

        Excel::store(new ProcurementsExport($request->columns), $fileName, 'public');

        return back()->with('success', 'Permintaan Export sedang diproses di background. File akan tersimpan di folder Storage.');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls'
        ]);

        Excel::import(new ProcurementsImport, $request->file('file'));

        return back()->with('success', 'File Excel sedang di-import di background. Refresh halaman tabel beberapa saat lagi.');
    }
}
