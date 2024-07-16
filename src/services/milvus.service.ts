import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ID, RequestContext, TransactionalConnection } from "@vendure/core";
import {
  CheckHealthResponse,
  CONNECT_STATUS,
  HttpClient,
  MilvusClient,
} from "@zilliz/milvus2-sdk-node";
import { MILVUS_PLUGIN_OPTIONS } from "../constants";
import { PluginInitOptions } from "../types";

@Injectable()
export class MilvusService implements OnModuleInit, OnModuleDestroy {
  private client: MilvusClient;
  public apiClient: HttpClient;
  constructor(
    private connection: TransactionalConnection,
    @Inject(MILVUS_PLUGIN_OPTIONS) private options: PluginInitOptions,
  ) {}
  onModuleInit(): void {
    this.client = new MilvusClient(this.options.config);
    this.apiClient = new HttpClient({
      endpoint: this.options.apiConfig.endpoint!,
    });
  }

  onModuleDestroy(): Promise<CONNECT_STATUS> {
    return this.client.closeConnection();
  }

  getClient(): MilvusClient {
    return this.client;
  }

  checkHealth(): Promise<CheckHealthResponse> {
    return this.client.checkHealth();
  }
}
