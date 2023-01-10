import { readFile } from "fs/promises";
import { fetchHasuraMetadata } from "./fetch-hasura.js";

const jsonDataFile = process.argv[2];

if (jsonDataFile) {
  const jsonString = await readFile(jsonDataFile, { encoding: "utf8" });
  await fetchHasuraMetadata({
    hasuraURI: "http://localhost:8080/v1/graphql",
    json: jsonString,
  });

} else {
  console.log("must provide a file");
}
