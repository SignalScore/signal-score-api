import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSignalScore(): string {
    return 'Signal Score API!';
  }
}
