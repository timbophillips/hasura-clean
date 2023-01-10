import fetch, { RequestInit } from "node-fetch";
// import {} from "../types/index.js";

export async function fetchHasuraGraphQL({
  hasuraURI,
  operationName,
  query,
  variables,
}: {
  query?: string;
  operationName?: string;
  variables?: Record<string, any>;
  hasuraURI: string;
}): Promise<{ data: Record<string, any>; errors: Record<string, any> }> {
  const hasuraURL = new URL(hasuraURI);
  const hasuraAdminSecret = hasuraURL.username || undefined;
  // if an endpoint is provided then use it
  // otherwise use the one in the provided URI string
  const hasuraEndpoint = hasuraURL.origin + hasuraURL.pathname;

  console.log(`hasura endpoint: ${hasuraEndpoint}`);

  // data is returned as undefined if there is an error
  // errors is returned as undefined if there is no error

  const requestInit: RequestInit = {
    method: "POST",
    headers: hasuraAdminSecret
      ? { "x-hasura-admin-secret": hasuraAdminSecret }
      : {},
    body: JSON.stringify({
      query,
      variables,
      operationName,
    }),
  };

  const response = await fetch(hasuraEndpoint, requestInit);

  console.log(`Response status: ${response.status}`);

  return (await response.json()) as {
    data: Record<string, any>;
    errors: Record<string, any>;
  };
}

export async function fetchHasuraMetadata({
  hasuraURI,
  jsonString,
}: {
  jsonString: string;
  hasuraURI: string;
}): Promise<string> {
  const hasuraURL = new URL(hasuraURI);
  const hasuraAdminSecret = hasuraURL.username || undefined;
  // if an endpoint is provided then use it
  // otherwise use the one in the provided URI string
  const hasuraEndpoint = hasuraURL.origin + "/v1/metadata";

  console.log(`hasura endpoint: ${hasuraEndpoint}`);

  // data is returned as undefined if there is an error
  // errors is returned as undefined if there is no error

  const requestInit: RequestInit = {
    method: "POST",
    headers: hasuraAdminSecret
      ? { "x-hasura-admin-secret": hasuraAdminSecret }
      : { "X-Hasura-Role": "admin", "Content-Type": "application/json" },
    body: jsonString,
  };

  const response = await fetch(hasuraEndpoint, requestInit);
  console.log(`Response status: ${response.status}`);

  const responseText = await response.text();
  console.log(`Response Text ${responseText}`)

  return responseText;
}

export async function fetchHasuraRunSQL({
  hasuraURI,
  sql,
}: {
  sql: string;
  hasuraURI: string;
}): Promise<string> {
  const hasuraURL = new URL(hasuraURI);
  const hasuraAdminSecret = hasuraURL.username || undefined;
  // if an endpoint is provided then use it
  // otherwise use the one in the provided URI string
  const hasuraEndpoint = hasuraURL.origin + "/v2/query";

  console.log(`hasura endpoint: ${hasuraEndpoint}`);

  // data is returned as undefined if there is an error
  // errors is returned as undefined if there is no error

  const requestInit: RequestInit = {
    method: "POST",
    headers: hasuraAdminSecret
      ? { "x-hasura-admin-secret": hasuraAdminSecret }
      : { "X-Hasura-Role": "admin", "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "run_sql",
      args: {
        source: "authDB",
        sql: sql,
      },
    }),
  };

  const response = await fetch(hasuraEndpoint, requestInit);
  console.log(`Response status: ${response.status}`);

  const responseText = await response.text();
  console.log(`Response Text ${responseText}`)

  return responseText;
}
