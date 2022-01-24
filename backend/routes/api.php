<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * Employee API resources
 *
 * Verb          Path                          Action     Route Name
 * GET           /employees                    index      employees.index
 * POST          /employees                    store      employees.store
 * GET           /employees/{id}               show       employees.show
 * PUT|PATCH     /employees/{id}               update     employees.update
 * DELETE        /employees/{id}               destroy    employees.destroy
 *
 */
Route::apiResource('employees', EmployeeController::class);

/**
 * Customer API resources
 *
 * Verb          Path                          Action     Route Name
 * GET           /customers                    index      customers.index
 * POST          /customers                    store      customers.store
 * GET           /customers/{id}               show       customers.show
 * PUT|PATCH     /customers/{id}               update     customers.update
 * DELETE        /customers/{id}               destroy    customers.destroy
 *
 */
Route::apiResource('customers', CustomerController::class);

/**
 * Company API resources
 *
 * Verb          Path                          Action     Route Name
 * GET           /companies                    index      companies.index
 * POST          /companies                    store      companies.store
 * GET           /companies/{id}               show       companies.show
 * PUT|PATCH     /companies/{id}               update     companies.update
 * DELETE        /companies/{id}               destroy    companies.destroy
 *
 */
Route::apiResource('companies', CompanyController::class);
