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

    const len = results.length;
    const batch = 50;
    const numberOfBatches = Math.ceil(len / batch);

    for (let i = 0; i < numberOfBatches; i++) {
      const start = i * batch;
      const end = Math.min(len, (i + 1) * batch);
      const data = results.slice(start, end);
      console.log(`Processing batch ${i + 1} of ${numberOfBatches}`);

      await prisma.data.createMany({
        data: data.map((item) => ({
          INSTITUTION: item.INSTITUTION.trim().replace(/\s+/g, " "),
          InstitutionType: item.InstitutionType.trim()
            .replace(/\s+/g, " ")
            .toLowerCase(),
          COURSE: item.COURSE.trim().replace(/\s+/g, " "),
          AdmissionYear: item.AdmissionYear.trim().replace(/\s+/g, " "),
          Abia: parseInt(item.Abia),
          Adamawa: parseInt(item.Adamawa),
          AkwaIbom: parseInt(item.AkwaIbom),
          Anambra: parseInt(item.Anambra),
          Bauchi: parseInt(item.Bauchi),
          Bayelsa: parseInt(item.Bayelsa),
          Benue: parseInt(item.Benue),
          Borno: parseInt(item.Borno),
          CrossRiver: parseInt(item.CrossRiver),
          Delta: parseInt(item.Delta),
          Ebonyi: parseInt(item.Ebonyi),
          Edo: parseInt(item.Edo),
          Ekiti: parseInt(item.Ekiti),
          Enugu: parseInt(item.Enugu),
          Gombe: parseInt(item.Gombe),
          Imo: parseInt(item.Imo),
          Jigawa: parseInt(item.Jigawa),
          Kaduna: parseInt(item.Kaduna),
          Kano: parseInt(item.Kano),
          Katsina: parseInt(item.Katsina),
          Kebbi: parseInt(item.Kebbi),
          Kogi: parseInt(item.Kogi),
          Kwara: parseInt(item.Kwara),
          Lagos: parseInt(item.Lagos),
          Nasarawa: parseInt(item.Nasarawa),
          Niger: parseInt(item.Niger),
          Ogun: parseInt(item.Ogun),
          Ondo: parseInt(item.Ondo),
          Osun: parseInt(item.Osun),
          Oyo: parseInt(item.Oyo),
          Plateau: parseInt(item.Plateau),
          Rivers: parseInt(item.Rivers),
          Sokoto: parseInt(item.Sokoto),
          Taraba: parseInt(item.Taraba),
          Yobe: parseInt(item.Yobe),
          Zamfara: parseInt(item.Zamfara),
          FCT: parseInt(item.FCT),
          Foreign: parseInt(item.Foreign),
          CourseTotal: parseInt(item.CourseTotal),
        })),
      });

      console.log(`Batch ${i + 1} processed successfully.`);
    }

    console.log("Data created successfully.");
  } catch (e) {
    console.error("Error:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
