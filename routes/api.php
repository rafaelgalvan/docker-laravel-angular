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
 * Verb          Path                          Action     Route Name
 * GET           /employees                    index      employees.index
 * POST          /employees                    store      employees.store
 * GET           /employees/{id}               show       employees.show
 * PUT|PATCH     /employees/{id}               update     employees.update
 * DELETE        /employees/{id}               destroy    employees.destroy
 */

/**
 * Employee API resources
 */
Route::apiResource('employees', EmployeeController::class);

/**
 * Customer API resources
 */
Route::apiResource('customers', CustomerController::class);

/**
 * Company API resources
 */
Route::apiResource('companies', CompanyController::class);

/**
 * Address API resources
 */
Route::apiResource('addresses', AddressController::class);
