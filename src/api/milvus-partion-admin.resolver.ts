import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import { Allow, Transaction } from "@vendure/core";
import {
  HttpBaseReq,
  HttpPartitionBaseReq,
  HttpPartitionListReq,
  HttpPartitionHasResponse,
  HttpPartitionStatisticsResponse,
  HttpBaseResponse,
} from "@zilliz/milvus2-sdk-node";
import { MilvusPartionService } from "../services/milvus-partion.service";

@Resolver()
export class MilvusPartionAdminResolver {
  constructor(private milvusPartionService: MilvusPartionService) {}

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusListPartitions(
    @Args("params") args: HttpBaseReq,
  ): Promise<HttpBaseResponse<string[]>> {
    return this.milvusPartionService.list(args);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusHasPartition(
    @Args("params") args: HttpPartitionBaseReq,
  ): Promise<HttpPartitionHasResponse> {
    return this.milvusPartionService.has(args);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusGetPartitionStatistics(
    @Args("params") args: HttpPartitionBaseReq,
  ): Promise<HttpPartitionStatisticsResponse> {
    return this.milvusPartionService.getStatistics(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusCreatePartition(
    @Args("data") args: HttpPartitionBaseReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusPartionService.create(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusDropPartition(
    @Args("data") args: HttpPartitionBaseReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusPartionService.drop(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusLoadPartitions(
    @Args("data") args: HttpPartitionListReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusPartionService.load(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusReleasePartitions(
    @Args("data") args: HttpPartitionListReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusPartionService.release(args);
  }
}
