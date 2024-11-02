const appConfig = {
  app: {
    appName: "TaskStore",
    apiUrl: import.meta.env.VITE_API_URL,
    defaultLoginRoute: "/auth/login",
    defaultRoute: "/products"
  }
}

export default appConfig
