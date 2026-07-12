import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Index({ auth, categories }) {
    const [showExportModal, setShowExportModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    // Setup form untuk Export
    const {
        data: exportData,
        setData: setExportData,
        post: postExport,
        processing: processingExport,
    } = useForm({
        columns: ["id", "name", "created_at"], // Default tercekilis
    });

    // Setup form untuk Import
    const {
        data: importData,
        setData: setImportData,
        post: postImport,
        processing: processingImport,
        errors: importErrors,
    } = useForm({
        file: null,
    });

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setExportData("columns", [...exportData.columns, value]);
        } else {
            setExportData(
                "columns",
                exportData.columns.filter((col) => col !== value),
            );
        }
    };

    const submitExport = (e) => {
        e.preventDefault();
        postExport(route("categories.export"), {
            onSuccess: () => setShowExportModal(false),
        });
    };

    const submitImport = (e) => {
        e.preventDefault();
        postImport(route("categories.import"), {
            onSuccess: () => {
                setShowImportModal(false);
                setImportData("file", null);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h2 className="font-semibold text-xl md:text-2xl text-gray-800 leading-tight">
                        Manajemen Kategori
                    </h2>
                    <div className="flex gap-2">
                        {/* Tombol Buka Modal Import */}
                        <button
                            onClick={() => setShowImportModal(true)}
                            className="inline-flex justify-center items-center px-4 py-2 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-colors duration-200 text-sm md:text-base"
                        >
                            Import Excel
                        </button>
                        {/* Tombol Buka Modal Export */}
                        <button
                            onClick={() => setShowExportModal(true)}
                            className="inline-flex justify-center items-center px-4 py-2 bg-amber-600 text-white font-semibold rounded-md hover:bg-amber-700 transition-colors duration-200 text-sm md:text-base"
                        >
                            Export Excel
                        </button>
                        <Link
                            href={route("categories.create")}
                            className="inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
                        >
                            + Tambah Kategori
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Manajemen Kategori" />

            <div className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-0 overflow-x-auto">
                            {/* ... (TABEL KATEGORI SAMA SEPERTI SEBELUMNYA) ... */}
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="py-4 px-6 font-semibold text-sm md:text-base text-gray-700 w-16">
                                            ID
                                        </th>
                                        <th className="py-4 px-6 font-semibold text-sm md:text-base text-gray-700">
                                            Nama Kategori
                                        </th>
                                        <th className="py-4 px-6 font-semibold text-sm md:text-base text-gray-700 text-center w-48">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length > 0 ? (
                                        categories.map((category) => (
                                            <tr
                                                key={category.id}
                                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                                            >
                                                <td className="py-4 px-6 text-sm md:text-base">
                                                    {category.id}
                                                </td>
                                                <td className="py-4 px-6 text-sm md:text-base font-medium">
                                                    {category.name}
                                                </td>
                                                <td className="py-4 px-6 text-sm md:text-base text-center">
                                                    <div className="flex justify-center gap-4">
                                                        <Link
                                                            href={route(
                                                                "categories.edit",
                                                                category.id,
                                                            )}
                                                            className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "categories.destroy",
                                                                category.id,
                                                            )}
                                                            method="delete"
                                                            as="button"
                                                            onClick={(e) => {
                                                                if (
                                                                    !window.confirm(
                                                                        "Hapus kategori?",
                                                                    )
                                                                )
                                                                    e.preventDefault();
                                                            }}
                                                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                        >
                                                            Hapus
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="3"
                                                className="py-8 px-6 text-center text-gray-500 italic text-sm md:text-base"
                                            >
                                                Belum ada data kategori.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL EXPORT DYNAMIC FIELDS */}
            {showExportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Export Kategori (Dynamic Fields)
                        </h3>
                        <form onSubmit={submitExport}>
                            <p className="text-sm text-gray-600 mb-3">
                                Pilih kolom yang ingin disertakan di file Excel:
                            </p>
                            <div className="space-y-2 mb-6">
                                {["id", "name", "created_at", "updated_at"].map(
                                    (col) => (
                                        <label
                                            key={col}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                value={col}
                                                checked={exportData.columns.includes(
                                                    col,
                                                )}
                                                onChange={handleCheckboxChange}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-800 uppercase">
                                                {col.replace("_", " ")}
                                            </span>
                                        </label>
                                    ),
                                )}
                            </div>
                            {exportData.columns.length === 0 && (
                                <p className="text-red-500 text-xs mb-4">
                                    Minimal pilih 1 kolom!
                                </p>
                            )}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowExportModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={
                                        processingExport ||
                                        exportData.columns.length === 0
                                    }
                                    className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors disabled:opacity-50"
                                >
                                    {processingExport
                                        ? "Memproses..."
                                        : "Download Excel"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL IMPORT */}
            {showImportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Import Data Kategori
                        </h3>
                        <form onSubmit={submitImport}>
                            <p className="text-sm text-gray-600 mb-4">
                                Unggah file Excel (.xlsx / .xls). Pastikan ada
                                header kolom bernama <strong>name</strong>.
                            </p>
                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={(e) =>
                                    setImportData("file", e.target.files[0])
                                }
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none mb-2"
                                required
                            />
                            {importErrors.file && (
                                <p className="text-red-500 text-xs mb-4">
                                    {importErrors.file}
                                </p>
                            )}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowImportModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={
                                        processingImport || !importData.file
                                    }
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50"
                                >
                                    {processingImport
                                        ? "Mengunggah..."
                                        : "Import Sekarang"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
