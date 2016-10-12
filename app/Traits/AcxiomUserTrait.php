<?php
/**
 * Created by PhpStorm.
 * User: xinkui.huang
 * Date: 2016-07-12
 * Time: 15:56
 */

namespace App\Traits;

use Log;
use App\Services\VendorService;

trait AcxiomUserTrait
{
    /**
     * 提交用户数据到acxiom。
     *
     * @param array $data
     */
    protected function sendUserDataToAcxiom(array $data)
    {
        $response = VendorService::callAcxiomApi(VendorService::getUserUrl(), $data);

        if (!is_array($response) || !array_key_exists('RETURN_CODE', $response) || $response['RETURN_CODE'] != '000') {
            Log::error('send acxiom user info fail,user_id:' . $data[VendorService::THIRD_PARTY_ID]);
        }
    }
}
