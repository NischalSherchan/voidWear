import { Module } from '@nestjs/common';
// Note: If this file is in apps/backend/src/collection/, use './' to find the service and controller in the same folder.
import { CollectionService } from './collection.service.js';
import { CollectionController } from './collection.controller.js';

@Module({
  providers: [CollectionService],
  controllers: [CollectionController]
})
export class CollectionModule {}