import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function Index({ auth, procurements, filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const [status, setStatus] = useState(filters?.status || "");
    const [sortField, setSortField] = useState(
        filters?.sort_field || "created_at",
    );
    const [sortDirection, setSortDirection] = useState(
        filters?.sort_direction || "desc",
    );

    const [showExportModal, setShowExportModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    const {
        data: exportData,
        setData: setExportData,
        post: postExport,
        processing: processingExport,
    } = useForm({
        columns: [
            "title",
            "category_id",
            "vendor_id",
            "deadline_date",
            "is_approved",
        ],
    });

    const {
        data: importData,
        setData: setImportData,
        post: postImport,
        processing: processingImport,
        errors: importErrors,
    } = useForm({
        file: null,
    });

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(
            route("procurements.index"),
            {
                search,
                status,
                sort_field: sortField,
                sort_direction: sortDirection,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleSort = (field) => {
        const direction =
            sortField === field && sortDirection === "asc" ? "desc" : "asc";
        setSortField(field);
        setSortDirection(direction);
        router.get(
            route("procurements.index"),
            { search, status, sort_field: field, sort_direction: direction },
            { preserveState: true, replace: true },
        );
    };

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
        postExport(route("procurements.export"), {
            onSuccess: () => setShowExportModal(false),
        });
    };

    const submitImport = (e) => {
        e.preventDefault();
        postImport(route("procurements.import"), {
            onSuccess: () => {
                setShowImportModal(false);
                setImportData("file", null);
            },
        });
    };

    const exportColumnOptions = [
        { key: "id", label: "ID Transaksi" },
        { key: "title", label: "Judul Pengadaan" },
        { key: "category_id", label: "Kategori" },
        { key: "vendor_id", label: "Vendor (Historical)" },
        { key: "is_approved", label: "Status Approval" },
        { key: "deadline_date", label: "Deadline" },
        { key: "created_at", label: "Tanggal Dibuat" },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                    <h2 className="font-semibold text-xl md:text-2xl text-gray-800 leading-tight">
                        Data Pengadaan
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setShowImportModal(true)}
                            className="inline-flex justify-center items-center px-4 py-2 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-colors duration-200 text-sm md:text-base"
                        >
                            Import Excel
                        </button>
                        <button
                            onClick={() => setShowExportModal(true)}
                            className="inline-flex justify-center items-center px-4 py-2 bg-amber-600 text-white font-semibold rounded-md hover:bg-amber-700 transition-colors duration-200 text-sm md:text-base"
                        >
                            Export Excel
                        </button>
                        <Link
                            href={route("procurements.create")}
                            className="inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base whitespace-nowrap"
                        >
                            + Buat Pengadaan
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Manajemen Pengadaan" />

            <div className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* AREA SEARCH & FILTER */}
                    <div className="bg-white p-4 md:p-6 mb-6 rounded-lg shadow-sm border border-gray-100">
                        <form
                            onSubmit={handleFilter}
                            className="flex flex-col md:flex-row gap-4 items-end"
                        >
                            <div className="w-full md:w-1/2">
                                <label
                                    htmlFor="search"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Cari Judul / Kategori
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Ketik kata kunci..."
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm md:text-base"
                                />
                            </div>
                            <div className="w-full md:w-1/3">
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Filter Status
                                </label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm md:text-base"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="approved">Approved</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                            <div className="w-full md:w-auto flex gap-2">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-6 py-2 md:py-2.5 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors duration-200 text-sm md:text-base font-medium"
                                >
                                    Cari
                                </button>
                                {(search || status) && (
                                    <Link
                                        href={route("procurements.index")}
                                        className="w-full md:w-auto px-4 py-2 md:py-2.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 text-sm md:text-base font-medium text-center"
                                    >
                                        Reset
                                    </Link>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* AREA TABEL UTAMA */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th
                                            onClick={() => handleSort("title")}
                                            className="cursor-pointer hover:bg-gray-100 py-4 px-4 font-semibold text-sm md:text-base text-gray-700"
                                        >
                                            Judul Pengadaan{" "}
                                            {sortField === "title"
                                                ? sortDirection === "asc"
                                                    ? "↑"
                                                    : "↓"
                                                : ""}
                                        </th>
                                        <th className="py-4 px-4 font-semibold text-sm md:text-base text-gray-700">
                                            Kategori
                                        </th>
                                        <th className="py-4 px-4 font-semibold text-sm md:text-base text-gray-700">
                                            Vendor (Snapshot)
                                        </th>
                                        <th
                                            onClick={() =>
                                                handleSort("is_approved")
                                            }
                                            className="cursor-pointer hover:bg-gray-100 py-4 px-4 font-semibold text-sm md:text-base text-gray-700"
                                        >
                                            Status{" "}
                                            {sortField === "is_approved"
                                                ? sortDirection === "asc"
                                                    ? "↑"
                                                    : "↓"
                                                : ""}
                                        </th>
                                        <th
                                            onClick={() =>
                                                handleSort("deadline_date")
                                            }
                                            className="cursor-pointer hover:bg-gray-100 py-4 px-4 font-semibold text-sm md:text-base text-gray-700"
                                        >
                                            Deadline{" "}
                                            {sortField === "deadline_date"
                                                ? sortDirection === "asc"
                                                    ? "↑"
                                                    : "↓"
                                                : ""}
                                        </th>
                                        <th className="py-4 px-4 font-semibold text-sm md:text-base text-gray-700 text-center w-48">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {procurements.data &&
                                    procurements.data.length > 0 ? (
                                        procurements.data.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-150"
                                            >
                                                <td className="py-4 px-4 text-sm md:text-base font-medium text-gray-900">
                                                    {item.title}
                                                </td>
                                                <td className="py-4 px-4 text-sm md:text-base text-gray-600">
                                                    {item.category?.name || "-"}
                                                </td>
                                                <td className="py-4 px-4 text-sm md:text-base text-gray-600">
                                                    {item.vendor_snapshot
                                                        ?.name || "-"}
                                                </td>
                                                <td className="py-4 px-4 text-sm md:text-base">
                                                    {item.is_approved ? (
                                                        <span className="inline-block px-2.5 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full border border-green-200">
                                                            Approved
                                                        </span>
                                                    ) : (
                                                        <span className="inline-block px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full border border-yellow-200">
                                                            Pending
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-sm md:text-base text-gray-600">
                                                    {new Date(
                                                        item.deadline_date,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        },
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-sm md:text-base text-center">
                                                    <div className="flex justify-center gap-4">
                                                        {item.document_path && (
                                                            <a
                                                                href={`/storage/${item.document_path}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-900 font-medium transition-colors duration-200"
                                                            >
                                                                Lihat PDF
                                                            </a>
                                                        )}
                                                        <Link
                                                            href={route(
                                                                "procurements.edit",
                                                                item.id,
                                                            )}
                                                            className="text-indigo-600 hover:text-indigo-900 font-medium transition-colors duration-200"
                                                        >
                                                            Edit & Audit
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "procurements.destroy",
                                                                item.id,
                                                            )}
                                                            method="delete"
                                                            as="button"
                                                            onClick={(e) => {
                                                                if (
                                                                    !window.confirm(
                                                                        "Hapus transaksi ini?",
                                                                    )
                                                                )
                                                                    e.preventDefault();
                                                            }}
                                                            className="text-red-600 hover:text-red-900 font-medium transition-colors duration-200"
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
                                                colSpan="6"
                                                className="py-8 px-4 text-center text-gray-500 italic text-sm md:text-base"
                                            >
                                                Belum ada transaksi pengadaan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* AREA PAGINASI */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                            <span className="text-sm md:text-base text-gray-600">
                                Menampilkan {procurements.from || 0} -{" "}
                                {procurements.to || 0} dari{" "}
                                {procurements.total || 0} data
                            </span>
                            <div className="flex gap-1 overflow-x-auto">
                                {procurements.links &&
                                    procurements.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || "#"}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            className={`px-3 py-1 text-sm md:text-base border rounded-md transition-colors duration-200 ${
                                                link.active
                                                    ? "bg-blue-600 text-white border-blue-600 cursor-default"
                                                    : link.url
                                                      ? "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                                                      : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                            }`}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL EXPORT DYNAMIC FIELDS */}
            {showExportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                            Export Pengadaan (Pilih Kolom)
                        </h3>
                        <form onSubmit={submitExport}>
                            <p className="text-sm text-gray-600 mb-3">
                                Pilih kolom (Dynamic Fields) yang ingin ditarik
                                ke Excel:
                            </p>
                            <div className="space-y-2 mb-6">
                                {exportColumnOptions.map((col) => (
                                    <label
                                        key={col.key}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            value={col.key}
                                            checked={exportData.columns.includes(
                                                col.key,
                                            )}
                                            onChange={handleCheckboxChange}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-800">
                                            {col.label}
                                        </span>
                                    </label>
                                ))}
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
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm md:text-base"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={
                                        processingExport ||
                                        exportData.columns.length === 0
                                    }
                                    className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors disabled:opacity-50 text-sm md:text-base"
                                >
                                    {processingExport
                                        ? "Memproses di antrean..."
                                        : "Export (Background)"}
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
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                            Import Data Pengadaan
                        </h3>
                        <form onSubmit={submitImport}>
                            <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-xs mb-4 border border-blue-100">
                                <strong>Panduan Kolom Excel:</strong>
                                <br />
                                Wajib ada header: <code>title</code>,{" "}
                                <code>vendor_id</code>.<br />
                                Opsional: <code>category_id</code>,{" "}
                                <code>deadline_date</code>,{" "}
                                <code>is_approved</code> (isi dengan "approved"
                                / "pending").
                            </div>
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
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm md:text-base"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={
                                        processingImport || !importData.file
                                    }
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 text-sm md:text-base"
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
