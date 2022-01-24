<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    const ALLOWED_FILE_EXTENSION = ['jpg', 'jpeg', 'png', 'pdf'];

    /**
     * @throws \Exception
     */
    public function handleFile(Request $request): File
    {
        $file = new File();
        $fileNameWithExtension = $request->file('file')->getClientOriginalName();
        $fileExtension = $request->file('file')->getClientOriginalExtension();
        $fileName = pathinfo($fileNameWithExtension, PATHINFO_FILENAME);

        if (in_array(strtolower($fileExtension), self::ALLOWED_FILE_EXTENSION)) {
            $file->file_name = str_replace(' ', '_', $fileName) . '-' . rand() . time() . '.' . $fileExtension;
            $file->file_path = $request->file('file')->storeAs('public/files', $file->file_name);
            $file->file_type = $fileExtension;

            return $file;
        } else {
            throw new \Exception('Invalid file type. Allowed file types: ' . implode(',',self::ALLOWED_FILE_EXTENSION));
        }
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
