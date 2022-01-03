<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeeResource;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index()
    {
        return ['employees' => EmployeeResource::collection(Employee::all())];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return EmployeeResource|Response
     * @throws \Exception|\Throwable
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $employee = Employee::create($request->input("employee"));
            $employee->addresses()->create($request->input("address"));

            DB::commit();
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to delete the employee.'], 500);
        }

        return new EmployeeResource($employee);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return EmployeeResource|Response
     */
    public function show(int $id)
    {
        try {
            return new EmployeeResource(Employee::findOrFail($id));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            return response(['message' => "employee not found"], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return EmployeeResource|Response
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $employee = Employee::findOrFail($id);
            $employee->update($request->input("employee"));

            if ($request->has("address")) {
                $employee->addresses()->update($request->input("address"));
            }

            DB::commit();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            DB::rollback();
            return response(['message' => "employee not found"], 404);
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to delete the employee.'], 500);
        }

        return new EmployeeResource($employee);
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
            $employee->addresses()->delete();
            $employee->delete();

            DB::commit();
            return response(['message' => 'employee deleted from the database'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $m) {
            return response(['message' => 'employee not found'], 404);
        } catch (\Exception|\Throwable $e) {
            DB::rollback();
            return response(['message' => 'there was an error trying to delete the employee.'], 500);
        }
    }
}
