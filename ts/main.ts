import { readFile } from "fs/promises";
import { fetchHasuraMetadata, fetchHasuraRunSQL } from "./fetch-hasura.js";

const jsonAttachDatabaseStringFile = "json/attach-postgres-to-hasura.json";
const jsonClearMetadataStringFile = "json/clear-metadata.json"
const sqlUpFile = "sql/up.sql";
const jsonTrackUsersTableMetadataStringFile = "json/track-users-table.json";
const jsonTracRefreshTokensTableMetadataStringFile = "json/track-refreshtokens-table.json";
const jsonReloadMetadataStringFile = "json/reload-metadata.json"

const jsonClearMetadataString = await readFile(jsonClearMetadataStringFile, { encoding: "utf8" });
await fetchHasuraMetadata({
  hasuraURI: "http://localhost:8080/v1/graphql",
  jsonString: jsonClearMetadataString,
});

const jsonAddDatabaseMetadataString = await readFile(jsonAttachDatabaseStringFile, { encoding: "utf8" });
await fetchHasuraMetadata({
  hasuraURI: "http://localhost:8080/v1/graphql",
  jsonString: jsonAddDatabaseMetadataString,
});

const sqlString = await readFile(sqlUpFile, { encoding: "utf8" });
await fetchHasuraRunSQL({
  hasuraURI: "http://localhost:8080/v1/graphql",
  sql: sqlString,
});
 
const jsonTrackUsersTableMetadataString = await readFile(jsonTrackUsersTableMetadataStringFile, { encoding: "utf8" });
await fetchHasuraMetadata({
  hasuraURI: "http://localhost:8080/v1/graphql",
  jsonString: jsonTrackUsersTableMetadataString,
});

const jsonTrackRefreshTokensTableMetadataString = await readFile(jsonTracRefreshTokensTableMetadataStringFile, { encoding: "utf8" });
await fetchHasuraMetadata({
  hasuraURI: "http://localhost:8080/v1/graphql",
  jsonString: jsonTrackRefreshTokensTableMetadataString,
});

const jsonReloadMetadataString = await readFile(jsonReloadMetadataStringFile, { encoding: "utf8" });
await fetchHasuraMetadata({
  hasuraURI: "http://localhost:8080/v1/graphql",
  jsonString: jsonReloadMetadataString,
});
