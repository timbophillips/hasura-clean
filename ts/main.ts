import { readFile } from "fs/promises";
import { fetchHasuraMetadata } from "./fetch-hasura.js";

const jsonDataFile = process.argv[2];

if (jsonDataFile) {
  const jsonDataUtf8 = await readFile(jsonDataFile, { encoding: "utf8" });
  const jsonData = JSON.parse(jsonDataUtf8);
  const { data, errors } = await fetchHasuraMetadata({
    hasuraURI: "http://localhost:8080/v1/graphql",
    data: jsonData,
  });

  if (data) {
    console.log(JSON.stringify(data));
  } else if (errors) {
    console.error(errors);
  } else {
    console.log("nuffin");
  }
} else {
  console.log("must provide a file");
}
