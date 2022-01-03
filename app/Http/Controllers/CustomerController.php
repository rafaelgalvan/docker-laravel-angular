<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index()
    {
        return ['customers' => CustomerResource::collection(Customer::all())];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return CustomerResource|Response
     * @throws \Exception|\Throwable
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $customer = Customer::create($request->input("customer"));
            $customer->addresses()->create($request->input("address"));

            DB::commit();
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to delete the customer'], 500);
        }

        return new CustomerResource($customer);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return CustomerResource|Response
     */
    public function show(int $id)
    {
        try {
            return new CustomerResource(Customer::findOrFail($id));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            return response(['message' => 'customer not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return CustomerResource|Response
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $customer = Customer::findOrFail($id);
            $customer->update($request->input("customer"));

            if ($request->has("address")) {
                $customer->addresses()->update($request->input("address"));
            }
            DB::commit();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            DB::rollback();
            return response(['message' => 'customer not found'], 404);
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to delete the customer'], 500);
        }

        return new CustomerResource($customer);
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
            $customer->addresses()->delete();
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
