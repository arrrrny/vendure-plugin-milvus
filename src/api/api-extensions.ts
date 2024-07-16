import gql from "graphql-tag";

const milvusCollectionAdminApiExtensions = gql`
  type HttpBaseResponse {
    code: Int!
    message: String
    data: JSON
  }

  type HttpCollectionDescribeResponse {
    code: Int!
    message: String
    data: CollectionDetails!
  }

  type CollectionDetails {
    collectionName: String!
    description: String!
    fields: [FieldSchema!]!
    indexes: [Index!]!
    load: String!
    shardsNum: Int!
    enableDynamicField: Boolean!
  }

  type FieldSchema {
    autoId: Boolean
    description: String!
    primaryKey: Boolean
    type: String!
  }

  type Index {
    fieldName: String!
    indexName: String!
    metricType: String!
  }

  type HttpCollectionHasResponse {
    code: Int!
    data: CollectionHasData!
    message: String
  }

  type CollectionHasData {
    has: Boolean!
  }

  type HttpCollectionListResponse {
    code: Int!
    data: [String!]!
    message: String
  }

  type HttpCollectionStatisticsResponse {
    code: Int!
    data: CollectionStatistics!
    message: String
  }

  type CollectionStatistics {
    rowCount: Int!
  }

  type HttpCollectionLoadStateResponse {
    code: Int!
    data: CollectionLoadState!
    message: String
  }

  type CollectionLoadState {
    loadProgress: Int!
    loadState: String!
  }

  input HttpBaseReq {
    dbName: String
    collectionName: String!
  }

  input HttpCollectionCreateReq {
    dbName: String
    collectionName: String!
    dimension: Int
    metricType: String
    idType: String
    autoID: Boolean
    primaryFieldName: String
    vectorFieldName: String
    schema: CollectionCreateSchemaInput
    indexParams: [CollectionIndexParamInput!]
    params: CollectionCreateParamsInput
  }

  input CollectionCreateFieldInput {
    fieldName: String!
    dataType: String!
    elementDataType: String
    isPrimary: Boolean
    isPartitionKey: Boolean
    elementTypeParams: ElementTypeParamsInput
  }

  input CollectionCreateSchemaInput {
    autoID: Boolean
    enabledDynamicField: Boolean
    fields: [CollectionCreateFieldInput!]!
  }

  input CollectionCreateParamsInput {
    max_length: Int
    enableDynamicField: Boolean
    shardsNum: Int
    consistencyLevel: String
    partitionsNum: Int
    ttlSeconds: Int
  }

  input CollectionIndexParamInput {
    metricType: String!
    fieldName: String!
    indexName: String!
    params: IndexParamInput
  }

  input ElementTypeParamsInput {
    max_length: Int
    dim: Int
    max_capacity: Int
  }

  input IndexParamInput {
    index_type: String!
    nlist: Int
    M: String
    efConstruction: String
  }

  input HttpCollectionRenameReq {
    dbName: String
    collectionName: String!
    newCollectionName: String!
    newDbName: String
  }

  input HttpCollectionListReq {
    dbName: String
  }

  extend type Query {
    milvusListCollections(
      params: HttpCollectionListReq
    ): HttpCollectionListResponse
    milvusDescribeCollection(
      params: HttpBaseReq
    ): HttpCollectionDescribeResponse
    milvusHasCollection(params: HttpBaseReq): HttpCollectionHasResponse
    milvusGetCollectionStatistics(
      params: HttpBaseReq
    ): HttpCollectionStatisticsResponse
    milvusGetCollectionLoadState(
      params: HttpBaseReq
    ): HttpCollectionLoadStateResponse
  }

  extend type Mutation {
    milvusCreateCollection(data: HttpCollectionCreateReq): HttpBaseResponse
    milvusDropCollection(data: HttpBaseReq): HttpBaseResponse
    milvusRenameCollection(data: HttpCollectionRenameReq): HttpBaseResponse
    milvusLoadCollection(data: HttpBaseReq): HttpBaseResponse
    milvusReleaseCollection(data: HttpBaseReq): HttpBaseResponse
    testCreateCollection: Boolean
  }
`;

const milvusAdminApiExtensions = gql`
  extend type Query {
    checkHealth(id: ID!): Boolean!
  }
`;

const milvusDatabaseAdminApiExtensions = gql`
  type MilvusDatabase {
    name: String!
  }

  type MilvusDatabaseListResponse {
    db_names: [String!]!
    status: Status!
  }

  type Status {
    error_code: String!
    reason: String
    code: Int!
  }

  extend type Query {
    milvusListDatabases: MilvusDatabaseListResponse!
    milvusDescribeDatabase(name: String!): MilvusDatabase!
  }

  input MilvusCreateDatabaseInput {
    name: String!
  }

  extend type Mutation {
    milvusCreateDatabase(input: MilvusCreateDatabaseInput!): Status!
    milvusDropDatabase(name: String!): Status!
  }
`;

