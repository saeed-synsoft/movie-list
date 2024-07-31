import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { AuthService } from 'src/auth/auth.service';
@Module({
  controllers: [UploadController],
  providers: [AuthService],
  exports: []

})
export class UploadModule { }


