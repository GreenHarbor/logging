import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://elasticsearch-795535539.ap-southeast-1.elb.amazonaws.com/',
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
