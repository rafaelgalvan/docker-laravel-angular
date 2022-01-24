<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Service\GenericService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return array|Response
     */
    public function index()
    {
        return response(Employee::with('address', 'companies.address')->get());
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
                $employee = new Employee();
                if ($request->has('json')) {
                    $data = json_decode($request->get('json'), true);
                    $employee = Employee::create($data['employee']);
                    $employee->address()->create($data['address']);
                    $companies = $data['companies'];
                    foreach ($companies as $company) {
                        $employee->companies()->attach($company['id']);
                    }
                }

                if ($request->hasFile('file')) {
                    $fileController = new FileController();
                    $file = $fileController->handleFile($request);
                    $employee->file()->save($file);
                }
            } else {
                $employee = Employee::create($request->input('employee'));
                $employee->address()->create($request->input('address'));
                $companies = $request->input('companies');
                foreach ($companies as $company) {
                    $employee->companies()->attach($company['id']);
                }
            }

            DB::commit();
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to save the employee.'], 500);
        }

        return response($employee->load('address', 'companies', 'file'), 201);
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
            return response(Employee::with('address', 'companies')->findOrFail($id));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            return response(['message' => "employee not found"], 404);
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

            $employee = Employee::findOrFail($id);
            $employee->update($request->input("employee"));

            if ($request->has("address")) {
                $employee->address()->update($request->input("address"));
            }

            DB::commit();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            DB::rollback();
            return response(['message' => "employee not found"], 404);
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to update the employee.'], 500);
        }

        return response($employee->load('address', 'companies'), 200);
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

            $employee = Employee::findOrFail($id);
            $service = New GenericService();
            $service->delete($employee);

            DB::commit();
            return response([
                'status' => true,
                'message' => 'employee deleted from the database'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            return response(['message' => 'employee not found'], 404);
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to delete the employee.'], 500);
        }
    }
}
