import { Test, TestingModule } from '@nestjs/testing';
import { LogService } from './log.service';
import { SearchModule } from '../search/search.module'; // Assuming SearchService is provided by SearchModule

describe('LogService', () => {
  let service: LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SearchModule], // Import the module that provides SearchService
      providers: [LogService],
    }).compile();

    service = module.get<LogService>(LogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
