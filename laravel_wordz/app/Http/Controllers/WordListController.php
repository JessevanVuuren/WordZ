<?php

namespace App\Http\Controllers;

use App\Models\WordItem;
use App\Models\WordList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WordListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $word_lists = WordList::where("user_id", Auth::user()->id)->get();

        foreach($word_lists as $word_list) {
            $word_list->{"amount"} = $word_list->words()->count();
        }

        return $word_lists;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "string|required",
            "to_language" => "string|required",
            "from_language" => "string|required"
        ]);

        $wordList = WordList::create([
            "user_id" => Auth::user()->id,
            "name" => $request->name,
            "description" => $request->description,
            "to_language" => $request->to_language,
            "from_language" => $request->from_language,
        ]);

        return response($wordList, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $word_list = WordList::where([["user_id", Auth::user()->id], ["id", $id]])->get()->first();
        return $word_list;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $update_word_list = WordList::find($id);

        if ($update_word_list == null) {
            return response(["message" => "Not found"], 401);
        }

        if ($this->isNotAuth($update_word_list->user_id)) {
            return response(["message" => "User is not Authorized"], 401);
        }

        $update_word_list->fill($request->all())->save();
        return response($update_word_list, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $list_to_delete = WordList::find($id);

        if ($list_to_delete == null) {
            return response(["message" => "Not found"], 401);
        }

        if ($this->isNotAuth($list_to_delete->user_id)) {
            return response(["message" => "User is not Authorized"], 401);
        }

        $list_to_delete->delete();
        return response(["message" => "Word list deleted"], 200);
    }

    private function isNotAuth($id)
    {
        return Auth::user()->id !== $id;
    }
}
