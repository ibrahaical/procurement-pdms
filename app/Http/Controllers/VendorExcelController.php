<?php

namespace App\Http\Controllers;

use App\Exports\VendorExport;
use App\Imports\VendorImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class VendorExcelController extends Controller
{
    public function export(Request $request)
    {
        $request->validate([
            'columns' => 'required|array|min:1'
        ]);

        $fileName = 'exports/vendor_data_' . time() . '.xlsx';

        Excel::store(new VendorExport($request->columns), $fileName, 'public');

        return back()->with('success', 'Export Vendor diproses di background. Cek folder Storage nanti.');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls'
        ]);

        Excel::import(new VendorImport, $request->file('file'));

        return back()->with('success', 'Import Vendor sedang diproses. Refresh halaman beberapa saat lagi.');
    }
}
