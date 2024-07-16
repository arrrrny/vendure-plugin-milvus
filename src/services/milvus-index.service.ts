import { Injectable } from "@nestjs/common";
import { ID, RequestContext } from "@vendure/core";
import {
  HttpBaseReq,
  HttpBaseResponse,
  HttpIndexBaseReq,
  HttpIndexCreateReq,
  HttpIndexDescribeResponse,
} from "@zilliz/milvus2-sdk-node";
import { MilvusService } from "./milvus.service";

@Injectable()
export class MilvusIndexService {
  constructor(private milvusService: MilvusService) {}

  async createIndex(params: HttpIndexCreateReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.createIndex(params);
  }

  async describeIndex(
    params: HttpIndexBaseReq,
  ): Promise<HttpIndexDescribeResponse> {
    return this.milvusService.apiClient.describeIndex(params);
  }

  async dropIndex(params: HttpIndexBaseReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.dropIndex(params);
  }

  async listIndexes(params: HttpBaseReq): Promise<HttpBaseResponse<string[]>> {
    return this.milvusService.apiClient.listIndexes(params);
  }
}
