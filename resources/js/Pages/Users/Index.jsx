import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, users }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl md:text-2xl text-gray-800 leading-tight">Manajemen User</h2>
                    <Link
                        href={route('users.create')}
                        /* Menghindari transition-all dan memastikan ukuran font konsisten */
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
                    >
                        + Tambah User
                    </Link>
                </div>
            }
        >
            <Head title="User Management" />

            {/* Spacing monoton naik sesuai standar Frontend Premium */}
            <div className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base">Nama User</th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base">Email</th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base">Role Assigned</th>
                                        <th className="border-b py-3 px-4 font-semibold text-sm md:text-base text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="border-b py-3 px-4 text-sm md:text-base">{user.name}</td>
                                            <td className="border-b py-3 px-4 text-sm md:text-base">{user.email}</td>
                                            <td className="border-b py-3 px-4 text-sm md:text-base">
                                                {user.roles.length > 0 ? (
                                                    user.roles.map(role => (
                                                        <span key={role.id} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-md mr-2">
                                                            {role.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-400 italic">No Role</span>
                                                )}
                                            </td>
                                            <td className="border-b py-3 px-4 text-sm md:text-base text-center">
                                                {/* Menggunakan flex dan gap untuk menghindari margin inline (ml-*) antar tombol */}
                                                <div className="flex justify-center gap-3">
                                                    <Link
                                                        href={route('users.edit', user.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route('users.destroy', user.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                        /* Konfirmasi sebelum hapus menggunakan onClick */
                                                        onClick={(e) => {
                                                            if (!window.confirm('Yakin ingin menghapus user ini?')) {
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
