import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import { Allow, Transaction } from "@vendure/core";
import {
  HttpBaseResponse,
  HttpCollectionDescribeResponse,
  HttpCollectionHasResponse,
  HttpCollectionListResponse,
  HttpCollectionStatisticsResponse,
  HttpCollectionLoadStateResponse,
  HttpBaseReq,
  HttpCollectionRenameReq,
  HttpCollectionCreateReq,
} from "@zilliz/milvus2-sdk-node";
import { MilvusCollectionService } from "../services/milvus-collection.service";

@Resolver()
export class MilvusCollectionAdminResolver {
  constructor(private milvusCollectionService: MilvusCollectionService) {}

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusListCollections(
    @Args("params") args?: HttpBaseReq,
  ): Promise<HttpCollectionListResponse> {
    return this.milvusCollectionService.list(args);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusDescribeCollection(
    @Args("params") args: HttpBaseReq,
  ): Promise<HttpCollectionDescribeResponse> {
    return this.milvusCollectionService.describe(args);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusHasCollection(
    @Args("params") args: Required<HttpBaseReq>,
  ): Promise<HttpCollectionHasResponse> {
    return this.milvusCollectionService.has(args);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusGetCollectionStatistics(
    @Args("params") args: HttpBaseReq,
  ): Promise<HttpCollectionStatisticsResponse> {
    return this.milvusCollectionService.getStatistics(args);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusGetCollectionLoadState(
    @Args("params") args: HttpBaseReq,
  ): Promise<HttpCollectionLoadStateResponse> {
    return this.milvusCollectionService.getLoadState(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusCreateCollection(
    @Args("data") args: HttpCollectionCreateReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusCollectionService.create(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusDropCollection(
    @Args("data") args: HttpBaseReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusCollectionService.drop(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusRenameCollection(
    @Args("data") args: HttpCollectionRenameReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusCollectionService.rename(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusLoadCollection(
    @Args("data") args: HttpBaseReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusCollectionService.load(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusReleaseCollection(
    @Args("data") args: HttpBaseReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusCollectionService.release(args);
  }
}
