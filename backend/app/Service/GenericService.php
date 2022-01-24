<?php

namespace App\Service;

use App\Http\Controllers\FileController;

class GenericService
{
    /**
     * @throws \Exception
     */
    public function delete($model) {
        if ($model->file()->exists()) {
            $fileController = new FileController();
            $file = $model->load('file');
            $file = $file['file'];
            $fileController->deleteFile($file);
            $model->file()->delete();
        }
        $model->companies()->detach();
        $model->address()->delete();

        $model->delete();
    }
}
