import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("vendors.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl md:text-2xl text-gray-800 leading-tight">
                    Tambah Vendor Baru
                </h2>
            }
        >
            <Head title="Tambah Vendor" />

            <div className="py-12 md:py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Nama Perusahaan/Vendor
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                                        placeholder="Misal: PT Teknologi Nusantara"
                                        required
                                        autoFocus
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-4 flex items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                                    >
                                        {processing
                                            ? "Menyimpan..."
                                            : "Simpan Vendor"}
                                    </button>
                                    <Link
                                        href={route("vendors.index")}
                                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                    >
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
