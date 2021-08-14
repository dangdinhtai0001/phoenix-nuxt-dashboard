// Auth-next module configuration: https://auth.nuxtjs.org/api/options
export default {
    redirect: {
        login: "/login", // User will be redirected to this path if login is required.
        logout: "/login", // User will be redirected to this path if after logout, current route is protected.
        callback: false, //  User will be redirected to this path by the identity provider after login. (Should match configured Allowed Callback URLs (or similar setting) in your app/client with the identity provider)
        home: "/" // User will be redirected to this path after login. (rewriteRedirects will rewrite this path)
    },
    // https://auth.nuxtjs.org/schemes/local
    strategies: {
        customStrategy: {
            _scheme: "~/schemes/CustomScheme",
            token: {
                property: "token.access_token",
                required: true,
                maxAge: 15
            },
            user: {
                property: "user",
                autoFetch: true,
                scope: "scope"
            },
            refreshToken: {
                property: "token.refresh_token",
                data: "refreshToken",
                maxAge: false
            },
            endpoints: {
                login: { url: "/auth/login", method: "post" },
                refresh: { url: "/auth/refresh", method: "post" },
                logout: { url: "/auth/logout", method: "post" },
                user: { url: "auth/profile", method: "get" }
            }
        }
    }
}