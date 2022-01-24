<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Service\GenericService;
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

            if ($request->getContentType() == 'form') {
                $customer = new Customer();
                if ($request->has('json')) {
                    $data = json_decode($request->get('json'), true);
                    $customer = Customer::create($data['customer']);
                    $customer->address()->create($data['address']);
                    $companies = $data['companies'];
                    foreach ($companies as $company) {
                        $customer->companies()->attach($company['id']);
                    }
                }

                if ($request->hasFile('file')) {
                    $fileController = new FileController();
                    $file = $fileController->handleFile($request);
                    $customer->file()->save($file);
                }
            } else {
                $customer = Customer::create($request->input('customer'));
                $customer->address()->create($request->input('address'));
                $companies = $request->input('companies');
                foreach ($companies as $company) {
                    $customer->companies()->attach($company['id']);
                }
            }

            DB::commit();
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to save the customer.'], 500);
        }

        return response($customer->load('address', 'companies', 'file'), 201);
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
            return response(Customer::with('address', 'companies.address')->findOrFail($id));
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
            $service = New GenericService();
            $service->delete($customer);

            DB::commit();
            return response([
                'status' => true,
                'message' => 'customer deleted from the database'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            return response(['message' => 'customer not found'], 404);
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to delete the customer'], 500);
        }
    }
}
