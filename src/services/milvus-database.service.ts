import { Inject, Injectable } from "@nestjs/common";
import { ID, RequestContext } from "@vendure/core";
import { MilvusService } from "./milvus.service";
import {
  ResStatus,
  ListDatabasesResponse,
  DescribeDatabaseResponse,
} from "@zilliz/milvus2-sdk-node";

interface CreateMilvusDatabaseInput {
  name: string;
  // Define the input fields here
}

@Injectable()
export class MilvusDatabaseService {
  constructor(private milvusService: MilvusService) {}

  async create(input: CreateMilvusDatabaseInput): Promise<ResStatus> {
    const client = this.milvusService.getClient();
    return client.createDatabase({ db_name: input.name });
  }

  async list(): Promise<ListDatabasesResponse> {
    const client = this.milvusService.getClient();
    return client.listDatabases();
  }

  async describe(name: string): Promise<DescribeDatabaseResponse> {
    const client = this.milvusService.getClient();
    return client.describeDatabase({ db_name: name });
  }

  async drop(name: string): Promise<ResStatus> {
    const client = this.milvusService.getClient();
    return client.dropDatabase({ db_name: name });
  }
}
