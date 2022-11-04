<?php

namespace App\Http\Controllers\Api\TodoItems;

use App\Http\Controllers\Controller;
use App\Http\Requests\TodoItems\TodoItemsRequest;
use App\Http\Resources\TodoItemResource;
use App\Models\TodoItem;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\HttpException;

class TodoItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return TodoItemResource::collection(TodoItem::all()->sortByDesc('created_at'));
    }

    /**
     * Store a newly created resource.
     *
     * @param TodoItemsRequest $request
     * @return TodoItemResource
     */
    public function store(TodoItemsRequest $request): TodoItemResource
    {
        try {
            $todoItem = new TodoItem;
            $todoItem->fill($request->validated());
            if (!empty($request->image)) {
                $this->uploadFileAndFillTodoItem($request, $todoItem);
            }

            $todoItem->save();

            return new TodoItemResource($todoItem);
        } catch (Exception $exception) {
            throw new HttpException(400, "Invalid data - {$exception->getMessage()}");
        }
    }

    /**
     * Display the resource.
     *
     * @param TodoItem $todoItem
     * @return TodoItemResource
     */
    public function show(TodoItem $todoItem): TodoItemResource
    {
        return new TodoItemResource($todoItem);
    }

    /**
     * Update the resource.
     *
     * @param TodoItemsRequest $request
     * @param TodoItem $todoItem
     * @return TodoItemResource
     */
    public function update(TodoItemsRequest $request, TodoItem $todoItem): TodoItemResource
    {
        try {
            $todoItem->fill($request->validated());
            if (!empty($request->image)) {
                $this->uploadFileAndFillTodoItem($request, $todoItem);
            } else {
                $todoItem->fill(['image' => null]);
            }
            $todoItem->save();

            return new TodoItemResource($todoItem);
        } catch (Exception $exception) {
            throw new HttpException(400, "Invalid data - {$exception->getMessage()}");
        }
    }

    /**
     * Mark the TodoItem as completed.
     *
     * @param TodoItem $todoItem
     * @return TodoItemResource
     */
    public function markAsComplete(TodoItem $todoItem): TodoItemResource
    {
        try {
            if ($todoItem->completed) {
                throw new HttpException(400, "Todo item already completed");
            }
            $todoItem->update([
                'completed' => true,
                'completed_at' => now()
            ]);
            $todoItem->save();

            return new TodoItemResource($todoItem);
        } catch (Exception $exception) {
            throw new HttpException(400, "Invalid data - {$exception->getMessage()}");
        }
    }

    /**
     * Mark the TodoItem as incomplete.
     *
     * @param TodoItem $todoItem
     * @return TodoItemResource
     */
    public function markAsIncomplete(TodoItem $todoItem): TodoItemResource
    {
        try {
            if (!$todoItem->completed) {
                throw new HttpException(400, "Todo item is not completed");
            }
            $todoItem->update([
                'completed' => false,
                'completed_at' => null
            ]);
            $todoItem->save();

            return new TodoItemResource($todoItem);
        } catch (Exception $exception) {
            throw new HttpException(400, "Invalid data - {$exception->getMessage()}");
        }
    }

    /**
     * Remove the resource.
     *
     * @param TodoItem $todoItem
     * @return JsonResponse
     */
    public function destroy(TodoItem $todoItem): JsonResponse
    {
        $todoItem->delete();

        return response()->json(null, 204);
    }

    /**
     * Upload image to public image folder and add the filePath to the model.
     *
     * @param TodoItemsRequest $request
     * @param TodoItem $todoItem
     * @return void
     */
    private static function uploadFileAndFillTodoItem(TodoItemsRequest $request, TodoItem $todoItem): void
    {
        $filesDir = '/uploads/images/';
        $name = Str::slug($request->title) . '_' . time() . '.' . $request->image->getClientOriginalExtension();
        $request->image->storeAs($filesDir, $name, 'public');
        $filePath = $filesDir . $name;
        $todoItem->fill(['image' => $filePath]);
    }
}
