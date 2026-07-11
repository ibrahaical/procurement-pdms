import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, user, roles }) {
    // Ambil nama role saat ini (jika ada) untuk default value select
    const currentRole = user.roles.length > 0 ? user.roles[0].name : '';

    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        role: currentRole,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl md:text-2xl text-gray-800 leading-tight">Edit Data User</h2>}
        >
            <Head title="Edit User" />

            <div className="py-12 md:py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8 text-gray-900">

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Valid</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                                        required
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role Pengguna</label>
                                    <select
                                        id="role"
                                        value={data.role}
                                        onChange={e => setData('role', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                                        required
                                    >
                                        <option value="">-- Pilih Role --</option>
                                        {roles.map(role => (
                                            <option key={role.id} value={role.name}>{role.name}</option>
                                        ))}
                                    </select>
                                    {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                                </div>

                                <hr className="my-6 border-gray-200" />

                                <p className="text-sm text-gray-500 mb-4">Kosongkan kolom password di bawah jika Anda tidak ingin mengubahnya.</p>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password Baru (Opsional)</label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                                    />
                                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                                    />
                                </div>

                                <div className="pt-4 flex items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                                    >
                                        {processing ? 'Memperbarui...' : 'Update User'}
                                    </button>
                                    <Link href={route('users.index')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                        Batal
                                    </Link>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
