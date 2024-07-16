import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import { Allow, Transaction } from "@vendure/core";
import {
  HttpUserBaseReq,
  HttpUserCreateReq,
  HttpUserUpdatePasswordReq,
  HttpBaseResponse,
  HttpUserRoleReq,
} from "@zilliz/milvus2-sdk-node";
import { MilvusUserService } from "../services/milvus-user.service";

@Resolver()
export class MilvusUserAdminResolver {
  constructor(private milvusUserService: MilvusUserService) {}

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusDescribeUser(
    @Args("params") args: HttpUserBaseReq,
  ): Promise<HttpBaseResponse<string[]>> {
    return this.milvusUserService.describe(args);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusListUsers(): Promise<HttpBaseResponse<string[]>> {
    return this.milvusUserService.list();
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusCreateUser(
    @Args("data") args: HttpUserCreateReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusUserService.create(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusDropUser(
    @Args("data") args: HttpUserBaseReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusUserService.drop(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusUpdateUserPassword(
    @Args("data") args: HttpUserUpdatePasswordReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusUserService.updatePassword(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusGrantRoleToUser(
    @Args("data") args: HttpUserRoleReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusUserService.grantRole(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusRevokeRoleFromUser(
    @Args("data") args: HttpUserRoleReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusUserService.revokeRole(args);
  }
}
