import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

// 👇 Note the './' instead of '../' because app.module.ts is in the src root
import { CollectionModule } from './collection/collection.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    PrismaModule, 
    CollectionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}