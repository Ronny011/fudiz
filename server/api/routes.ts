import Router from "@koa/router";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

type Place = {
  id: number;
  rest_name: string;
  rest_image: string;
  rest_url: string;
  rate_food: number;
  rate_service: number | null;
  rate_vibe: number | null;
  rate_final: Decimal;
  notes: string;
  city: string;
  cuisine: string;
  keywords: string;
  did_visit: boolean;
};

export const router = new Router();
const prisma = new PrismaClient();

const main = async () => {
  router.get("/api/get-all", async (ctx) => {
    const allPlaces: Place[] = await prisma.place.findMany();
    ctx.body = allPlaces;
  });

  router.get("/api/get:id", async (ctx) => {
    const id = Number(ctx.params.id);
    const foundPlace = await prisma.place.findUniqueOrThrow({
      where: { id },
    });
    ctx.status = foundPlace ? 201 : 400;
    ctx.body = foundPlace;
  });

  router.post("/api/insert", async (ctx) => {
    const data = ctx.request.body as Place;
    const newPlace = await prisma.place.create({ data });
    ctx.status = 201;
    ctx.body = newPlace;
  });

  router.post("/api/update:id", async (ctx) => {
    const id = Number(ctx.params.id);
    const data = ctx.request.body as Partial<Place>;
    const updatedPlace = await prisma.place.update({
      where: { id },
      data,
    });
    ctx.status = 201;
    ctx.body = updatedPlace;
  });

  router.post("/api/delete:id", async (ctx) => {
    const id = Number(ctx.params.id);
    const deletedPlace = await prisma.place.delete({
      where: { id },
    });
    ctx.status = 201;
    ctx.body = deletedPlace;
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
