import { Injectable } from "@nestjs/common";
import {
  HttpBaseReq,
  HttpPartitionBaseReq,
  HttpPartitionListReq,
  HttpPartitionHasResponse,
  HttpPartitionStatisticsResponse,
  HttpBaseResponse,
} from "@zilliz/milvus2-sdk-node";
import { MilvusService } from "./milvus.service";

@Injectable()
export class MilvusPartionService {
  constructor(private milvusService: MilvusService) {}

  async create(input: HttpPartitionBaseReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.createPartition(input);
  }

  async drop(params: HttpPartitionBaseReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.dropPartition(params);
  }

  async list(params: HttpBaseReq): Promise<HttpBaseResponse<string[]>> {
    return this.milvusService.apiClient.listPartitions(params);
  }

  async has(params: HttpPartitionBaseReq): Promise<HttpPartitionHasResponse> {
    return this.milvusService.apiClient.hasPartition(params);
  }

  async getStatistics(
    params: HttpPartitionBaseReq,
  ): Promise<HttpPartitionStatisticsResponse> {
    return this.milvusService.apiClient.getPartitionStatistics(params);
  }

  async load(params: HttpPartitionListReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.loadPartitions(params);
  }

  async release(params: HttpPartitionListReq): Promise<HttpBaseResponse<{}>> {
    return this.milvusService.apiClient.releasePartitions(params);
  }
}
