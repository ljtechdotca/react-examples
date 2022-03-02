export const INIT_CON_OPTS: Record<string, any> = {
  extraHeaders: {
    cors: {
      origin: "http://localhost:3001/",
      methods: "GET,PUT,POST,DELETE,OPTIONS".split(","),
      credentials: true,
    },
  },
  cors_allowed_origins: "*",
  reconnect: true,
  reconnectDelay: 1000,
  reconnectDelayMax: 5000,
  reconnectAttempts: Infinity,
  timeout: 1000,
  transports: ["polling", "websocket"],
  "reconnection limit": 3000,
  "max reconnection attempts": Number.MAX_VALUE,
  "connect timeout": 7000,
  "force new connection": true,
};
