// Use API server in production
export default (url: string) => process.env.NODE_ENV === 'production' ? `https://api.berrycamp.com${ url }` : url;