<?php

namespace App\Http\Controllers;

use App\Models\WordItem;
use App\Models\WordList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WordItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "word_list_id" => "required",
            "word" => "string|required",
            "translation" => "string|required"
        ]);

        $id_if_exists = WordList::where([["user_id", Auth::user()->id], ["id", $request->word_list_id]])->first();
        if (!$id_if_exists) {
            return response(["message" => "List does not exist"], 404);
        }

        $newWord = WordItem::create($request->all());
        return $newWord;

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $id_if_exists = WordList::where([["user_id", Auth::user()->id], ["id", $id]])->first();
        if ($id_if_exists) {
            return WordItem::where("word_list_id", $id_if_exists->id)->get();
        }

        return response([
            "message" => "List does not exist"
        ], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $id_if_exists = WordList::where([["user_id", Auth::user()->id], ["id", $request->word_list_id]])->first();
        if (!$id_if_exists) {
            return response(["message" => "List does not exist"], 404);
        }

        $word_if_exists = WordItem::find($id);
        if ($word_if_exists == null) {
            return response(["message" => "Word does not exit"], 404);
        }

        $word_if_exists->fill($request->all())->save();
        return response($word_if_exists, 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $word_if_exists = WordItem::find($id);
        if ($word_if_exists == null) {
            return response(["message" => "Word does not exit"], 404);
        }

        $id_if_exists = WordList::where([["user_id", Auth::user()->id], ["id", $word_if_exists->word_list_id]])->first();
        if (!$id_if_exists) {
            return response(["message" => "List does not exist"], 404);
        }

        $word_if_exists->delete();
        return response(["message" => "Word deleted"], 200);
    }
}
