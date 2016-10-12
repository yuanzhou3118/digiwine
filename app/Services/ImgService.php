<?php
/**
 * Created by PhpStorm.
 * User: xinhuang1
 * Date: 2016-07-19
 * Time: 12:21
 */

namespace App\Services;

class ImgService
{
    /**
     * 上传base64格式图片。
     *
     * @param $filename
     * @param $data
     * @return bool
     */
    public static function upload($filename, $data)
    {
        return !file_put_contents($filename, $data);
    }

    /**
     * 验证上传图片。
     *
     * @param $data
     * @return array
     */
    public static function checkBase64Img($data)
    {
        $result = explode(';', $data);

        if (count($result) != 2) {
            return ['result' => 0];
        }

        $prefix = explode('/', $result[0]);

        if (count($prefix) != 2) {
            return ['result' => 0];
        }

        $imgSuffix = '';

        if (strcasecmp($prefix[1], 'png') == 0) {
            $imgSuffix = '.png';
        } elseif (strcasecmp($prefix[1], 'jpeg') == 0) {
            $imgSuffix = '.jpg';
        }

        if (strlen($imgSuffix) == 0) {
            return ['result' => 0];
        }

        $imgData = explode(',', $result[1]);

        if (count($imgData) != 2) {
            return ['result' => 0];
        }

        $imgRawData = base64_decode($imgData[1]);

        if (strlen($imgRawData) == 0 || strlen($imgRawData) > 1000 * 1024) {//最大3M。
            return ['result' => 0];
        }

        return ['result' => 1, 'img_suffix' => $imgSuffix, 'img_data' => $imgRawData];
    }
}