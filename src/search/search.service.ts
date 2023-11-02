import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateLogDto } from 'src/log/dto/create-log.dto';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async insertLog(createLogDto: CreateLogDto): Promise<any> {
    const { log_level, detail, date } = createLogDto;
    return this.elasticsearchService.index({
      index: 'logs', // Replace with your index name
      body: {
        log_level,
        detail,
        date,
      },
    });
  }

  async findByLogLevel(logLevel: string): Promise<any> {
    const response = await this.elasticsearchService.search({
      index: 'logs', // Replace with your index name
      body: {
        query: {
          match: {
            log_level: logLevel,
          },
        },
      },
    });

    const hits = response.hits.hits;

    return hits.map((hit) => hit._source);
  }
}
