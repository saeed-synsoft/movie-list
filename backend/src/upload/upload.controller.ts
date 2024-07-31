import { Movie } from './../models/movie.entity';
import { Controller, Post, HttpException, HttpStatus, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth('Authorization')
@ApiTags('Upload')
@Controller('api/uploadygygyu')
export class UploadController {
  constructor() { }
  @Post('')
  @UseInterceptors(FilesInterceptor('file', 1)) // 'images' is the field name, 5 is the maximum number of files allowed
  async uploadFiles(@UploadedFiles() file) {
    try {
      if (!file || file.length === 0) {
        throw new HttpException('No files uploaded', HttpStatus.BAD_REQUEST);
      } else if (file.length > 5) {
        throw new HttpException('You can upload a maximum of 5 images', HttpStatus.BAD_REQUEST);
      }

      // return file
      const image = file.map(file => ({ image: file.filename }));
      return { message: "file uplaoded success", statusCode: HttpStatus.CREATED, files: image };
    } catch (error) {
      // If it's a known error type, rethrow it
      if (error instanceof HttpException) {
        throw error;
      } else {
        // Handle unexpected errors
        console.error("Unexpected error during file upload:", error);
        throw new HttpException('An unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
