import { Injectable } from "@nestjs/common";
import { ID, RequestContext } from "@vendure/core";
import {
  DataType,
  HttpBaseReq,
  HttpBaseResponse,
  HttpCollectionCreateReq,
  HttpCollectionDescribeResponse,
  HttpCollectionHasResponse,
  HttpCollectionListReq,
  HttpCollectionListResponse,
  HttpCollectionLoadStateReq,
  HttpCollectionLoadStateResponse,
  HttpCollectionRenameReq,
  HttpCollectionStatisticsResponse,
} from "@zilliz/milvus2-sdk-node";
import { MilvusService } from "./milvus.service";

@Injectable()
export class MilvusCollectionService {
  constructor(private milvusService: MilvusService) {}

  async create(input: HttpCollectionCreateReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.createCollection(input);
  }

  async describe(params: HttpBaseReq): Promise<HttpCollectionDescribeResponse> {
    return this.milvusService.apiClient.describeCollection(params);
  }

  async drop(params: HttpBaseReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.dropCollection(params);
  }

  async list(
    params?: HttpCollectionListReq,
  ): Promise<HttpCollectionListResponse> {
    return this.milvusService.apiClient.listCollections(params);
  }

  async has(params: Required<HttpBaseReq>): Promise<HttpCollectionHasResponse> {
    return this.milvusService.apiClient.hasCollection(params);
  }

  async rename(params: HttpCollectionRenameReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.renameCollection(params);
  }

  async getStatistics(
    params: HttpBaseReq,
  ): Promise<HttpCollectionStatisticsResponse> {
    return this.milvusService.apiClient.getCollectionStatistics(params);
  }

  async load(params: HttpBaseReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.loadCollection(params);
  }

  async release(params: HttpBaseReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.releaseCollection(params);
  }

  async getLoadState(
    params: HttpCollectionLoadStateReq,
  ): Promise<HttpCollectionLoadStateResponse> {
    return this.milvusService.apiClient.getCollectionLoadState(params);
  }
}
