<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-07-11
 * Time: 16:32
 */

namespace App\Traits;

use App\Models\Score;
use App\Services\CommonService;
use App\Services\PointService;
use App\Services\SessionService;
use Exception;
use Log;
use DB;

trait PointTrait
{
    /**
     * 添加用户积分处理。
     *
     * @param $userId
     * @param $scoreType
     * @param $typeId
     * @param $getScore
     * @param $sort
     * @param $pointLimit
     * @return int
     */
    private function addPoint($userId, $scoreType, $typeId, $getScore, $sort, $pointLimit)
    {
        $query = DB::table('scores')->where('user_id', $userId)
            ->where('score_type', $scoreType);

        if ($sort > 0) {
            $query = $query->where('sort', $sort);
        }

        if ($query->count() >= $pointLimit) {
            return 0;
        }

        $score = new Score();

        $score->score_type = $scoreType;
        $score->user_id = $userId;
        $score->score = $getScore;
        $score->type_id = $typeId;
        $score->sort = $sort;

        try {
            $score->save();

            return 1;
        } catch (Exception $e) {
            Log::error('add point exception,userId:' . $userId . ',scoreType:' . $scoreType . ',typeId:' .
                $typeId . ',exception:' . $e->getMessage());

            return -1;
        }
    }

    /**
     * 添加注册积分。
     *
     * @param $userId
     * @return int
     */
    protected function addRegisterPoint($userId)
    {
        return $this->addPoint($userId,
            PointService::REGISTER_TYPE_ID,
            PointService::COMMON_TYPE_ID,
            PointService::REGISTER,
            PointService::COMMON_SORT,
            PointService::COMMON_COUNT_LIMIT);
    }

    /**
     * 添加更新用户头像积分。
     *
     * @param $userId
     * @return int
     */
    protected function addUpdateUserHeadUrlPoint($userId)
    {
        return $this->addPoint($userId,
            PointService::UPDATE_HEAD_URL_TYPE_ID,
            PointService::COMMON_TYPE_ID,
            PointService::UPDATE_HEAD_URL,
            PointService::COMMON_SORT,
            PointService::COMMON_COUNT_LIMIT);
    }

    /**
     * 添加用户绑定手机或微信积分。
     *
     * @param $userId
     * @return int
     */
    protected function addUpdateUserBindingPoint($userId)
    {
        return $this->addPoint($userId,
            PointService::BINDING_MOBILE_OR_WECHAT_TYPE_ID,
            PointService::COMMON_TYPE_ID,
            PointService::BINDING_MOBILE_OR_WECHAT,
            PointService::COMMON_SORT,
            PointService::COMMON_COUNT_LIMIT);
    }

    /**
     * 添加完善用户信息积分。
     *
     * @param $userId
     * @return int
     */
    protected function addUpdateUserInfoPoint($userId)
    {
        return $this->addPoint($userId,
            PointService::UPDATE_USER_INFO_TYPE_ID,
            PointService::COMMON_TYPE_ID,
            PointService::UPDATE_USER_INFO,
            PointService::COMMON_SORT,
            PointService::COMMON_COUNT_LIMIT);
    }

    /**
     * 添加课程看视频积分。
     *
     * @param $userId
     * @param $lessonId
     * @return int
     */
    protected function addLessonVideoPoint($userId, $lessonId)
    {
        return $this->addPoint($userId,
            PointService::LESSON_VIDEO_TYPE_ID,
            PointService::COMMON_TYPE_ID,
            PointService::LESSON_VIDEO,
            $lessonId,
            PointService::COMMON_COUNT_LIMIT);
    }

    /**
     * 添加回答课程问题积分。
     *
     * @param $userId
     * @param $lessonId
     * @return int
     */
    protected function addLessonAnswerPoint($userId, $lessonId)
    {
        return $this->addPoint($userId,
            PointService::LESSON_ANSWER_TYPE_ID,
            PointService::COMMON_TYPE_ID,
            PointService::LESSON_ANSWER,
            $lessonId,
            PointService::LESSON_ANSWER_COUNT_LIMIT);
    }

