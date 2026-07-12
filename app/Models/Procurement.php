<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Procurement extends Model implements Auditable
{
    use HasFactory, SoftDeletes, HasUuids;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'category_id',
        'vendor_id',
        'title',
        'deadline_date',
        'is_approved',
        'vendor_snapshot',
        'document_path'
    ];

    // Konversi tipe data bawaan (Casting)
    protected function casts(): array
    {
        return [
            'deadline_date' => 'datetime',
            'is_approved' => 'boolean',
            'vendor_snapshot' => 'array',
        ];
    }

    // Relasi Belongs-To ke Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Relasi Belongs-To ke Vendor
    public function vendor()
    {
        return $this->belongsTo(Vendor::class)->withTrashed();
    }
}
