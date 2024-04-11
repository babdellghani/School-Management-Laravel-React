<?php

namespace App\Http\Controllers;

use App\Models\Parents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ParentsRequest;
use App\Http\Resources\ParentsResource;

class ParentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ParentsRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $parents = Parents::create($data);

        return new ParentsResource($parents);
    }

    /**
     * Display the specified resource.
     */
    public function show(Parents $parents)
    {
        dd($parents);
        return new ParentsResource($parents);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ParentsRequest $request, Parents $parents)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $parents->update($data);

        return new ParentsResource($parents);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Parents $parents)
    {
        //
    }
}
