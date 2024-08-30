import { sortObj } from "@/app/docs/conts/conts";
import prisma from "@/utlis/db";
import { type NextRequest } from "next/server";
import { it } from "node:test";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const value = searchParams.get("year");
  const institutionType = searchParams.get("institutionType");
  const stateParam = searchParams.get("state");
  const year = JSON.parse(value!) as string[];
  const state = JSON.parse(stateParam!) as string[];
  const inType = JSON.parse(institutionType!) as string[];
  const totalInstutions: { [key: string]: number } = {};
  let [data, courseTotal] = await prisma.$transaction([
    prisma.data.findMany({
      orderBy: {
        INSTITUTION: "asc",
      },
      select: {
        Abia: true,
        Adamawa: true,
        AkwaIbom: true,
        Anambra: true,
        Bauchi: true,
        Bayelsa: true,
        Benue: true,
        Borno: true,
        CrossRiver: true,
        Delta: true,
        Ebonyi: true,
        Edo: true,
        Ekiti: true,
        Enugu: true,
        Gombe: true,
        Imo: true,
        Jigawa: true,
        Kaduna: true,
        Kano: true,
        Katsina: true,
        Kebbi: true,
        Kogi: true,
        Kwara: true,
        Lagos: true,
        Nasarawa: true,
        Niger: true,
        Ogun: true,
        Ondo: true,
        Osun: true,
        Oyo: true,
        Plateau: true,
        Rivers: true,
        Sokoto: true,
        Taraba: true,
        Yobe: true,
        Zamfara: true,
        FCT: true,
        Foreign: true,
        AdmissionYear: true,
        CourseTotal: true,
        COURSE: true,
        INSTITUTION: true,
        InstitutionType: true,
      },
    }),
    prisma.data.findMany({
      distinct: ["INSTITUTION"],
    }),
  ]);

  if (year.length > 0) {
    data = data.filter((item) => year.includes(item.AdmissionYear));
  }
  if (inType.length > 0) {
    data = data.filter((item) => inType.includes(item.InstitutionType));
  }

  const numberofInstution = courseTotal.length;

  let totalForInstutions = ["university", "college", "polytechnic"].map(
    (item) => ({
      institutionType: item,
      data: courseTotal.filter((uni) => uni.InstitutionType === item).length,
    })
  );
  data.forEach((item) => {
    if (totalInstutions[item.INSTITUTION]) {
      totalInstutions[item.INSTITUTION] += parseInt(
        state.length > 0 ? getTotal(item, state) : "0"
      );
    } else {
      totalInstutions[item.INSTITUTION] = parseInt(
        state.length > 0 ? getTotal(item, state) : "0"
      );
    }
  });
  const sortedInstitutionsObject = sortObj(totalInstutions);
  return Response.json({
    sortedInstitutionsObject,
    totalForInstutions,
    numberofInstution,
  });
}

function getTotal(item: { [key: string]: string }, state: string[]) {
  let total = 0;
  for (let i of state) {
    total += parseInt(item[i]);
  }

  return total.toString();
}
