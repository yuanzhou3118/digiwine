<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-07-07
 * Time: 16:39
 */

namespace App\Services;

class RegService
{
    /**
     * 手机号正则。
     */
    const MOBILE_REG = '/^1[34578]\d{9}$/';

    const NOTE_GRAPE3_REG = '/^[1-3]$/';

    const NOTE_GRAPE4_REG = '/^[1-4]$/';

    const TOPIC_TAG_REG = '/^([1-5]|999)$/';

    const LESSON_REG = '/^([1-9]|10)$/';

    const NOTE_SORT_REG = '/^(0|1)$/';

    const USER_MERGE_REG = '/^(1|2)$/';

    const JOB_TITLE_REG = '/^1300[1-5]$/';

    /**
     * 性别正则。
     */
    const GENDER_REG = '/^(0|1)$/';

    /**
     * 验证用户merge的类型。
     *
     * @param $mergeType
     * @return bool
     */
    public static function verifyUserMerge($mergeType)
    {
        return !preg_match(self::USER_MERGE_REG, $mergeType);
    }

    /**
     * 验证手机号是否合法。
     *
     * @param $mobile
     * @return bool
     */
    public static function verifyMobile($mobile)
    {
        return !preg_match(self::MOBILE_REG, $mobile);
    }

    /**
     * 验证参数是否合法
     *
     * @param $score
     * @return bool
     */
    public static function verifyNote($score)
    {
        return !preg_match(self::NOTE_GRAPE3_REG, $score);
    }

    /**
     * 验证参数是否合法
     *
     * @param $score
     * @return bool
     */
    public static function verifyNote4($score)
    {
        return !preg_match(self::NOTE_GRAPE4_REG, $score);
    }


    /**
     * 验证课程ID是否合法。
     *
     * @param $lessonId
     * @return bool
     */
    public static function verifyLesson($lessonId)
    {
        return !preg_match(self::LESSON_REG, $lessonId);
    }

    /**
     * 验证tag是否合法。
     *
     * @param $tag
     * @return bool
     */
    public static function verifyTag($tag)
    {
        return !preg_match(self::TOPIC_TAG_REG, $tag);
    }

    /**
     * 验证sort是否合法
     *
     * @param $sort
     * @return bool
     */
    public static function verifySort($sort)
    {
        return !preg_match(self::NOTE_SORT_REG, $sort);
    }

    /**
     * 验证性别是否合法。
     *
     * @param $gender
     * @return bool
     */
    public static function verifyGender($gender)
    {
        return !preg_match(self::GENDER_REG, $gender);
    }

    /**
     * 验证职位是否合法。
     *
     * @param $profession
     * @return bool
     */
    public static function verifyJobTitle($profession)
    {
        return !preg_match(self::JOB_TITLE_REG, $profession);
    }

    /**
     * 验证爱好是否合法。
     *
     * @param $interest
     * @return bool
     */
    public static function verifyInterest($interest)
    {
        $array = explode(',', $interest);

        $raw = ['14001', '14002', '14003', '14004', '14005', '14006', '14007', '14008', '14009', '14010', '14011',
            '14012', '14013',
        ];

        foreach($array as $item)
        {
            if(!in_array($item, $raw)){
                return true;
            }
        }

        return false;
    }
}
