import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import {
  CreateCollectionSchema,
  UpdateCollectionSchema,
  type CreateCollection,
  type UpdateCollection,
} from '@voidwear/shared';
import { CollectionService } from './collection.service.js';
import { ZodValidationPipe } from '../common/pipe/zod-validation.pipe.js';
import { ParseCuidPipe } from '../common/pipe/cuidPipe.js';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  @Post()
  postCollection(
    @Body(new ZodValidationPipe(CreateCollectionSchema))
    collection: CreateCollection,
  ) {
    return this.collectionService.postCollection(collection);
  }
  @Get('active')
  findActive() {
    return this.collectionService.findActive();
  }

  @Patch(':id')
  updateCollection(
    @Param('id', ParseCuidPipe) id: string,
    @Body(new ZodValidationPipe(UpdateCollectionSchema))
    updateCollection: UpdateCollection,
  ) {
    return this.collectionService.updateCollection(id, updateCollection);
  }

  @Delete(':id')
  deleteCollection(@Param('id', ParseCuidPipe) id: string) {
    return this.collectionService.deleteCollection(id);
  }
}
