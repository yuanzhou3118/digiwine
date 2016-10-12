<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Artisan;
use Log;
use Exception;

class HelpCenterController extends Controller
{
    /**
     * 执行数据库迁移操作。
     *
     * @return \Illuminate\Http\Response
     */
    public function migrate()
    {
        $result = '执行失败';

        try {
            Artisan::call('migrate', ['--force' => true]);
            $result = '执行成功';
        } catch (Exception $e) {
            Log::error('exec migrate exception,exception:' . $e->getMessage());
        }

        return view('admin.result', ['result' => $result]);
    }

    /**
     * 系统设置页面。
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function appSetting()
    {
        return view('admin.setting');
    }

    /**
     * 执行优化操作。
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function optimize()
    {
        $result = '执行失败';

        try {
            Artisan::call('clear-compiled');
            Artisan::call('route:cache');
            Artisan::call('config:cache');
            Artisan::call('optimize', ['--force' => true]);
            $result = '执行成功';
        } catch (Exception $e) {
            Log::error('exec Optimize exception,exception:' . $e->getMessage());
        }

        return view('admin.result', ['result' => $result]);
    }

    /**
     * 执行初始化数据。
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function seed()
    {
        $result = '执行失败';

        try {
            Artisan::call('db:seed', ['--force' => true]);
            $result = '执行成功';
        } catch (Exception $e) {
            Log::error('exec migrate exception,exception:' . $e->getMessage());
        }

        return view('admin.result', ['result' => $result]);
    }

    /**
     * 重置上一次数据库迁移操作。
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function migrateReset()
    {
        $result = '执行失败';

        try {
            Artisan::call('migrate:rollback', ['--force' => true]);
            $result = '执行成功';
        } catch (Exception $e) {
            Log::error('exec migrate exception,exception:' . $e->getMessage());
        }

        return view('admin.result', ['result' => $result]);
    }

    /**
     * 清空缓存。
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function clearCache()
    {
        $result = '执行失败';

        try {
            Artisan::call('cache:clear');
            $result = '执行成功';
        } catch (Exception $e) {
            Log::error('exec migrate exception,exception:' . $e->getMessage());
        }

        return view('admin.result', ['result' => $result]);
    }
}
