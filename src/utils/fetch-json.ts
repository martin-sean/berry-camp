// Fetch JSON containing T type response
export default <T>(req: RequestInfo): Promise<T> => fetch(req).then(res => res.json());