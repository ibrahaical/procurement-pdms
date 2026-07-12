import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import Select from "react-select";

export default function Edit({
    auth,
    procurement,
    categories,
    vendors,
    audits,
}) {
    const formattedDate = procurement.deadline_date
        ? procurement.deadline_date.replace(" ", "T").slice(0, 16)
        : "";

    const { data, setData, post, processing, errors } = useForm({
        _method: "PUT", // Wajib untuk simulasi form put saat mengirim file di Laravel
        title: procurement.title || "",
        category_id: procurement.category_id || null,
        vendor_id: procurement.vendor_id || null,
        deadline_date: formattedDate,
        is_approved: procurement.is_approved ? "1" : "0", // Format untuk select/radio status
        document: null,
    });

    const [clientError, setClientError] = useState("");

    const categoryOptions = categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
    }));
    const vendorOptions = vendors.map((ven) => ({
        value: ven.id,
        label: ven.name,
    }));

    // Menentukan default value Select2 berdasarkan data saat ini
    const defaultCategory = categoryOptions.find(
        (opt) => opt.value === data.category_id,
    );
    const defaultVendor = vendorOptions.find(
        (opt) => opt.value === data.vendor_id,
    );

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setClientError("");

        if (file) {
            if (file.type !== "application/pdf") {
                setClientError("Dokumen harus berformat PDF.");
                setData("document", null);
                return;
            }

            const fileSizeKB = file.size / 1024;
            if (fileSizeKB < 100 || fileSizeKB > 500) {
                setClientError(
                    `Ukuran file tidak valid (${Math.round(fileSizeKB)} KB). Wajib di antara 100 KB - 500 KB.`,
                );
                setData("document", null);
                return;
            }

            setData("document", file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (clientError) return;

        // Gunakan post karena kita telah menyisipkan _method: 'PUT' untuk mengakali batasan upload file HTML
        post(route("procurements.update", procurement.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl md:text-2xl text-gray-800 leading-tight">
                    Edit Pengadaan
                </h2>
            }
        >
            <Head title="Edit Pengadaan" />

            <div className="py-12 md:py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8 text-gray-900">
                            <form
                                onSubmit={submit}
                                className="space-y-6"
                                encType="multipart/form-data"
                            >
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Judul Pengadaan
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                                        required
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Kategori
                                    </label>
                                    <div className="mt-2">
                                        <Select
                                            options={categoryOptions}
                                            defaultValue={defaultCategory}
                                            onChange={(option) =>
                                                setData(
                                                    "category_id",
                                                    option.value,
                                                )
                                            }
                                            placeholder="Pilih kategori..."
                                            className="text-base"
                                        />
                                    </div>
                                    {errors.category_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Vendor
                                    </label>
                                    <div className="mt-2">
                                        <Select
                                            options={vendorOptions}
                                            defaultValue={defaultVendor}
                                            onChange={(option) =>
                                                setData(
                                                    "vendor_id",
                                                    option.value,
                                                )
                                            }
                                            placeholder="Pilih vendor..."
                                            className="text-base"
                                        />
                                    </div>
                                    {errors.vendor_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.vendor_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="deadline_date"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Tanggal Deadline
                                    </label>
                                    <input
                                        id="deadline_date"
                                        type="datetime-local"
                                        value={data.deadline_date}
                                        onChange={(e) =>
                                            setData(
                                                "deadline_date",
                                                e.target.value,
                                            )
                                        }
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                                        required
                                    />
                                    {errors.deadline_date && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.deadline_date}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="is_approved"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Status Approval
                                    </label>
                                    <select
                                        id="is_approved"
                                        value={data.is_approved}
                                        onChange={(e) =>
                                            setData(
                                                "is_approved",
                                                e.target.value,
                                            )
                                        }
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                                    >
                                        <option value="0">Pending</option>
                                        <option value="1">Approved</option>
                                    </select>
                                    {errors.is_approved && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.is_approved}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="document"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Ganti Dokumen (PDF, 100 KB - 500 KB) —
                                        Opsional
                                    </label>
                                    <input
                                        id="document"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        className="mt-2 block w-full text-base text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Kosongkan jika tidak ingin mengganti
                                        file PDF saat ini.
                                    </p>
                                    {clientError && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {clientError}
                                        </p>
                                    )}
                                    {errors.document && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.document}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-4 flex items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={processing || !!clientError}
                                        className="inline-flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                                    >
                                        {processing
                                            ? "Memperbarui..."
                                            : "Update Transaksi"}
                                    </button>
                                    <Link
                                        href={route("procurements.index")}
                                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                    >
                                        Batal
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Audit Trail */}
                    <div className="mt-8 bg-white overflow-hidden shadow-sm sm:rounded-lg border-t-4 border-indigo-500">
                        <div className="p-6 md:p-8">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                                Rekam Jejak Perubahan (Audit Trail)
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Log di bawah ini direkam secara otomatis oleh
                                sistem untuk menjaga akuntabilitas data (Siapa,
                                Kapan, dan Apa yang diubah).
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-sm md:text-base text-gray-700">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-3 px-4 font-semibold border-b">
                                                Waktu (WIB)
                                            </th>
                                            <th className="py-3 px-4 font-semibold border-b">
                                                Aksi
                                            </th>
                                            <th className="py-3 px-4 font-semibold border-b">
                                                Dilakukan Oleh
                                            </th>
                                            <th className="py-3 px-4 font-semibold border-b">
                                                Detail Perubahan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {audits && audits.length > 0 ? (
                                            audits.map((audit) => (
                                                <tr
                                                    key={audit.id}
                                                    className="border-b hover:bg-gray-50 transition-colors duration-150"
                                                >
                                                    <td className="py-3 px-4 align-top whitespace-nowrap">
                                                        {new Date(
                                                            audit.created_at,
                                                        ).toLocaleString(
                                                            "id-ID",
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4 align-top">
                                                        <span
                                                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-md uppercase ${
                                                                audit.event ===
                                                                "created"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : audit.event ===
                                                                        "updated"
                                                                      ? "bg-blue-100 text-blue-800"
                                                                      : "bg-red-100 text-red-800"
                                                            }`}
                                                        >
                                                            {audit.event}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 align-top font-medium">
                                                        {audit.user
                                                            ? audit.user.name
                                                            : "Sistem / Guest"}
                                                    </td>
                                                    <td className="py-3 px-4 align-top">
                                                        {audit.event ===
                                                        "created" ? (
                                                            <span className="text-gray-500 italic">
                                                                Data pengadaan
                                                                pertama kali
                                                                dibuat.
                                                            </span>
                                                        ) : (
                                                            <div className="bg-gray-50 p-3 rounded-md border border-gray-200 font-mono text-xs overflow-x-auto">
                                                                {/* Menampilkan apa saja field yang berubah */}
                                                                {Object.keys(
                                                                    audit.new_values,
                                                                ).map((key) => (
                                                                    <div
                                                                        key={
                                                                            key
                                                                        }
                                                                        className="mb-2 last:mb-0"
                                                                    >
                                                                        <span className="text-gray-900 font-bold">
                                                                            {
                                                                                key
                                                                            }

                                                                            :{" "}
                                                                        </span>
                                                                        <span className="text-red-500 line-through mr-2">
                                                                            {JSON.stringify(
                                                                                audit
                                                                                    .old_values[
                                                                                    key
                                                                                ],
                                                                            ) ||
                                                                                "null"}
                                                                        </span>
                                                                        <span className="text-green-600 font-bold">
                                                                            {JSON.stringify(
                                                                                audit
                                                                                    .new_values[
                                                                                    key
                                                                                ],
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    className="py-6 px-4 text-center text-gray-500 italic"
                                                >
                                                    Belum ada rekam jejak.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
