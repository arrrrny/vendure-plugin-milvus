import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import { Allow, Transaction } from "@vendure/core";
import {
  HttpIndexCreateReq,
  HttpIndexDescribeResponse,
  HttpBaseResponse,
  HttpIndexBaseReq,
  HttpBaseReq,
} from "@zilliz/milvus2-sdk-node";
import { MilvusIndexService } from "../services/milvus-index.service";

@Resolver()
export class MilvusIndexAdminResolver {
  constructor(private milvusIndexService: MilvusIndexService) {}

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusDescribeIndex(
    @Args("params") args: HttpIndexBaseReq,
  ): Promise<HttpIndexDescribeResponse> {
    return this.milvusIndexService.describeIndex(args);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusListIndexes(
    @Args("params") args: HttpBaseReq,
  ): Promise<HttpBaseResponse<string[]>> {
    return this.milvusIndexService.listIndexes(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusCreateIndex(
    @Args("data") args: HttpIndexCreateReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusIndexService.createIndex(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusDropIndex(
    @Args("data") args: HttpIndexBaseReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusIndexService.dropIndex(args);
  }
}
