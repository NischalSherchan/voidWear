import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js'; 
// 👇 Notice the "type" keyword here to satisfy isolatedModules
import { type CreateCollection, type UpdateCollection } from '@voidwear/shared';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CollectionService {
  constructor(private readonly prisma: PrismaService) {}

  

  // 2. FIND ALL
  async findAll() {
    return 'hello'
  }

  
}