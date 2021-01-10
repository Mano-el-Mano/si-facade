import { Module, OnModuleInit } from '@nestjs/common';
import { UserSoapService } from './soap.service';

@Module({
  providers: [UserSoapService],
  exports: [UserSoapService],
})
export class SoapModule implements OnModuleInit {
  async onModuleInit() {}
}
