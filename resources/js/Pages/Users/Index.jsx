import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, users }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl md:text-2xl text-gray-800 leading-tight">Manajemen User</h2>}
        >
            <Head title="User Management" />

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
