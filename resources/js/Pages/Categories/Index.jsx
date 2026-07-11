import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, categories }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl md:text-2xl text-gray-800 leading-tight">Manajemen Kategori</h2>
                    <Link
                        href={route('categories.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
                    >
                        + Tambah Kategori
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen Kategori" />

            {/* Container responsif & spacing vertikal monoton naik */}
            <div className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base w-16">ID</th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base">Nama Kategori</th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base text-center w-48">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length > 0 ? (
                                        categories.map((category) => (
                                            <tr key={category.id}>
                                                <td className="border-b py-3 px-4 text-sm md:text-base">{category.id}</td>
                                                <td className="border-b py-3 px-4 text-sm md:text-base font-medium">{category.name}</td>
                                                <td className="border-b py-3 px-4 text-sm md:text-base text-center">
                                                    <div className="flex justify-center gap-3">
                                                        <Link
                                                            href={route('categories.edit', category.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={route('categories.destroy', category.id)}
                                                            method="delete"
                                                            as="button"
                                                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                            onClick={(e) => {
                                                                if (!window.confirm('Yakin ingin menghapus kategori ini?')) {
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
                                            <td colSpan="3" className="border-b py-6 px-4 text-center text-gray-500 italic text-sm md:text-base">
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
        </AuthenticatedLayout>
    );
}
