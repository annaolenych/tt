
export const getQueryParams = (url: string) => new URLSearchParams(new URL(url).search)