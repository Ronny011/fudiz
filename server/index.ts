import Koa from "koa";

const app = new Koa();

const PORT = 1337;

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
