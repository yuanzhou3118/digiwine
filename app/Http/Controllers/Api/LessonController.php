<?php

namespace App\Http\Controllers\Api;

use App\Services\CommonService;
use App\Services\PointService;
use App\Services\RegService;
use App\Services\SessionService;
use App\Traits\AcxiomBehaviorTrait;
use App\Traits\LessonCommentTrait;
use App\Traits\LessonTrait;
use App\Traits\PointTrait;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class LessonController extends Controller
{
    use LessonCommentTrait, PointTrait, AcxiomBehaviorTrait, LessonTrait;

    /**
     * 登陆路用户id。
     *
     * @var int
     */
    private $id;

    /**
     * LessonController constructor.
     */
    public function __construct()
    {
        header('Content-Type: ' . CommonService::CONTENT_TYPE_JSON);

        $this->id = SessionService::getUser();

        CommonService::setCrossDomain();
    }

    /**
     * 添加课题评论接口。
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function comment(Request $request)
    {
        $id = intval(trim($request->input('lesson_id')));

        if (RegService::verifyLesson($id)) {
            return response()->json(['result' => 2]);//课程不存在。
        }

        $comment = trim($request->input('comment'));

        if (mb_strlen($comment) < 15 || mb_strlen($comment) > 300) {
            return response()->json(['result' => -1]);
        }

        $result = $this->addLessonComment($this->id, $id, $comment);

        if ($result) {
            $status = $this->addLessonReviewPoint($this->id, $id);

            //发送评论课程行为数据到安客臣。
            $this->behaviorDataLesson($this->id, $id, $status == 1, PointService::LESSON_REVIEW_TYPE_ID);
        }

        return response()->json(['result' => $result ? 1 : 0]);
    }

    /**
     * 添加看课程视频接口。
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function video(Request $request)
    {
        $id = intval(trim($request->input('lesson_id')));

        if (RegService::verifyLesson($id)) {
            return response()->json(['result' => 2]);//课程不存在。
        }

        $status = $this->addLessonVideoPoint($this->id, $id);

        $this->behaviorDataLesson($this->id, $id, $status == 1, PointService::LESSON_VIDEO_TYPE_ID);

        return response()->json(['result' => 1]);//提交成功。
    }

    /**
     * 添加分享课程接口。
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function share()
    {
//        $id = intval(trim($request->input('lesson_id')));
//
//        if (RegService::verifyLesson($id)) {
//            return response()->json(['result' => 2]);//课程不存在。
//        }

//        $this->updateLesson($id);

//        $this->addSharePoint($this->id);

        return response()->json(['result' => 1]);//提交成功。
    }

    /**
     * 添加回答课程问题接口。
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function answer(Request $request)
    {
        $id = intval(trim($request->input('lesson_id')));

        if (RegService::verifyLesson($id)) {
            return response()->json(['result' => 2]);//课程不存在。
        }

        $status = $this->addLessonAnswerPoint($this->id, $id);

        //发送回答课程问题行为数据到安客臣。
        $this->behaviorDataLesson($this->id, $id, $status == 1, PointService::LESSON_ANSWER_TYPE_ID);

        return response()->json(['result' => 1]);//提交成功。
    }
}
