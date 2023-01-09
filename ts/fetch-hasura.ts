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
  const hasuraEndpoint = hasuraURL.origin+ hasuraURL.pathname;


  // data is returned as undefined if there is an error
  // errors is returned as undefined if there is no error

  const requestInit: RequestInit = {
    method: "POST",
    headers: hasuraAdminSecret
      ? { "x-hasura-admin-secret": hasuraAdminSecret }
      : {},
    body:
      JSON.stringify({
        query,
        variables,
        operationName,
      }),
  };

  console.log("requestInit = ");
  console.log(JSON.stringify(requestInit, null, 2));

  const result = await fetch(hasuraEndpoint, requestInit);

  return (await result.json()) as {
    data: Record<string, any>;
    errors: Record<string, any>;
  };
}

export async function fetchHasuraMetadata({
  hasuraURI,
  data,
}: {
  data: Record<string, any>;
  hasuraURI: string;
}): Promise<{ data: Record<string, any>; errors: Record<string, any> }> {
  const hasuraURL = new URL(hasuraURI);
  const hasuraAdminSecret = hasuraURL.username || undefined;
  // if an endpoint is provided then use it
  // otherwise use the one in the provided URI string
  const hasuraEndpoint = hasuraURL.origin+ "/v1/metadata"

  // data is returned as undefined if there is an error
  // errors is returned as undefined if there is no error

  const requestInit: RequestInit = {
    method: "POST",
    headers: hasuraAdminSecret
      ? { "x-hasura-admin-secret": hasuraAdminSecret }
      : {},
    body:
      data,
  };

  console.log("requestInit = ");
  console.log(JSON.stringify(requestInit, null, 2));

  const result = await fetch(hasuraEndpoint, requestInit);

  return (await result.json()) as {
    data: Record<string, any>;
    errors: Record<string, any>;
  };
}
