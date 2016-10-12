<?php

namespace App\Http\Controllers\Api;

use App\Models\Note;
use App\Models\NoteFavorite;
use App\Models\NoteLike;
use App\Services\CommonService;
use App\Services\ImgService;
use App\Services\RegService;
use App\Services\SessionService;
use App\Traits\NoteTrait;
use App\Traits\PointTrait;
use App\Traits\UserNoteTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use Exception;
use Log;
use App\Traits\AcxiomBehaviorTrait;

class NoteController extends Controller
{
    use NoteTrait, PointTrait, UserNoteTrait, AcxiomBehaviorTrait;

    /**
     * NoteController constructor.
     */
    public function __construct()
    {
        header('Content-Type: ' . CommonService::CONTENT_TYPE_JSON);

        CommonService::setCrossDomain();
    }

    /**
     * 首页笔记接口。
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function home()
    {
        return response()->json($this->queryNoteById(1, 1, 3, 0), 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 所有笔记接口。
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function query(Request $request)
    {
        $sort = intval(trim($request->input('sort')));//最新排序：sort=0;最热排序：sort=1;

        if (RegService::verifySort($sort)) {
            return response()->json(['result' => 0]);
        }

        $pageIndex = intval(trim($request->input('page_index')));

        if ($pageIndex < 1) {
            $pageIndex = 1;
        }

        $pageSize = intval(trim($request->input('page_size')));

        if ($pageSize < 1) {
            $pageSize = CommonService::PAGE_DEFAULT_SIZE;
        }

        return response()->json($this->queryNoteById($sort, $pageIndex, $pageSize, 0),
            200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 查看笔记接口。
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function view(Request $request)
    {
        $noteId = intval(trim($request->input('note_id')));

        if ($noteId < 1)
            return response()->json(['result' => 2]);

        $checkNoteId = $this->getNoteById($noteId);

        if (is_null($checkNoteId))
            return response()->json(['result' => 2]);

        $queryData = DB::table('notes')
            ->where('notes.status', 1)
            ->join('users', 'users.id', '=', 'notes.user_id')
            ->where('notes.id', $noteId)
            ->first([
                'notes.id as note_id',
                'notes.content',
                'notes.imga',
                'notes.imgb',
                'notes.imgc',
                'notes.note_likes',
                'notes.created_at',
                'notes.wine_name',
                'notes.grape_varieties',
                'notes.country',
                'notes.place_of_origin',
                'notes.price',
                'notes.years',
                'notes.score',
                'notes.color',
                'notes.aroma_characteristics',
                'notes.flavor_characteristics',
                'notes.acid',
                'notes.tannic',
                'notes.texture',
                'notes.wine_body',
                'notes.sweetness',
                'notes.aftertaste',
                'users.head_url',
                'users.nick_name',
                'notes.note_favorites',
            ]);

        $resultData = [];
        array_push($resultData, [
            'created_at' => date('Y/m/d', strtotime($queryData->created_at)),
            'note_id' => $queryData->note_id,
            'content' => $queryData->content,
            'imga' => $queryData->imga,
            'imgb' => $queryData->imgb,
            'imgc' => $queryData->imgc,
            'note_likes' => $queryData->note_likes,
            'wine_name' => $queryData->wine_name,
            'grape_varieties' => $queryData->grape_varieties,
            'country' => $queryData->country,
            'place_of_origin' => $queryData->place_of_origin,
            'price' => $queryData->price,
            'years' => $queryData->years,
            'score' => $queryData->score,
            'color' => $queryData->color,
            'aroma_characteristics' => $queryData->aroma_characteristics,
            'flavor_characteristics' => $queryData->flavor_characteristics,
            'acid' => $queryData->acid,
            'tannic' => $queryData->tannic,
            'texture' => $queryData->texture,
            'wine_body' => $queryData->wine_body,
            'sweetness' => $queryData->sweetness,
            'aftertaste' => $queryData->aftertaste,
            'head_url' => CommonService::getHeadUrl($queryData->head_url),
            'note_favorites' => $queryData->note_favorites,
            'nickname' => e($queryData->nick_name),
        ]);

        return response()->json([
            'result' => 1,
            'data' => $resultData,
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * 创建笔记接口。
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $time = time();

        $userId = SessionService::getUser();

        $content = trim($request->input('content'));

        Log::info('create note content=' . $content . ',userId=' . $userId . ',字符长度：' . mb_strlen($content));

        if (mb_strlen($content) == 0) {
            $content = '留下你的感受，给小伙伴做个参考！';
        }
//        else{
//            if (mb_strlen($content) < 15 || mb_strlen($content) > 300) {
//                Log::error('字符超限,userId=' . $userId . ',字符长度：' . mb_strlen($content));
//                return response()->json(['result' => 4]);//话题内容超过字数限制
//            }
//        }
        if (mb_strlen($content) > 0) {
            if (mb_strlen($content) < 15 || mb_strlen($content) > 300) {
                Log::error('字符超限,userId=' . $userId . ',字符长度：' . mb_strlen($content));
                return response()->json(['result' => 4]);//话题内容超过字数限制
            }
        }

        $imga = trim($request->input('imga'));

        if (mb_strlen($imga) == 0)
            return response()->json(['result' => 2]);//2：没传图片

        $checkImgA = ImgService::checkBase64Img($imga);

        if ($checkImgA['result'] == 0) {
            return response()->json(['result' => 2]);
        }

        $pathA = 'uploads/notes/' . $userId . '_' . $time . 'a' . $checkImgA['img_suffix'];

        $statusA = ImgService::upload($pathA, $checkImgA['img_data']);

        if ($statusA) {
            return response()->json(['result' => 2]);
        }

        $pathA = '/' . $pathA;

        $imgb = trim($request->input('imgb'));

        if (mb_strlen($imgb) == 0)
            $pathB = null;
        else {
            $checkImgB = ImgService::checkBase64Img($imgb);

            if ($checkImgB['result'] == 0) {
                return response()->json(['result' => 2]);
            }

            $pathB = 'uploads/notes/' . $userId . '_' . $time . 'b' . $checkImgB['img_suffix'];

            $statusB = ImgService::upload($pathB, $checkImgB['img_data']);

            if ($statusB) {
                return response()->json(['result' => 2]);
            }

            $pathB = '/' . $pathB;
        }

        $imgc = trim($request->input('imgc'));

        if (mb_strlen($imgc) == 0) {
            $pathC = null;
        } else {
            $checkImgC = ImgService::checkBase64Img($imgc);

            if ($checkImgC['result'] == 0) {
                return response()->json(['result' => 2]);
            }

            $pathC = 'uploads/notes/' . $userId . '_' . $time . 'c' . $checkImgC['img_suffix'];

            $statusC = ImgService::upload($pathC, $checkImgC['img_data']);

            if ($statusC) {
                return response()->json(['result' => 2]);
            }

            $pathC = '/' . $pathC;
        }

        $wineName = trim($request->input('wine_name'));

        $grapeVarieties = trim($request->input('grape_varieties'));
        if (mb_strlen($grapeVarieties) == 0) {
            $grapeVarieties = '';
        }

        $country = trim($request->input('country'));

        $placeOfOrigin = trim($request->input('place_of_origin'));
        if (mb_strlen($placeOfOrigin) == 0) {
            $placeOfOrigin = '';
        }

        $price = trim($request->input('price'));

        $years = trim($request->input('years'));
        if (mb_strlen($years) == 0) {
            $years = '';
        }

        $score = trim($request->input('score'));
        $color = trim($request->input('color'));
        $aromaCharacteristic = trim($request->input('aroma_characteristics'));
        $flavorCharacteristic = trim($request->input('flavor_characteristics'));

        $acid = intval(trim($request->input('acid')));

        if (RegService::verifyNote($acid)) {
            return response()->json(['result' => 3]);//参数超过1-3
        }

        $tannic = intval(trim($request->input('tannic')));

        if (RegService::verifyNote($tannic)) {
            return response()->json(['result' => 3]);
        }

        $texture = intval(trim($request->input('texture')));

        if (RegService::verifyNote($texture)) {
            return response()->json(['result' => 3]);
        }

        $wineBody = intval(trim($request->input('wine_body')));

        if (RegService::verifyNote($wineBody)) {
            return response()->json(['result' => 3]);
        }

        $sweetness = intval(trim($request->input('sweetness')));

        if (RegService::verifyNote4($sweetness)) {
            return response()->json(['result' => 3]);
        }

        $aftertaste = intval(trim($request->input('aftertaste')));

        if (RegService::verifyNote($aftertaste)) {
            return response()->json(['result' => 3]);
        }

        $note = new Note();

        $note->content = $content;
        $note->user_id = $userId;
        $note->imga = $pathA;
        $note->imgb = $pathB;
        $note->imgc = $pathC;
        $note->wine_name = $wineName;
        $note->grape_varieties = $grapeVarieties;
        $note->country = $country;
        $note->place_of_origin = $placeOfOrigin;
        $note->price = $price;
        $note->years = $years;
        $note->score = $score;
        $note->color = $color;
        $note->aroma_characteristics = $aromaCharacteristic;
        $note->flavor_characteristics = $flavorCharacteristic;
        $note->acid = $acid;
        $note->tannic = $tannic;
        $note->texture = $texture;
        $note->wine_body = $wineBody;
        $note->sweetness = $sweetness;
        $note->aftertaste = $aftertaste;
        $note->status = 1;

        Log::info('backend msg:content='.$content.',wine_name='.$wineName.',酸度='.$acid.',单宁='.$tannic
            .',质感='.$texture.'，酒体='.$wineBody.',甜度='.$sweetness.',回味='.$aftertaste.'。');
        $result = 0;

        try {
            $note->save();

            $result = 1;
        } catch (Exception $e) {
            Log::error('save note-create exception,id:' . $userId . ',exception:' . $e->getMessage());
        }

        if ($result) {
            $havePoint = $this->addCreateNotePoint($note->user_id, $note->id, $note->created_at);

            $this->behaviorDataNote($note->user_id, $havePoint == 1, date('Y-m-d H:i:s.B'), $note->wine_name);
        }

        return response()->json(['result' => $result]);
    }

    /**
     * 用户收藏笔记接口。
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function favorite(Request $request)
    {
        $id = intval(trim($request->input('note_id')));

        $checkNoteId = $this->getNoteById($id);

        if (is_null($checkNoteId))
            return response()->json(['result' => 0]);

        $userId = SessionService::getUser();

        $checkUserId = NoteFavorite::whereNoteId($id)->whereUserId($userId)->count();

        if ($checkUserId) {
            return response()->json(['result' => 2]);//重复收藏
        }

        $noteFavorite = new NoteFavorite();

        $noteFavorite->user_id = $userId;
        $noteFavorite->note_id = $id;

        $checkNoteId->note_favorites = $checkNoteId->note_favorites + 1;

        DB::beginTransaction();

        $result = 0;

        try {
            $noteFavorite->save();

            $checkNoteId->save();

            DB::commit();

            $result = 1;
        } catch (Exception $e) {
            Log::error('save note-favorite exception,user_id:' . $userId .
                ',exception:' . $e->getMessage());

            DB::rollBack();
        }

        return response()->json(['result' => $result]);
    }

    /**
     * 用户点赞笔记接口。
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function like(Request $request)
    {
        $id = intval(trim($request->input('note_id')));

        if ($id < 1)
            return response()->json(['result' => 0]);

        $note = $this->getNoteById($id, ['id', 'note_likes', 'user_id']);

        if (is_null($note)) {
            return response()->json(['result' => 0]);
        }

        $userId = SessionService::getUser();

        $checkUserId = NoteLike::whereNoteId($id)->whereUserId($userId)->count();

        if ($checkUserId) {
            return response()->json(['result' => 2]);//已经点过赞了
        }

        $note->note_likes = $note->note_likes + 1;

        $noteLike = new NoteLike();

        $noteLike->note_id = $id;
        $noteLike->user_id = $userId;

        DB::beginTransaction();

        $result = 0;

        try {
            $note->save();

            $noteLike->save();

            DB::commit();

            $result = 1;
        } catch (Exception $e) {
            Log::error('save note-comment-bang exception,user_id:' . $userId .
                ',note id:' . $id . ',exception:' . $e->getMessage());

            DB::rollBack();
        }

        $this->updateUserNote($note->user_id, CommonService::USER_NOTE_CHANGE);

        return response()->json(['result' => $result]);
    }

    /**
     * 查看笔记的收藏点赞状态
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function status(Request $request)
    {
        $noteId = intval(trim($request->input('note_id')));

        $userId = SessionService::getUser();

        $noteFavorite = NoteFavorite::whereNoteId($noteId)->whereUserId($userId)->count();

        $noteLike = NoteLike::whereNoteId($noteId)->whereUserId($userId)->count();

        return response()->json(['note_like_status' => $noteLike, 'note_favorite_status' => $noteFavorite, 'result' => 1]);
    }
}
