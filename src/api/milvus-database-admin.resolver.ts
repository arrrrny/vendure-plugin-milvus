import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Permission } from "@vendure/common/lib/generated-types";
import { Allow, Transaction } from "@vendure/core";
import { MilvusDatabaseService } from "../services/milvus-database.service";
import {
  ResStatus,
  ListDatabasesResponse,
  DescribeDatabaseResponse,
} from "@zilliz/milvus2-sdk-node";

// These can be replaced by generated types if you set up code generation
interface MilvusCreateDatabaseInput {
  name: string;
  // Define the input fields here
}

@Resolver()
export class MilvusDatabaseAdminResolver {
  constructor(private milvusDatabaseService: MilvusDatabaseService) {}

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusListDatabases(): Promise<ListDatabasesResponse> {
    return this.milvusDatabaseService.list();
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async milvusDescribeDatabase(
    @Args() args: { name: string },
  ): Promise<DescribeDatabaseResponse> {
    return this.milvusDatabaseService.describe(args.name);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusCreateDatabase(
    @Args() args: { input: MilvusCreateDatabaseInput },
  ): Promise<ResStatus> {
    return this.milvusDatabaseService.create(args.input);
  }

  @Mutation()
  @Transaction()
  @Allow(Permission.SuperAdmin)
  async milvusDropDatabase(@Args() args: { name: string }): Promise<ResStatus> {
    return this.milvusDatabaseService.drop(args.name);
  }
}
