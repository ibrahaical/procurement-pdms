import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, roles }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl md:text-2xl text-gray-800 leading-tight">Manajemen Role</h2>
                    <Link
                        href={route('roles.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
                    >
                        + Tambah Role
                    </Link>
                </div>
            }
        >
            <Head title="Role Management" />

            {/* Spasi vertikal monoton naik */}
            <div className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base">ID</th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base">Nama Role</th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base">Guard Name</th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((role) => (
                                        <tr key={role.id}>
                                            <td className="border-b py-3 px-4 text-sm md:text-base">{role.id}</td>
                                            <td className="border-b py-3 px-4 text-sm md:text-base font-medium">{role.name}</td>
                                            <td className="border-b py-3 px-4 text-sm md:text-base text-gray-500">{role.guard_name}</td>
                                            <td className="border-b py-3 px-4 text-sm md:text-base text-center">
                                                <div className="flex justify-center gap-3">
                                                    <Link
                                                        href={route('roles.edit', role.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route('roles.destroy', role.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                        onClick={(e) => {
                                                            if (!window.confirm('Yakin ingin menghapus role ini?')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        Hapus
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
