import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import { Allow, Ctx, RequestContext, Transaction } from "@vendure/core";
import {
  HttpBaseResponse,
  HttpVectorDeleteReq,
  HttpVectorGetReq,
  HttpVectorInsertReq,
  HttpVectorInsertResponse,
  HttpVectorQueryReq,
  HttpVectorQueryResponse,
  HttpVectorSearchReq,
  HttpVectorSearchResponse,
  HttpVectorUpsertResponse,
} from "@zilliz/milvus2-sdk-node";
import { MilvusVectorService } from "../services/milvus-vector.service";

@Resolver()
export class MilvusVectorAdminResolver {
  constructor(private milvusVectorService: MilvusVectorService) {}

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusGetVector(
    @Args("params") args: HttpVectorGetReq,
  ): Promise<HttpVectorQueryResponse> {
    return this.milvusVectorService.get(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusInsertVector(
    @Args("data") args: HttpVectorInsertReq,
  ): Promise<HttpVectorInsertResponse> {
    return this.milvusVectorService.insert(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusUpsertVector(
    @Args("data") args: HttpVectorInsertReq,
  ): Promise<HttpVectorUpsertResponse> {
    return this.milvusVectorService.upsert(args);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusQueryVector(
    @Args("params") args: HttpVectorQueryReq,
  ): Promise<HttpVectorQueryResponse> {
    return this.milvusVectorService.query(args);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusSearchVector(
    @Args("params") args: HttpVectorSearchReq,
  ): Promise<HttpVectorSearchResponse> {
    return this.milvusVectorService.search(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusDeleteVector(
    @Args("data") args: HttpVectorDeleteReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusVectorService.delete(args);
  }
}
