<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoItemResource;
use App\Models\TodoItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class TodoItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return TodoItemResource::collection(TodoItem::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        try {
            $todoItem = new TodoItem;
            $todoItem->fill($request->validated())->save();

            return new TodoItemResource($todoItem);

        } catch (\Exception $exception) {
            throw new HttpException(400, "Invalid data - {$exception->getMessage}");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\TodoItem $todoItem
     * @return Response
     */
    public function show(TodoItem $id)
    {
        $book = Book::findOrfail($id);

        return new BookResource($book);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, TodoItem $id)
    {
        if (!$id) {
            throw new HttpException(400, "Invalid id");
        }

        try {
            $todoItem = TodoItem::find($id);
            $todoItem->fill($request->validated())->save();

            return new TodoItemResource($todoItem);

        } catch (\Exception $exception) {
            throw new HttpException(400, "Invalid data - {$exception->getMessage}");
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\TodoItem $todoItem
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(TodoItem $id)
    {
        $book = TodoItem::findOrfail($id);
        $book->delete();

        return response()->json(null, 204);
    }
}
