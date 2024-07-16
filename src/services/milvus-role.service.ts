import { Injectable } from "@nestjs/common";
import { ID, RequestContext } from "@vendure/core";
import {
  HttpBaseResponse,
  HttpRoleBaseReq,
  HttpRoleDescribeResponse,
  HttpRolePrivilegeReq,
} from "@zilliz/milvus2-sdk-node";
import { MilvusService } from "./milvus.service";

@Injectable()
export class MilvusRoleService {
  constructor(private milvusService: MilvusService) {}

  async createRole(params: HttpRoleBaseReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.createRole(params);
  }

  async dropRole(params: HttpRoleBaseReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.dropRole(params);
  }

  async describeRole(
    params: HttpRoleBaseReq,
  ): Promise<HttpRoleDescribeResponse> {
    return this.milvusService.apiClient.describeRole(params);
  }

  async listRoles(): Promise<HttpBaseResponse<string[]>> {
    return this.milvusService.apiClient.listRoles();
  }

  async grantPrivilegeToRole(
    params: HttpRolePrivilegeReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.grantPrivilegeToRole(params);
  }

  async revokePrivilegeFromRole(
    params: HttpRolePrivilegeReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.revokePrivilegeFromRole(params);
  }
}
