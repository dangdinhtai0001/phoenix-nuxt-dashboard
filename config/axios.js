// Axios module configuration: https://go.nuxtjs.dev/config-axios
export default {
    baseURL: process.env.API_BASE_URL || " http://localhost:8091/api/v0",
    debug: process.env.DEBUG || false,
    proxyHeaders: false,
    credentials: false
}