const milvusVectorAdminApiExtensions = gql`
  type HttpVectorGetResponse {
    code: Int!
    message: String
    data: JSON
  }

  type HttpVectorInsertResponse {
    code: Int!
    message: String
    data: JSON
  }

  type HttpVectorQueryResponse {
    code: Int!
    message: String
    data: JSON
  }

  type HttpVectorSearchResponse {
    code: Int!
    message: String
    data: JSON
  }

  type HttpVectorUpsertResponse {
    code: Int!
    message: String
    data: JSON
  }

  input HttpVectorGetReq {
    dbName: String
    collectionName: String
    ids: [String!]!
  }

  input HttpVectorInsertReq {
    dbName: String
    collectionName: String
    vectors: JSON!
  }

  input HttpVectorQueryReq {
    dbName: String
    collectionName: String
    expr: String
    outputFields: [String!]
  }

  input HttpVectorSearchReq {
    dbName: String
    collectionName: String
    vector: [Float!]!
    filter: String
    topK: Int!
    params: JSON
  }

  input HttpVectorDeleteReq {
    dbName: String
    collectionName: String
    expr: String
  }

  extend type Query {
    milvusGetVector(params: HttpVectorGetReq): HttpVectorQueryResponse
    milvusQueryVector(data: HttpVectorQueryReq): HttpVectorQueryResponse
    milvusSearchVector(data: HttpVectorSearchReq): HttpVectorSearchResponse
  }

  extend type Mutation {
    milvusInsertVector(data: HttpVectorInsertReq): HttpVectorInsertResponse
    milvusUpsertVector(data: HttpVectorInsertReq): HttpVectorUpsertResponse
    milvusDeleteVector(data: HttpVectorDeleteReq): HttpBaseResponse
  }
`;
const milvusIndexAdminApiExtensions = gql`
  type HttpIndexDescribeResponse {
    code: Int!
    message: String
    data: [IndexDetails!]!
  }

  type IndexDetails {
    failReason: String
    fieldName: String!
    indexName: String!
    indexState: String!
    indexType: String!
    indexedRows: Int!
    metricType: String!
    pendingRows: Int!
    totalRows: Int!
  }

  extend type Query {
    milvusDescribeIndex(params: HttpIndexBaseReq!): HttpIndexDescribeResponse!
    milvusListIndexes(params: HttpBaseReq!): HttpBaseResponse!
  }

  input HttpIndexCreateReq {
    dbName: String!
    collectionName: String!
    indexParams: [CollectionIndexParamInput!]!
  }

  input HttpIndexBaseReq {
    dbName: String!
    collectionName: String!
    indexName: String!
  }

  extend type Mutation {
    milvusCreateIndex(data: HttpIndexCreateReq!): HttpBaseResponse!
    milvusDropIndex(data: HttpIndexBaseReq!): HttpBaseResponse!
  }
`;

const milvusRoleAdminApiExtensions = gql`
  type HttpRoleDescribeResponse {
    code: Int!
    message: String
    data: RoleDetails!
  }

  type RoleDetails {
    roleName: String!
    description: String!
    privileges: [Privilege!]!
  }

  type Privilege {
    name: String!
    description: String!
  }

  extend type Query {
    milvusDescribeRole(params: HttpRoleBaseReq!): HttpRoleDescribeResponse!
    milvusListRoles: HttpBaseResponse!
  }

  input HttpRoleBaseReq {
    roleName: String!
  }

  input HttpRolePrivilegeReq {
    roleName: String!
    privilege: String!
    objectName: String!
    objectType: String!
  }

  extend type Mutation {
    milvusCreateRole(data: HttpRoleBaseReq!): HttpBaseResponse!
    milvusDropRole(data: HttpRoleBaseReq!): HttpBaseResponse!
    milvusGrantPrivilegeToRole(data: HttpRolePrivilegeReq!): HttpBaseResponse!
    milvusRevokePrivilegeFromRole(
      data: HttpRolePrivilegeReq!
    ): HttpBaseResponse!
  }
`;

