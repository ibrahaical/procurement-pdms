import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Select from 'react-select'; // Implementasi React Select

export default function Create({ auth, categories, vendors }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category_id: null,
        vendor_id: null,
        deadline_date: '',
        document: null,
    });

    const [clientError, setClientError] = useState('');

    // Mapping data untuk kebutuhan format React Select
    const categoryOptions = categories.map(cat => ({ value: cat.id, label: cat.name }));
    const vendorOptions = vendors.map(ven => ({ value: ven.id, label: ven.name }));

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setClientError('');

        if (file) {
            // Validasi React (Frontend Validation) [cite: 26]
            if (file.type !== 'application/pdf') {
                setClientError('Dokumen harus berformat PDF.');
                setData('document', null);
                return;
            }

            const fileSizeKB = file.size / 1024;
            // Validasi ukuran 100kb - 500kb [cite: 115]
            if (fileSizeKB < 100 || fileSizeKB > 500) {
                setClientError(`Ukuran file tidak valid (${Math.round(fileSizeKB)} KB). Wajib di antara 100 KB - 500 KB.`);
                setData('document', null);
                return;
            }

            setData('document', file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (clientError) return;

        post(route('procurements.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl md:text-2xl text-gray-800 leading-tight">Buat Pengadaan Baru</h2>}
        >
            <Head title="Buat Pengadaan" />

            {/* Container responsif & spacing monoton naik (py-12 ke py-16) */}
            <div className="py-12 md:py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8 text-gray-900">

                            <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                                {/* Input Judul */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Pengadaan</label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                                        required
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* React Select Category  */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Kategori</label>
                                    <div className="mt-2">
                                        <Select
                                            options={categoryOptions}
                                            onChange={(option) => setData('category_id', option.value)}
                                            placeholder="Pilih kategori..."
                                            className="text-base"
                                        />
                                    </div>
                                    {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                                </div>

                                {/* React Select Vendor  */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Vendor</label>
                                    <div className="mt-2">
                                        <Select
                                            options={vendorOptions}
                                            onChange={(option) => setData('vendor_id', option.value)}
                                            placeholder="Pilih vendor..."
                                            className="text-base"
                                        />
                                    </div>
                                    {errors.vendor_id && <p className="mt-1 text-sm text-red-600">{errors.vendor_id}</p>}
                                </div>

                                {/* Input Deadline Date */}
                                <div>
                                    <label htmlFor="deadline_date" className="block text-sm font-medium text-gray-700">Tanggal Deadline</label>
                                    <input
                                        id="deadline_date"
                                        type="datetime-local"
                                        value={data.deadline_date}
                                        onChange={e => setData('deadline_date', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                                        required
                                    />
                                    {errors.deadline_date && <p className="mt-1 text-sm text-red-600">{errors.deadline_date}</p>}
                                </div>

                                {/* Upload Document Validation [cite: 115] */}
                                <div>
                                    <label htmlFor="document" className="block text-sm font-medium text-gray-700">Dokumen Pendukung (PDF, 100 KB - 500 KB)</label>
                                    <input
                                        id="document"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        className="mt-2 block w-full text-base text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
                                        required
                                    />
                                    {clientError && <p className="mt-1 text-sm text-red-600">{clientError}</p>}
                                    {errors.document && <p className="mt-1 text-sm text-red-600">{errors.document}</p>}
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing || !!clientError}
                                        className="inline-flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Transaksi'}
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
