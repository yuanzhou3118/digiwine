<?php

namespace App\Http\Controllers\Note;

use App\Traits\AcxiomBehaviorTrait;
use App\Traits\NoteTrait;
use App\Traits\PointTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use Exception;
use Log;

class NoteController extends Controller
{
    use NoteTrait, PointTrait, AcxiomBehaviorTrait;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        return view('note.manage');
    }

    /**
     * 话题管理页面
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexDo(Request $request, $id)
    {
        $id = intval(trim($id));

        $status = intval(trim($request->input('status')));

        $query = DB::table('notes');

        if ($status != 2)
            $query = $query->where('notes.status', $status);

        $countQuery = $query;
        $totalCount = $countQuery->count();

        //分页器
        $pageSize = 10;//每页显示记录数

        if (($id - 1) * $pageSize >= $totalCount) {
            return response()->json(['result' => 0, 'count' => $totalCount, 'data' => []]);
        }

        $queryData = $query
            ->orderBy('notes.created_at', 'desc')
            ->skip($pageSize * ($id - 1))
            ->take($pageSize)
            ->get([
                'notes.id',
                'notes.user_id',
                'notes.content',
                'notes.note_likes',
                'notes.status',
                'notes.created_at',
                'notes.sort'
            ]);

        $resultData = [];

        foreach ($queryData as $item) {
            array_push($resultData, [
                'id' => $item->id,
                'user_id' => $item->user_id,
                'content' => e($item->content),
                'note_likes' => $item->note_likes,
                'status' => $item->status,
                'sort' => $item->sort,
                'created_at' => $item->created_at,
            ]);
        }

        return response()->json([
            'result' => 1,
            'count' => $totalCount,
            'data' => $resultData,
        ],
            200,
            ['Content-Type' => 'application/json;charset=utf-8'],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * 审核笔记
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function checkNote(Request $request, $id)
    {
        $id = intval(trim($id));

        $note = $this->getNoteById($id, ['id', 'user_id', 'created_at', 'wine_name']);

        $status = intval(trim($request->input('status')));

        if (is_null($note)) {
            return response()->json(['result' => 0]);
        }

        $note->status = $status;

        $result = 0;

        try {
            $note->save();

            $result = 1;
        } catch (Exception $e) {
            Log::error('approval question exception,id:' . $id . ',exception:' . $e->getMessage());
        }

        if ($result && $status == 1) {
            $havePoint = $this->addCreateNotePoint($note->user_id, $note->id, $note->created_at);

            $this->behaviorDataNote($note->user_id, $havePoint == 1, $note->created_at, $note->wine_name);
        }

        return response()->json(['result' => $result]);
    }

    /**
     * 编辑sort页面
     *
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $note = $this->getNoteById($id,['sort','id']);

        if (is_null($note)) {
            return view('note.manage', 1);
        }

        return view('note.edit', ['note' => $note]);
    }

    /**
     * 更新数据
     *
     * @param \Illuminate\Http\Request $request
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function update(Request $request, $id)
    {
        $note = $this->getNoteById($id,['sort','id']);

        if (is_null($note))
            return view('note.manage', 1);

        $sort = trim($request->input('sort'));

        $result = '保存失败';

        try {
            $note->sort = $sort;
            $note->save();

            $result = '保存成功';
        } catch (Exception $e) {
            Log::error('save notice exception,id:' . $id . ',exception:' . $e->getMessage());
        }

        return view('note.edit', ['note' => $note, 'result' => $result]);
    }
}
