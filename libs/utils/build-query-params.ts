export function buildQueryParams(params: Record<string, string>): string {
  const queryParams = new URLSearchParams();

  for (const key in params) {
    if (params.hasOwnProperty(key) && !!params[key]) {
      queryParams.append(key, params[key]);
    }
  }

  return queryParams.toString();
}
