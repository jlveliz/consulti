<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userId = null)
    {


        $users = User::all();
        return response()->json(['data' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();



        $validation = $this->validator($data);

        if ($validation->fails()) {
            return response()->json(['message' => $validation->errors()->all()], 400);
        }

        $coment  = new User();
        $coment->fill($data);
        $coment->save();
        return response()->json(['data' => $coment]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);

        if ($user) return response()->json(['data' => $user], 200);

        return response()->json(['message' => 'usuario no encontrado'], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if ($user) {

            $data = $request->all();
            $validation = $this->validator($data);

            if ($validation->fails()) {
                return response()->json(['message' => $validation->errors()->all()], 400);
            }

            $user->fill($request->all());
            $user->update();
            return response()->json(['data' => $user], 200);
        }

        return response()->json(['message' => 'usuario no encontrado'], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['data' => 'usuario eliminado'], 200);
        }

        return response()->json(['message' => 'usuario no encontrado'], 404);
    }


    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string' ,'min:8'],
        ]);
    }
}
