import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            {/* Meta Title Khusus Halaman Ini */}
            <Head title="Landing Page - Pengadaan" />

            {/* Semantic HTML: main */}
            <main className="min-h-screen bg-gray-50 text-gray-900">
                {/* L1: Container responsif dengan mx-auto.
                    L2: Padding vertikal naik secara monoton (py-16 ke py-24).
                */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    {/* T1: Font-size wajib monoton naik (text-3xl ke text-5xl) */}
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                        Sistem Manajemen Dokumen Pengadaan
                    </h1>

                    <p className="text-base md:text-lg mb-8 text-gray-600 max-w-2xl">
                        Aplikasi pengadaan transparan dan efisien. Lacak dokumen, kelola vendor, dan pantau status transaksi secara real-time.
                    </p>

                    <div>
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                /* A1: Hindari transition-all, gunakan transition-colors */
                                className="inline-flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                                Masuk ke Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="inline-flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                                Login Sistem
                            </Link>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}
