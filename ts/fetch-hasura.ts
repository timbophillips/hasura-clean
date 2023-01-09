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
  jsonData,
}: {
  jsonData: string;
  hasuraURI: string;
}): Promise<{ data: Record<string, any>; errors: Record<string, any> }> {
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
    body: jsonData,
  };

  const response = await fetch(hasuraEndpoint, requestInit);
  console.log(`Response status: ${response.status}`);

  const { data, errors } = (await response.json()) as {
    data: Record<string, any>;
    errors: Record<string, any>;
  };
  console.log(`data: `);
  console.log(JSON.stringify(data));
  console.log(`errors: `);
  console.log(JSON.stringify(errors));

  return { data, errors };
}
