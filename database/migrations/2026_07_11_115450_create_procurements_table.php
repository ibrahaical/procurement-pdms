<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('procurements', function (Blueprint $table) {
            $table->uuid('id')->primary();

            // Relationships Fk
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('vendor_id')->constrained('vendors')->onDelete('cascade');

            $table->string('title');
            $table->dateTime('deadline_date');
            $table->boolean('is_approved')->default(false);

            // JSON snapshot data historis
            $table->json('vendor_snapshot')->nullable();

            $table->string('document_path')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurements');
    }
};
