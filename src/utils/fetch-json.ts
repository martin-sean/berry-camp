export default <T>(req: RequestInfo): Promise<T> => fetch(req).then(res => res.json());