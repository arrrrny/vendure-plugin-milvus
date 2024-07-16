import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import { Allow, Transaction } from "@vendure/core";
import {
  HttpImportCreateReq,
  HttpImportProgressReq,
  HttpBaseReq,
  HttpImportListResponse,
  HttpImportCreateResponse,
  HttpImportProgressResponse,
} from "@zilliz/milvus2-sdk-node";
import { MilvusImportService } from "../services/milvus-import.service";

@Resolver()
export class MilvusImportAdminResolver {
  constructor(private milvusImportService: MilvusImportService) {}

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusListImportJobs(
    @Args("params") args: HttpBaseReq,
  ): Promise<HttpImportListResponse> {
    return this.milvusImportService.listJobs(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusCreateImportJob(
    @Args("data") args: HttpImportCreateReq,
  ): Promise<HttpImportCreateResponse> {
    return this.milvusImportService.createJob(args);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusGetImportJobProgress(
    @Args("params") args: HttpImportProgressReq,
  ): Promise<HttpImportCreateResponse> {
    return this.milvusImportService.getJobProgress(args);
  }
}
