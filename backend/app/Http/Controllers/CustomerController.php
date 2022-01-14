<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return array|Response
     */
    public function index()
    {
        return response(Customer::with('address', 'companies.address')->get());
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

            $customer = Customer::create($request->input("customer"));
            $customer->address()->create($request->input("address"));
            $customer->companies()->attach($request->input("company"));

            DB::commit();
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to save the customer'], 500);
        }

        return response($customer->load('address', 'companies'), 201);
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
            return response(Customer::with('address', 'companies')->findOrFail($id));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            return response(['message' => 'customer not found'], 404);
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

            $customer = Customer::findOrFail($id);
            $customer->update($request->input("customer"));

            if ($request->has("address")) {
                $customer->address()->update($request->input("address"));
            }
            DB::commit();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            DB::rollback();
            return response(['message' => 'customer not found'], 404);
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to update the customer'], 500);
        }

        return response($customer->load('address', 'companies'), 200);
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

            $customer = Customer::findOrFail($id);
            $customer->companies()->detach();
            $customer->address()->delete();

            $customer->delete();

            DB::commit();
            return response(['message' => 'customer deleted from the database'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            return response(['message' => 'customer not found'], 404);
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to delete the customer'], 500);
        }
    }
}
