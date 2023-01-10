import { readFile } from "fs/promises";
import {
  fetchHasuraGraphQL,
  fetchHasuraMetadata,
  fetchHasuraRunSQL,
} from "./fetch-hasura.js";

const jsonAttachDatabaseStringFile = "json/attach-postgres-to-hasura.json";
const jsonClearMetadataStringFile = "json/clear-metadata.json";
const sqlUpFile = "sql/up.sql";
const jsonTrackUsersTableMetadataStringFile = "json/track-users-table.json";
const jsonTracRefreshTokensTableMetadataStringFile =
  "json/track-refreshtokens-table.json";
const jsonReloadMetadataStringFile = "json/reload-metadata.json";
const jsonUsersFile = "json/example-users.json";

const insertUsersGQL = `#graphql
mutation InsertUsers($users: [users_insert_input!] = {}) {
  insert_users(objects: $users) {
    affected_rows
    returning {
      id
    }
  }
}`;

const jsonClearMetadataString = await readFile(jsonClearMetadataStringFile, {
  encoding: "utf8",
});
await fetchHasuraMetadata({
  hasuraURI: "http://localhost:8080/v1/graphql",
  json: jsonClearMetadataString,
});

const jsonAddDatabaseMetadataString = await readFile(
  jsonAttachDatabaseStringFile,
  { encoding: "utf8" }
);
await fetchHasuraMetadata({
  hasuraURI: "http://localhost:8080/v1/graphql",
  json: jsonAddDatabaseMetadataString,
});

const sqlString = await readFile(sqlUpFile, { encoding: "utf8" });
await fetchHasuraRunSQL({
  hasuraURI: "http://localhost:8080/v1/graphql",
  sql: sqlString,
});

const jsonTrackUsersTableMetadataString = await readFile(
  jsonTrackUsersTableMetadataStringFile,
  { encoding: "utf8" }
);
await fetchHasuraMetadata({
  hasuraURI: "http://localhost:8080/v1/graphql",
  json: jsonTrackUsersTableMetadataString,
});

const jsonTrackRefreshTokensTableMetadataString = await readFile(
  jsonTracRefreshTokensTableMetadataStringFile,
  { encoding: "utf8" }
);
await fetchHasuraMetadata({
  hasuraURI: "http://localhost:8080/v1/graphql",
  json: jsonTrackRefreshTokensTableMetadataString,
});

const jsonReloadMetadataString = await readFile(jsonReloadMetadataStringFile, {
  encoding: "utf8",
});
await fetchHasuraMetadata({
  hasuraURI: "http://localhost:8080/v1/graphql",
  json: jsonReloadMetadataString,
});

const jsonUsersString = await readFile(jsonUsersFile, {
  encoding: "utf8",
});
const users = JSON.parse(jsonUsersString)

const { data, errors } = await fetchHasuraGraphQL({
  hasuraURI: "http://localhost:8080/v1/graphql",
  operationName: "InsertUsers",
  query: insertUsersGQL,
  variables: { users: users },
});

console.log(`data = ${JSON.stringify(data,null,2)}`)
console.log(`errors = ${JSON.stringify(errors,null,2)}`)
