import { Injectable } from "@nestjs/common";
import {
  HttpBaseReq,
  HttpImportCreateReq,
  HttpImportProgressReq,
  HttpImportListResponse,
  HttpImportCreateResponse,
  HttpImportProgressResponse,
} from "@zilliz/milvus2-sdk-node";
import { MilvusService } from "./milvus.service";

@Injectable()
export class MilvusImportService {
  constructor(private milvusService: MilvusService) {}

  async listJobs(params: HttpBaseReq): Promise<HttpImportListResponse> {
    console.log(await this.milvusService.apiClient.listImportJobs(params));
    return this.milvusService.apiClient.listImportJobs(params);
  }

  async createJob(
    params: HttpImportCreateReq,
  ): Promise<HttpImportCreateResponse> {
    return this.milvusService.apiClient.createImportJobs(params);
  }

  async getJobProgress(
    params: HttpImportProgressReq,
  ): Promise<HttpImportCreateResponse> {
    return this.milvusService.apiClient.getImportJobProgress(params);
  }
}
