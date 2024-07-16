import { Injectable } from "@nestjs/common";
import { ID, RequestContext } from "@vendure/core";
import {
  FetchOptions,
  HttpBaseResponse,
  HttpVectorDeleteReq,
  HttpVectorGetReq,
  HttpVectorInsertReq,
  HttpVectorInsertResponse,
  HttpVectorQueryReq,
  HttpVectorQueryResponse,
  HttpVectorSearchReq,
  HttpVectorSearchResponse,
  HttpVectorUpsertResponse,
} from "@zilliz/milvus2-sdk-node";
import { MilvusService } from "./milvus.service";

@Injectable()
export class MilvusVectorService {
  constructor(private milvusService: MilvusService) {}

  async get(
    params: HttpVectorGetReq,
    options?: FetchOptions,
  ): Promise<HttpVectorQueryResponse> {
    return this.milvusService.apiClient.get(params, options);
  }

  async insert(
    data: HttpVectorInsertReq,
    options?: FetchOptions,
  ): Promise<HttpVectorInsertResponse> {
    return this.milvusService.apiClient.insert(data, options);
  }

  async upsert(
    data: HttpVectorInsertReq,
    options?: FetchOptions,
  ): Promise<HttpVectorUpsertResponse> {
    return this.milvusService.apiClient.upsert(data, options);
  }

  async query(
    data: HttpVectorQueryReq,
    options?: FetchOptions,
  ): Promise<HttpVectorQueryResponse> {
    return this.milvusService.apiClient.query(data, options);
  }

  async search(
    data: HttpVectorSearchReq,
    options?: FetchOptions,
  ): Promise<HttpVectorSearchResponse> {
    return this.milvusService.apiClient.search(data, options);
  }

  async delete(
    data: HttpVectorDeleteReq,
    options?: FetchOptions,
  ): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.delete(data, options);
  }
}
