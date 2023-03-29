<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WordList extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id", "name", "description", "to_language", "from_language"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function words()
    {
        return $this->hasMany(WordItem::class);
    }
}
