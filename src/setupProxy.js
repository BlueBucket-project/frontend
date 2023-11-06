/* import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://13.125.29.219:8080",
      changeOrigin: true,
    }),
  );
  app.listen(5173);
};
 */

// 프록시 미들웨어 없어도 작동 잘 됨
