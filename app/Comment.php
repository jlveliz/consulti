<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{


    protected $fillable = [
        'comment',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class,'user_id');
    }


    /**
     * Get the user's first name.
     *
     * @param  string  $value
     * @return string
     */
    public function getCreatedAt($value)
    {
        return (Carbon::create($value))->format('Y-m-d');
    }
}
