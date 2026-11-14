import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';


@Global() // 👈 This is what makes it global
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 You must export it
})
export class PrismaModule {}