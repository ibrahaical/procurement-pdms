import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, roles }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl md:text-2xl text-gray-800 leading-tight">Manajemen Role</h2>}
        >
            <Head title="Role Management" />

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((role) => (
                                        <tr key={role.id}>
                                            <td className="border-b py-3 px-4 text-sm md:text-base">{role.id}</td>
                                            <td className="border-b py-3 px-4 text-sm md:text-base">{role.name}</td>
                                            <td className="border-b py-3 px-4 text-sm md:text-base">{role.guard_name}</td>
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
