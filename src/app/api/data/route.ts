import { NextRequest } from "next/server";
import prisma from "@/utlis/db";

const geopoliticalZones = [
  {
    zone: "North Central",
    states: ["Benue", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau", "FCT"],
  },
  {
    zone: "North East",
    states: ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"],
  },
  {
    zone: "North West",
    states: [
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Sokoto",
      "Zamfara",
    ],
  },
  { zone: "South East", states: ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"] },
  {
    zone: "South South",
    states: ["AkwaIbom", "Bayelsa", "CrossRiver", "Delta", "Edo", "Rivers"],
  },
  {
    zone: "South West",
    states: ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
  },
];

const stateColumns = [
  "Abia",
  "Adamawa",
  "AkwaIbom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "CrossRiver",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT",
];

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  let whereClause = {};
  if (query && query.trim() !== "") {
    whereClause = { AdmissionYear: query.trim() };
  }

  const [
    totalAdmission,
    totalsByYear,
    totalsByInstitutionType,
    totalsByYearForForeignStudent,
    stateSums,
    institutionData,
  ] = await Promise.all([
    getTotalAdmission(whereClause),
    getTotalsByYear(whereClause),
    getTotalsByInstitutionType(whereClause),
    getTotalsByYearForForeignStudent(whereClause),
    getStateSums(whereClause),
    getInstitutionData(whereClause),
  ]);

  const regionTotals = computeRegionTotals(stateSums);

  return Response.json({
    totalAdmission,
    regionTotals,
    stateSums,
    institutionData,
    totalsByYear,
    totalsByYearForForeignStudent,
    totalsByInstitutionType,
  });
}

async function getTotalAdmission(whereClause: any) {
  const result = await prisma.data.aggregate({
    _sum: { CourseTotal: true },
    where: whereClause,
  });
  return result._sum.CourseTotal || 0;
}

async function getTotalsByYear(whereClause: any) {
  const results = await prisma.data.groupBy({
    by: ["AdmissionYear"],

    _sum: { CourseTotal: true },
    where: whereClause,
    orderBy: { AdmissionYear: "asc" },
  });
  return Object.fromEntries(
    results.map((r) => [r.AdmissionYear, r._sum.CourseTotal || 0])
  );
}

async function getTotalsByInstitutionType(whereClause: any) {
  const results = await prisma.data.groupBy({
    by: ["InstitutionType"],
    _sum: { CourseTotal: true },
    where: whereClause,
  });
  return Object.fromEntries(
    results.map((r) => [r.InstitutionType, r._sum.CourseTotal || 0])
  );
}

async function getTotalsByYearForForeignStudent(whereClause: any) {
  const results = await prisma.data.groupBy({
    by: ["AdmissionYear"],
    _sum: { Foreign: true },
    where: whereClause,
    orderBy: { AdmissionYear: "asc" },
  });
  return Object.fromEntries(
    results.map((r) => [r.AdmissionYear, r._sum.Foreign || 0])
  );
}

async function getStateSums(whereClause: any) {
  const result = await prisma.data.aggregate({
    _sum: Object.fromEntries(stateColumns.map((state) => [state, true])),
    where: whereClause,
  });
  return result._sum as Record<string, number>;
}

async function getInstitutionData(whereClause: any) {
  const types = ["university", "college", "polytechnic"];
  const results = await Promise.all(
    types.map(async (type) => {
      const result = await prisma.data.aggregate({
        _sum: { CourseTotal: true },
        where: { ...whereClause, InstitutionType: type },
      });
      return { institutionType: type, data: result._sum.CourseTotal || 0 };
    })
  );
  return results;
}

function computeRegionTotals(stateSums: Record<string, number>) {
  return geopoliticalZones.reduce((acc, zone) => {
    acc[zone.zone] = zone.states.reduce(
      (sum, state) => sum + (stateSums[state] || 0),
      0
    );
    return acc;
  }, {} as Record<string, number>);
}
