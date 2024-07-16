import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import { Allow, Transaction } from "@vendure/core";
import {
  HttpAliasBaseReq,
  HttpAliasCreateReq,
  HttpAliasDescribeReq,
  HttpAliasDescribeResponse,
  HttpAliasDropReq,
  HttpBaseResponse,
} from "@zilliz/milvus2-sdk-node";
import { MilvusAliasService } from "../services/milvus-alias.service";

@Resolver()
export class MilvusAliasAdminResolver {
  constructor(private milvusAliasService: MilvusAliasService) {}

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusListAliases(
    @Args("params") args: HttpAliasBaseReq,
  ): Promise<HttpBaseResponse<string[]>> {
    return this.milvusAliasService.list(args);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusDescribeAlias(
    @Args("params") args: HttpAliasDescribeReq,
  ): Promise<HttpAliasDescribeResponse> {
    return this.milvusAliasService.describe(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusCreateAlias(
    @Args("data") args: HttpAliasCreateReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusAliasService.create(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusDropAlias(
    @Args("data") args: HttpAliasDropReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusAliasService.drop(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusAlterAlias(
    @Args("data") args: HttpAliasCreateReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusAliasService.alter(args);
  }
}
