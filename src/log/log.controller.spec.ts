import { Test, TestingModule } from '@nestjs/testing';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { SearchService } from '../search/search.service';

describe('LogController', () => {
  let controller: LogController;
  let mockLogService: Partial<LogService>;
  let mockSearchService: Partial<SearchService>;

  beforeEach(async () => {
    // Create a mock LogService with all the methods you need to use in your tests
    mockLogService = {
      // Mock all methods of LogService that are used by LogController
      create: jest.fn().mockImplementation((dto) => dto),
      // Add other methods as needed...
    };
    mockSearchService = {
      // Mock all methods of SearchService that are used by LogController
      insertLog: jest.fn().mockImplementation((dto) => dto),
      // Add other methods as needed...
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
      // Provide the mock instead of the actual service
      providers: [
        {
          provide: LogService,
          useValue: mockLogService,
        },
        {
          provide: SearchService,
          useValue: mockSearchService,
        },
      ],
    }).compile();

    controller = module.get<LogController>(LogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
