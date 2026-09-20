import { Controller, Get } from '@nestjs/common';
import { PRODUCT_STATUS, type Product } from '@voidwear/shared';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('products')
  getProducts(): Product[] {
    return [
      { id: '1', name: 'Shirt', price: 20, status: PRODUCT_STATUS.ACTIVE },
      { id: '2', name: 'Mug', price: 8, status: PRODUCT_STATUS.DRAFT },
    ];
  }
}