import Koa from "koa";
import { router } from "./api";
import bodyParser from "koa-bodyparser";

const app = new Koa();
app.use(bodyParser());

const PORT = 1337;

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});
