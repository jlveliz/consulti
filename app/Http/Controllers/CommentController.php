<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userId = null)
    {


        $user = User::find($userId);
        if($user) {
            if ($user && $user->role_id == 'admin') {
                $comments = Comment::all();
            } else {
                $comments = Comment::where('user_id', $user->id)->get();
            }

            return response()->json(['data' => $comments]);
        }

        return response()->json(['data' => []]);


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
        $coment  = new Comment();
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
        $comment = Comment::find($id);

        if ($comment) return response()->json(['data' => $comment], 200);

        return response()->json(['message' => 'commentario no encontrado'],404);
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
        $comment = Comment::find($id);

        if ($comment) {
            $comment->fill($request->all());
            $comment->update();
            return response()->json(['data' => $comment], 200);
        }
        return response()->json(['message' => 'commentario no encontrado'],404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            $comment->delete();
            return response()->json(['data' => 'comentario eliminado'], 200);
        }

        return response()->json(['message' => 'commentario no encontrado'],404);
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
            'comment' => ['required', 'string', 'max:255'],
        ]);
    }
}