    /**
     * 添加课程评论积分。
     *
     * @param $userId
     * @param $lessonId
     * @return int
     */
    protected function addLessonReviewPoint($userId, $lessonId)
    {
        return $this->addPoint($userId,
            PointService::LESSON_REVIEW_TYPE_ID,
            $lessonId,
            PointService::LESSON_REVIEW,
            CommonService::getDay(),
            PointService::LESSON_REVIEW_COUNT_LIMIT);
    }

    /**
     * 添加分享积分。
     *
     * @param $userId
     * @return int
     */
    protected function addSharePoint($userId)
    {
        return $this->addPoint($userId,
            PointService::SHARE_TYPE_ID,
            PointService::COMMON_TYPE_ID,
            PointService::SHARE,
            CommonService::getDay(),
            PointService::SHARE_COUNT_LIMIT);
    }

    /**
     * 添加创建话题积分。
     *
     * @param $userId
     * @param $topicId
     * @param $createdAt
     * @return int
     */
    protected function addCreateTopicPoint($userId, $topicId, $createdAt)
    {
        return $this->addPoint($userId,
            PointService::CREATE_TOPIC_TYPE_ID,
            $topicId,
            PointService::CREATE_TOPIC,
            CommonService::getDay($createdAt),
            PointService::CREATE_TOPIC_COUNT_LIMIT);
    }

    /**
     * 添加回复话题积分。
     *
     * @param $userId
     * @param $topicId
     * @param $createdAt
     * @return int
     */
    protected function addTopicAnswerPoint($userId, $topicId, $createdAt)
    {
        return $this->addPoint($userId,
            PointService::TOPIC_ANSWER_TYPE_ID,
            $topicId,
            PointService::TOPIC_ANSWER,
            CommonService::getDay($createdAt),
            PointService::TOPIC_ANSWER_COUNT_LIMIT);
    }

    /**
     * 添加创建笔记积分。
     *
     * @param $userId
     * @param $noteId
     * @param $createdAt
     * @return int
     */
    protected function addCreateNotePoint($userId, $noteId, $createdAt)
    {
        return $this->addPoint($userId,
            PointService::NOTE_TYPE_ID,
            $noteId,
            PointService::NOTE,
            CommonService::getDay($createdAt),
            PointService::NOTE_COUNT_LIMIT);
    }

    /**
     * 根据用户id查询用户的总积分。
     *
     * @param $userId
     * @return float
     */
    protected function getTotalPointsByUserId($userId)
    {
        return (float)Score::whereUserId($userId)->sum('score');
    }

    /**
     * 获取个人的积分总数和积分等级。
     *
     * @param $userId
     * @return array
     */
    protected function getPointAndLevelByUserId($userId)
    {
        $points = $this->getTotalPointsByUserId($userId);

        return ['points' => $points, 'level' => PointService::getLevel($points)];
    }

    /**
     * 查询我的积分记录数。
     *
     * @param $userId
     * @return int
     */
    protected function getPointsCountByUserId($userId)
    {
        return Score::whereUserId($userId)->count();
    }

    /**
     * 查询我的积分明细信息。
     *
     * @param $userId
     * @param $pageIndex
     * @param $pageSize
     * @return array
     */
    protected function queryPointsByUserId($userId, $pageIndex, $pageSize)
    {
        $count = $this->getPointsCountByUserId($userId);

        if ($count == 0) {
            return ['result' => 0, 'total_count' => $count];//没有数据。
        }

        if (($pageIndex - 1) * $pageSize >= $count) {
            return ['result' => 3, 'total_count' => $count];//超出分页数。
        }

        $data = Score::whereUserId($userId)
            ->orderBy('created_at', 'desc')
            ->skip(($pageIndex - 1) * $pageSize)
            ->take($pageSize)
            ->get([
                'score_type',
                'score',
                'created_at',
            ]);

        $result = [];

        foreach ($data as $item) {
            array_push($result, [
                'content' => e(PointService::getContent($item->score_type)),
                'created_at' => date('Y/m/d', strtotime($item->created_at)),
                'point' => '+' . $item->score
            ]);
        }

        return ['result' => 1, 'data' => $result, 'total_count' => $count];
    }

    /**
     * 验证两用户总积分数大小。
     *
     * @param $userId
     * @param $checkUserId
     * @return bool
     */
    protected function compareUsersPoint($userId, $checkUserId)
    {
         return $this->getTotalPointsByUserId($userId) >= $this->getTotalPointsByUserId($checkUserId);
    }
}
