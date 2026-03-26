import { prisma } from "./prisma.js"

const main = async () => prisma.user.delete({ where: { id: "79e58680-610e-47f6-8dd5-623f3dba39cf" } })

main()
  .then(async () => await prisma.$disconnect())
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

export { main }
