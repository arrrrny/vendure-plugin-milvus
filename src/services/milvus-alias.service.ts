import { Injectable } from "@nestjs/common";
import {
  HttpAliasBaseReq,
  HttpAliasCreateReq,
  HttpAliasDescribeReq,
  HttpAliasDescribeResponse,
  HttpAliasDropReq,
  HttpBaseResponse,
} from "@zilliz/milvus2-sdk-node";
import { MilvusService } from "./milvus.service";

@Injectable()
export class MilvusAliasService {
  constructor(private milvusService: MilvusService) {}

  async create(input: HttpAliasCreateReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.createAlias(input);
  }

  async describe(
    params: HttpAliasDescribeReq,
  ): Promise<HttpAliasDescribeResponse> {
    return this.milvusService.apiClient.describeAlias(params);
  }

  async drop(params: HttpAliasDropReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.dropAlias(params);
  }

  async list(params: HttpAliasBaseReq): Promise<HttpBaseResponse<string[]>> {
    return this.milvusService.apiClient.listAliases(params);
  }

  async alter(params: HttpAliasCreateReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.alterAlias(params);
  }
}
