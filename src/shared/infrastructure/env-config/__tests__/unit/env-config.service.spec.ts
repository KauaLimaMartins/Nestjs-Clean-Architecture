import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { EnvConfigModule } from '../../env-config.module';

describe('EnvConfigService unit tests', () => {
  let sut: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [EnvConfigService],
    }).compile();

    sut = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('environment variable PORT', () => {
    it('should return the environment variable PORT', () => {
      expect(sut.getAppPort()).toBe(3000);
    });
  });

  describe('environment variable NODE_ENV', () => {
    it('should return the variable NODE_ENV of test', () => {
      expect(sut.getNodeEnv()).toBe('test');
    });

    it('should not return the variable NODE_ENV of development', () => {
      expect(sut.getNodeEnv()).not.toBe('development');
    });

    it('should not return the variable NODE_ENV of production', () => {
      expect(sut.getNodeEnv()).not.toBe('production');
    });
  });
});
