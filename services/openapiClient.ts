import { api } from "@/services/api";
import openapiSpec from "../.github/openapi/openapi.json";

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

type PathsMap = Record<string, Set<HttpMethod>>;

const PATHS: PathsMap = (() => {
  const out: PathsMap = {};
  const paths = (openapiSpec?.paths ?? {}) as Record<string, Partial<Record<HttpMethod, unknown>>>;
  for (const [path, methods] of Object.entries(paths)) {
    const set = new Set<HttpMethod>();
    for (const method of Object.keys(methods) as HttpMethod[]) {
      if (["get", "post", "put", "patch", "delete"].includes(method)) {
        set.add(method);
      }
    }
    if (set.size > 0) out[path] = set;
  }
  return out;
})();

function assertValidEndpoint(path: string, method: HttpMethod) {
  if (!PATHS[path]) {
    throw new Error(`Unknown endpoint: ${path} (not found in OpenAPI spec)`);
  }
  if (!PATHS[path].has(method)) {
    const allow = Array.from(PATHS[path]).join(", ");
    throw new Error(`Method ${method} not allowed for ${path}. Allowed: ${allow}`);
  }
}

export async function apiCall<T = any>(method: HttpMethod, path: string, dataOrConfig?: any, maybeConfig?: any) {
  assertValidEndpoint(path, method);
  // Strip /api prefix since axios baseURL already includes it
  const cleanPath = path.startsWith("/api") ? path.substring(4) : path;
  
  switch (method) {
    case "get":
      return api.get<T>(cleanPath, dataOrConfig);
    case "delete":
      return api.delete<T>(cleanPath, dataOrConfig);
    case "post":
      return api.post<T>(cleanPath, dataOrConfig, maybeConfig);
    case "put":
      return api.put<T>(cleanPath, dataOrConfig, maybeConfig);
    case "patch":
      return api.patch<T>(cleanPath, dataOrConfig, maybeConfig);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}

export const apiGet = <T = any>(path: string, config?: any) => apiCall<T>("get", path, config);
export const apiPost = <T = any>(path: string, body?: any, config?: any) => apiCall<T>("post", path, body, config);
export const apiPut = <T = any>(path: string, body?: any, config?: any) => apiCall<T>("put", path, body, config);
export const apiPatch = <T = any>(path: string, body?: any, config?: any) => apiCall<T>("patch", path, body, config);
export const apiDelete = <T = any>(path: string, config?: any) => apiCall<T>("delete", path, config);

export function listOpenApiEndpoints(): Array<{ path: string; methods: string[] }> {
  return Object.entries(PATHS).map(([path, methods]) => ({ path, methods: Array.from(methods) }));
}
