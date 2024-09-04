import { sortObj } from "@/app/docs/conts/conts";
import prisma from "@/utlis/db";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const yearParam = searchParams.get("yearC");
  const institutionTypeParam = searchParams.get("institutionTypeC");
  const stateParam = searchParams.get("stateC");

  const years = yearParam ? (JSON.parse(yearParam) as string[]) : [];
  const institutionTypes = institutionTypeParam
    ? (JSON.parse(institutionTypeParam) as string[])
    : [];
  const states = stateParam ? (JSON.parse(stateParam) as string[]) : [];

  const [totalInstutions, totalInstutionsC, numberInstutionC] =
    await Promise.all([
      getTotalInstutions(years, institutionTypes, states),
      getTotalInstutionsByType(years, institutionTypes, states),
      getNumberOfInstutions(years, institutionTypes, states),
    ]);

  const sortedObjectC = sortObj(totalInstutions);

  return Response.json({
    sortedObjectC,
    totalInstutionsC,
    numberInstutionC,
  });
}

async function getTotalInstutions(
  years: string[],
  institutionTypes: string[],
  states: string[]
) {
  const totalInstutions: { [key: string]: number } = {};

  const data = await prisma.data.findMany({
    where: {
      AdmissionYear: years.length > 0 ? { in: years } : undefined,
      InstitutionType:
        institutionTypes.length > 0 ? { in: institutionTypes } : undefined,
    },
    select: {
      COURSE: true,
      ...Object.fromEntries(states.map((state) => [state, true])),
    },
  });

  data.forEach((item: { [key: string]: string }) => {
    const stateTotal = states.reduce(
      (total, state) => total + (parseInt(item[state] || "0") || 0),
      0
    );
    if (totalInstutions[item.COURSE]) {
      totalInstutions[item.COURSE] += stateTotal;
    } else {
      totalInstutions[item.COURSE] = stateTotal;
    }
  });

  return totalInstutions;
}

async function getTotalInstutionsByType(
  years: string[],
  institutionTypes: string[],
  states: string[]
) {
  const results = await prisma.data.groupBy({
    by: ["InstitutionType"],
    where: {
      AdmissionYear: years.length > 0 ? { in: years } : undefined,
      InstitutionType:
        institutionTypes.length > 0 ? { in: institutionTypes } : undefined,
    },
    _count: {
      INSTITUTION: true,
    },
  });

  return results.map(({ InstitutionType, _count }) => ({
    institutionType: InstitutionType,
    data: _count.INSTITUTION,
  }));
}

async function getNumberOfInstutions(
  years: string[],
  institutionTypes: string[],
  states: string[]
) {
  const result = await prisma.data.aggregate({
    _count: {
      INSTITUTION: true,
    },
    where: {
      AdmissionYear: years.length > 0 ? { in: years } : undefined,
      InstitutionType:
        institutionTypes.length > 0 ? { in: institutionTypes } : undefined,
    },
  });

  return result._count.INSTITUTION;
}
