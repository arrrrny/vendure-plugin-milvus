import { PluginCommonModule, Type, VendurePlugin } from "@vendure/core";

import { MILVUS_PLUGIN_OPTIONS } from "./constants";
import { PluginInitOptions } from "./types";
import { MilvusCollectionService } from "./services/milvus-collection.service";

import { MilvusCollectionAdminResolver } from "./api/milvus-collection-admin.resolver";
import { adminApiExtensions } from "./api/api-extensions";
import { MilvusService } from "./services/milvus.service";
import { MilvusDatabaseService } from "./services/milvus-database.service";
import { MilvusDatabaseAdminResolver } from "./api/milvus-database-admin.resolver";
import { MilvusVectorService } from "./services/milvus-vector.service";
import { MilvusVectorAdminResolver } from "./api/milvus-vector-admin.resolver";
import { MilvusIndexService } from "./services/milvus-index.service";
import { MilvusIndexAdminResolver } from "./api/milvus-index-admin.resolver";
import { MilvusRoleService } from "./services/milvus-role.service";
import { MilvusRoleAdminResolver } from "./api/milvus-role-admin.resolver";
import { MilvusUserService } from "./services/milvus-user.service";
import { MilvusUserAdminResolver } from "./api/milvus-user-admin.resolver";
import { MilvusImportService } from "./services/milvus-import.service";
import { MilvusImportAdminResolver } from "./api/milvus-import-admin.resolver";
import { MilvusAliasService } from "./services/milvus-alias.service";
import { MilvusPartionService } from "./services/milvus-partion.service";
import { MilvusAliasAdminResolver } from "./api/milvus-alias-admin.resolver";
import { MilvusPartionAdminResolver } from "./api/milvus-partion-admin.resolver";

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [
    { provide: MILVUS_PLUGIN_OPTIONS, useFactory: () => MilvusPlugin.options },
    MilvusCollectionService,
    MilvusService,
    MilvusDatabaseService,
    MilvusVectorService,
    MilvusIndexService,
    MilvusRoleService,
    MilvusUserService,
    MilvusImportService,
    MilvusAliasService,
    MilvusPartionService,
  ],
  configuration: (config) => {
    // Plugin-specific configuration
    // such as custom fields, custom permissions,
    // strategies etc. can be configured here by
    // modifying the `config` object.
    return config;
  },
  compatibility: "^2.0.0",

  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [
      MilvusCollectionAdminResolver,
      MilvusDatabaseAdminResolver,
      MilvusVectorAdminResolver,
      MilvusIndexAdminResolver,
      MilvusRoleAdminResolver,
      MilvusUserAdminResolver,
      MilvusImportAdminResolver,
      MilvusAliasAdminResolver,
      MilvusPartionAdminResolver,
    ],
  },
})
export class MilvusPlugin {
  static options: PluginInitOptions;
  static init(options: PluginInitOptions): Type<MilvusPlugin> {
    this.options = options;
    return MilvusPlugin;
  }
}
