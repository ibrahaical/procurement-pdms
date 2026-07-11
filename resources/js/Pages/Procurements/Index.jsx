import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, procurements }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl md:text-2xl text-gray-800 leading-tight">
                        Data Pengadaan
                    </h2>
                    <Link
                        href={route("procurements.create")}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
                    >
                        + Buat Pengadaan
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen Pengadaan" />

            <div className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base">
                                            Judul Pengadaan
                                        </th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base">
                                            Kategori
                                        </th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base">
                                            Vendor (Snapshot)
                                        </th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base">
                                            Status
                                        </th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base">
                                            Dokumen
                                        </th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base text-center w-48">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {procurements.length > 0 ? (
                                        procurements.map((item) => (
                                            <tr key={item.id}>
                                                <td className="border-b py-3 px-4 text-sm md:text-base font-medium">
                                                    {item.title}
                                                </td>
                                                <td className="border-b py-3 px-4 text-sm md:text-base text-gray-600">
                                                    {item.category
                                                        ? item.category.name
                                                        : "N/A"}
                                                </td>
                                                <td className="border-b py-3 px-4 text-sm md:text-base text-gray-600">
                                                    {item.vendor_snapshot
                                                        ? item.vendor_snapshot
                                                              .name
                                                        : "N/A"}
                                                </td>
                                                <td className="border-b py-3 px-4 text-sm md:text-base">
                                                    {item.is_approved ? (
                                                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-md">
                                                            Approved
                                                        </span>
                                                    ) : (
                                                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-md">
                                                            Pending
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="border-b py-3 px-4 text-sm md:text-base">
                                                    {item.document_path ? (
                                                        <a
                                                            href={`/storage/${item.document_path}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            Lihat PDF
                                                        </a>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>
                                                <td className="border-b py-3 px-4 text-sm md:text-base text-center">
                                                    <div className="flex justify-center gap-3">
                                                        <Link
                                                            href={route(
                                                                "procurements.edit",
                                                                item.id,
                                                            )}
                                                            className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "procurements.destroy",
                                                                item.id,
                                                            )}
                                                            method="delete"
                                                            as="button"
                                                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                            onClick={(e) => {
                                                                if (
                                                                    !window.confirm(
                                                                        "Yakin ingin menghapus data pengadaan ini?",
                                                                    )
                                                                ) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
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
                                                className="border-b py-6 px-4 text-center text-gray-500 italic text-sm md:text-base"
                                            >
                                                Belum ada transaksi pengadaan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
