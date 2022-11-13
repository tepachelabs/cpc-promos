const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function generateCode(min = 10000, max = 99999) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  ).toString()
}

async function main() {
  const promises = [
    "Perro feliz",
    "Perro vaquero",
    "Café mágico",
    "Cactus",
    "Treintoker"
  ].map((name) => {
    return [
      generateCode(),
      generateCode(),
      generateCode(),
      generateCode(),
      generateCode(),
    ].map(async (token) => {
      console.log(`Creating record (${ name }, ${ token });`)
      return await prisma.sticker.create({
        data: { name, token }
      })
    })
  });
  return Promise.all(promises).then(() => {
    console.log("Done!");
  }).catch((e) => {
    console.log(e);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
