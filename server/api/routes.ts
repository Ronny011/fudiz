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
  router.get("/", async (ctx) => {
    ctx.body = "Hello world";
  });

  router.get("/api/get-all", async (ctx) => {
    const allPlaces: Place[] = await prisma.place.findMany();
    ctx.body = allPlaces;
  });
};

router.post("/api/insert", async (ctx) => {
  const {
    id,
    rest_name,
    rest_image,
    rest_url,
    rate_food,
    rate_service,
    rate_vibe,
    rate_final,
    notes,
    city,
    cuisine,
    keywords,
    did_visit,
  } = ctx.request.body as Place;
  const newPlace = await prisma.place.create({
    data: {
      id,
      rest_name,
      rest_image,
      rest_url,
      rate_food,
      rate_service,
      rate_vibe,
      rate_final,
      notes,
      city,
      cuisine,
      keywords,
      did_visit,
    },
  });
  ctx.status = 201;
  ctx.body = newPlace;
});

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
