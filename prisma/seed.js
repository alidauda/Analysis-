const { PrismaClient } = require("@prisma/client");
const csv = require("csv-parser");
const fs = require("fs");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const results = await new Promise((resolve, reject) => {
      const data = [];
      fs.createReadStream("data.csv")
        .pipe(csv())
        .on("data", (row) => data.push(row))
        .on("end", () => resolve(data))
        .on("error", (error) => reject(error));
    });

    await prisma.data.createMany({
      data: results.map((item) => {
        const trimmedItem = {
          ...item,
          INSTITUTION: item.INSTITUTION.trim().replace(/\s+/g, " "),
          InstitutionType: item.InstitutionType.trim()
            .replace(/\s+/g, " ")
            .toLowerCase(),
        };
        return trimmedItem;
      }),
    });

    console.log("Data created successfully.");
  } catch (e) {
    console.error("Error:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
