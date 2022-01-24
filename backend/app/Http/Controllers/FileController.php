<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Mockery\Exception;

class FileController extends Controller
{
    public function handleFile(Request $request) {
        $file = new File();
        $fileNameWithExtension = $request->file('file')->getClientOriginalName();
        $fileExtension = $request->file('file')->getClientOriginalExtension();
        $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);
        $file->file_name = str_replace(' ', '_', $fileName) . '-' . rand() . time() . '.' . $fileExtension;
        $file->file_path = $request->file('file')->storeAs('public/files', $file->file_name);
        $file->file_type = $fileExtension;

        return $file;
    }

    /**
     * @throws \Exception
     */
    public function deleteFile($file)
    {
        if (!Storage::delete($file->file_path)) {
            throw new \Exception("Error trying to delete the file");
        }
    }
}
