import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, vendors }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl md:text-2xl text-gray-800 leading-tight">
                        Manajemen Vendor
                    </h2>
                    <Link
                        href={route("vendors.create")}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
                    >
                        + Tambah Vendor
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen Vendor" />

            {/* Container responsif & spacing vertikal monoton naik */}
            <div className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base w-16">
                                            ID
                                        </th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base">
                                            Nama Vendor
                                        </th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base text-center w-48">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendors.length > 0 ? (
                                        vendors.map((vendor) => (
                                            <tr key={vendor.id}>
                                                <td className="border-b py-3 px-4 text-sm md:text-base">
                                                    {vendor.id}
                                                </td>
                                                <td className="border-b py-3 px-4 text-sm md:text-base font-medium">
                                                    {vendor.name}
                                                </td>
                                                <td className="border-b py-3 px-4 text-sm md:text-base text-center">
                                                    <div className="flex justify-center gap-3">
                                                        <Link
                                                            href={route(
                                                                "vendors.edit",
                                                                vendor.id,
                                                            )}
                                                            className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "vendors.destroy",
                                                                vendor.id,
                                                            )}
                                                            method="delete"
                                                            as="button"
                                                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                            onClick={(e) => {
                                                                if (
                                                                    !window.confirm(
                                                                        "Yakin ingin menghapus vendor ini?",
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
                                                colSpan="3"
                                                className="border-b py-6 px-4 text-center text-gray-500 italic text-sm md:text-base"
                                            >
                                                Belum ada data vendor.
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
