import { Injectable } from "@nestjs/common";
import {
  HttpUserBaseReq,
  HttpUserCreateReq,
  HttpUserUpdatePasswordReq,
  HttpBaseResponse,
  HttpUserRoleReq,
} from "@zilliz/milvus2-sdk-node";
import { MilvusService } from "./milvus.service";

@Injectable()
export class MilvusUserService {
  constructor(private milvusService: MilvusService) {}

  async create(input: HttpUserCreateReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.createUser(input);
  }

  async describe(params: HttpUserBaseReq): Promise<HttpBaseResponse<string[]>> {
    return this.milvusService.apiClient.describeUser(params);
  }

  async drop(params: HttpUserBaseReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.dropUser(params);
  }

  async list(): Promise<HttpBaseResponse<string[]>> {
    return this.milvusService.apiClient.listUsers();
  }

  async updatePassword(
    params: HttpUserUpdatePasswordReq,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.updateUserPassword(params);
  }

  async grantRole(params: HttpUserRoleReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.grantRoleToUser(params);
  }

  async revokeRole(params: HttpUserRoleReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.revokeRoleFromUser(params);
  }
}
