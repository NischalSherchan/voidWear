import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { type CreateCollection, type UpdateCollection } from '@voidwear/shared';
import { PrismaService } from '../prisma/prisma.service.js';

const maxCollection = 5;
@Injectable()
export class CollectionService {
  constructor(private readonly prisma: PrismaService) {}

  async postCollection(collection: CreateCollection) {
    const limit = await this.prisma.collection.count();
    if (limit >= maxCollection) {
      throw new BadRequestException({
        message: `Only ${maxCollection} collections are allowed`,
        errorCode: 'COLLECTION_LIMIT_REACHED',
      });
    }
    try {
      return await this.prisma.collection.create({ data: collection });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException({
          message: 'A collection with this slug already exists',
          errorCode: 'SLUG_ALREADY_EXISTS',
        });
      }
      throw error;
    }
  }

  async updateCollection(id: string, data: UpdateCollection) {
    try {
      return await this.prisma.collection.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException({
            message: `Collection with id ${id} does not exist`,
            errorCode: 'COLLECTION_NOT_FOUND',
          });
        }
        if (error.code === 'P2002') {
          throw new ConflictException({
            message: 'A collection with this slug already exists',
            errorCode: 'SLUG_ALREADY_EXISTS',
          });
        }
      }
      throw error;
    }
  }

  async deleteCollection(id: string) {
    try {
      return await this.prisma.collection.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException({
          message: `Collection with id ${id} not found.`,
          errorCode: 'COLLECTION_NOT_FOUND',
        });
      }

      throw error;
    }
  }

  findAll() {
    return this.prisma.collection.findMany();
  }

 findActive() {
  return this.prisma.collection.findMany({
    where: { isActive: true },
    orderBy: {createdAt : "asc"}
  });
}
}
