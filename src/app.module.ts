import { Module } from '@nestjs/common';
import { V1Module } from './v1/app.v1.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), V1Module],
})
export class AppModule {}
