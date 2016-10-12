<?php

namespace App\Http\Middleware;

use App\Services\CommonService;
use Closure;
use App\Services\SessionService;

class UserAuth
{
    /**
     * 验证用户登陆。
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (SessionService::getUser() < 1) {
            CommonService::setCrossDomain();

            return response()->json(['result' => 99], 200, ['Content-Type' => CommonService::CONTENT_TYPE_JSON]);
        }

        return $next($request);
    }
}
