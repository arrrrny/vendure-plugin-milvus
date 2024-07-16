import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import { Allow, Transaction } from "@vendure/core";
import {
  HttpRoleBaseReq,
  HttpRoleDescribeResponse,
  HttpBaseResponse,
  HttpRolePrivilegeReq,
} from "@zilliz/milvus2-sdk-node";
import { MilvusRoleService } from "../services/milvus-role.service";

@Resolver()
export class MilvusRoleAdminResolver {
  constructor(private milvusRoleService: MilvusRoleService) {}

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusDescribeRole(
    @Args("params") args: HttpRoleBaseReq,
  ): Promise<HttpRoleDescribeResponse> {
    return this.milvusRoleService.describeRole(args);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusListRoles(): Promise<HttpBaseResponse<string[]>> {
    return this.milvusRoleService.listRoles();
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusCreateRole(
    @Args("data") args: HttpRoleBaseReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusRoleService.createRole(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusDropRole(
    @Args("data") args: HttpRoleBaseReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusRoleService.dropRole(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusGrantPrivilegeToRole(
    @Args("data") args: HttpRolePrivilegeReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusRoleService.grantPrivilegeToRole(args);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusRevokePrivilegeFromRole(
    @Args("data") args: HttpRolePrivilegeReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusRoleService.revokePrivilegeFromRole(args);
  }
}
