<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index()
    {
        return Company::with('address')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     * @throws \Exception|\Throwable
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $company = Company::create($request->input("company"));
            $company->address()->create($request->input("address"));

            DB::commit();
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to save the company'], 500);
        }

        return response($company->load('address', 'companies'), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show(int $id)
    {
        try {
            return response(Company::with('address', 'employees.address', 'customers.address')->findOrFail($id));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            return response(['message' => 'company not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $company = Company::findOrFail($id);
            $company->update($request->input("company"));
            if ($request->has("address")) {
                $company->address()->update($request->input("address"));
            }
            DB::commit();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            DB::rollback();
            return response(['message' => 'company not found'], 404);
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to update the company'], 500);
        }

        return response($company->load('address', 'customers.address', 'employees.address'), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy(int $id)
    {
        try {
            DB::beginTransaction();

            $company = Company::findOrFail($id);

            if ($company->customers()->exists() || $company->employees()->exists())
            {
                return response(['message' => 'the company cannot be deleted because there are customers and/or employees related to it.'],
                    409);
            }
            $company->address()->delete();
            $company->delete();

            DB::commit();
            return response(['message' => 'company deleted from the database'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            return response(['message' => 'company not found'], 404);
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to delete the company'], 500);
        }
    }
}
