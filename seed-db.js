// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function generateCode(min = 10000, max = 99999) {
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

async function main() {
  console.log("🌱 Seeding database...");

  const promises = [
    "Sticker: perro feliz",
    "Sticker: café mágico",
    "Sticker: Treintoker",
    "Pin: Cactus",
    "Bebida sin costo",
    "Bebida sin costo",
  ].map((name) => {
    return [
      generateCode(),
      generateCode(),
      generateCode(),
      generateCode(),
      generateCode(),
    ].map(async (token) => {
      console.log(`  🎁 Adding reward "${name}" with code ${token});`);
      return await prisma.reward.create({
        data: { name, token },
      });
    });
  });
  return Promise.all(promises)
    .then(() => {
      console.log("✅ Done!");
    })
    .catch((e) => {
      console.log(e);
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
