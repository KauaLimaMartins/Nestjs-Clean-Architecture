import { Injectable } from '@nestjs/common';
import { EnvConfig } from './env-config.interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements EnvConfig {
  public constructor(private configService: ConfigService) {}

  public getAppPort(): number {
    return Number(this.configService.get<number>('PORT'));
  }

  public getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }
}
