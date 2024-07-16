import { ClientConfig, HttpClientConfig } from "@zilliz/milvus2-sdk-node";

/**
 * @description
 * The plugin can be configured using the following options:
 */
export interface PluginInitOptions {
  config: ClientConfig;
  apiConfig: HttpClientConfig;
}
