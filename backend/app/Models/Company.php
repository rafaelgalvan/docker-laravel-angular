<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'cnpj'];
    protected $table = 'companies';

    public function address(): MorphOne
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function employees(): MorphToMany
    {
        return $this->morphedByMany(Employee::class, 'company_relationshipable');
    }

    public function customers(): MorphToMany
    {
        return $this->morphedByMany(Customer::class, 'company_relationshipable');
    }
}