const milvusUserAdminApiExtensions = gql`
  input HttpUserBaseReq {
    userName: String!
  }

  input HttpUserCreateReq {
    userName: String!
    password: String!
  }

  input HttpUserUpdatePasswordReq {
    userName: String!
    password: String!
    newPassword: String!
  }

  input HttpUserRoleReq {
    userName: String!
    roleName: String!
  }

  extend type Query {
    milvusDescribeUser(params: HttpUserBaseReq!): HttpBaseResponse!
    milvusListUsers: HttpBaseResponse!
  }

  extend type Mutation {
    milvusCreateUser(data: HttpUserCreateReq!): HttpBaseResponse!
    milvusDropUser(data: HttpUserBaseReq!): HttpBaseResponse!
    milvusUpdateUserPassword(
      data: HttpUserUpdatePasswordReq!
    ): HttpBaseResponse!
    milvusGrantRoleToUser(data: HttpUserRoleReq!): HttpBaseResponse!
    milvusRevokeRoleFromUser(data: HttpUserRoleReq!): HttpBaseResponse!
  }
`;
const milvusImportAdminApiExtensions = gql`
  type ImportJobType {
    collectionName: String!
    jobId: String!
    progress: Int!
    state: String!
  }

  type ImportJobDetailType {
    completeTime: String
    fileName: String!
    fileSize: Int
    importedRows: Int
    progress: Int
    state: String!
    totalRows: Int
  }
  type ImportJobData {
    records: [ImportJobType!]!
  }

  type HttpImportListResponse {
    code: Int!
    message: String
    data: ImportJobData
  }

  type HttpImportCreateResponse {
    code: Int!
    message: String
    data: ImportJobType!
  }

  type HttpImportProgressResponse {
    code: Int!
    message: String
    data: ImportJobDetailType!
  }

  input HttpImportCreateReq {
    dbName: String
    collectionName: String!
    files: [String!]!
    options: ImportOptionsInput
  }

  input ImportOptionsInput {
    timeout: String
  }

  input HttpImportProgressReq {
    dbName: String
    jobId: String!
  }

  extend type Query {
    milvusListImportJobs(params: HttpBaseReq): HttpImportListResponse
    milvusGetImportJobProgress(
      params: HttpImportProgressReq
    ): HttpImportProgressResponse
  }

  extend type Mutation {
    milvusCreateImportJob(data: HttpImportCreateReq): HttpImportCreateResponse
  }
`;
const milvusAliasAdminApiExtensions = gql`
  type HttpAliasDescribeResponse {
    code: Int!
    message: String
    data: AliasDetails!
  }

  type AliasDetails {
    aliasName: String!
    collectionName: String!
  }

  extend type Query {
    milvusListAliases(params: HttpAliasBaseReq!): HttpBaseResponse!
    milvusDescribeAlias(
      params: HttpAliasDescribeReq!
    ): HttpAliasDescribeResponse!
  }

  input HttpAliasBaseReq {
    dbName: String
  }

  input HttpAliasDescribeReq {
    aliasName: String!
  }

  input HttpAliasCreateReq {
    dbName: String
    aliasName: String!
    collectionName: String!
  }

  input HttpAliasDropReq {
    dbName: String
    aliasName: String!
  }

  extend type Mutation {
    milvusCreateAlias(data: HttpAliasCreateReq!): HttpBaseResponse!
    milvusDropAlias(data: HttpAliasDropReq!): HttpBaseResponse!
    milvusAlterAlias(data: HttpAliasCreateReq!): HttpBaseResponse!
  }
`;

// Add the following types for the partition resolver
const milvusPartionAdminApiExtensions = gql`
  type HttpPartitionHasResponse {
    code: Int!
    data: PartitionHasData!
    message: String
  }

  type PartitionHasData {
    hasPartition: Boolean!
  }

  type HttpPartitionStatisticsResponse {
    code: Int!
    data: PartitionStatistics!
    message: String
  }

  type PartitionStatistics {
    rowCount: Int!
  }

  extend type Query {
    milvusListPartitions(params: HttpBaseReq!): HttpBaseResponse!
    milvusHasPartition(params: HttpPartitionBaseReq!): HttpPartitionHasResponse!
    milvusGetPartitionStatistics(
      params: HttpPartitionBaseReq!
    ): HttpPartitionStatisticsResponse!
  }

  input HttpPartitionBaseReq {
    dbName: String
    collectionName: String!
    partitionName: String!
  }

  input HttpPartitionListReq {
    dbName: String
    collectionName: String!
    partitionNames: [String!]!
  }

  extend type Mutation {
    milvusCreatePartition(data: HttpPartitionBaseReq!): HttpBaseResponse!
    milvusDropPartition(data: HttpPartitionBaseReq!): HttpBaseResponse!
    milvusLoadPartitions(data: HttpPartitionListReq!): HttpBaseResponse!
    milvusReleasePartitions(data: HttpPartitionListReq!): HttpBaseResponse!
  }
`;

export const adminApiExtensions = gql`
  ${milvusCollectionAdminApiExtensions}
  ${milvusAdminApiExtensions}
  ${milvusDatabaseAdminApiExtensions}
  ${milvusVectorAdminApiExtensions}
  ${milvusIndexAdminApiExtensions}
  ${milvusRoleAdminApiExtensions}
  ${milvusUserAdminApiExtensions}
  ${milvusImportAdminApiExtensions}
  ${milvusAliasAdminApiExtensions}
  ${milvusPartionAdminApiExtensions}
`;
