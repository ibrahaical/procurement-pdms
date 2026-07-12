<?php

namespace App\Http\Controllers;

use App\Exports\CategoryExport;
use App\Imports\CategoryImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class CategoryExcelController extends Controller
{
    public function export(Request $request)
    {
        $request->validate([
            'columns' => 'required|array|min:1'
        ]);

        $fileName = 'exports/category_data_' . time() . '.xlsx';

        Excel::store(new CategoryExport($request->columns), $fileName, 'public');

        return back()->with('success', 'Export Category diproses di background. Cek folder Storage nanti.');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls'
        ]);

        Excel::import(new CategoryImport, $request->file('file'));

        return back()->with('success', 'Import Category sedang diproses. Refresh halaman beberapa saat lagi.');
    }
}
