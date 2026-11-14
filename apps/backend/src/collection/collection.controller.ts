import { 
  Controller, Get, Post, Body, Patch, Param, Delete, UsePipes 
} from '@nestjs/common';

import { 
  CreateCollectionSchema, 
  type CreateCollection, 
  type UpdateCollection 
} from '@voidwear/shared';
import { CollectionService } from './collection.service.js';
import { ZodValidationPipe } from '../common/pipe/zod-validation.pipe.js';


@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

 
}