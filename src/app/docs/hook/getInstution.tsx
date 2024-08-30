import { useQuery } from "@tanstack/react-query";
import { json } from "node:stream/consumers";

interface InstitutionData {
  institutionType: string;
  data: number;
}

interface KeyType {
  [key: string]: number;
}

type Response = {
  totalForInstutions: InstitutionData[];
  sortedInstitutionsObject: KeyType;
  numberofInstution: number;
};

export default function useGetInstutionDataHook({
  key,
  year,
  state,
  institutionType,
}: {
  key: (string | string[])[];
  year: string[];
  state: string[];
  institutionType: string[];
}) {
  return useQuery({
    queryKey: key,
    queryFn: async () => await getData(year, state, institutionType),
  });
}

async function getData(
  year: string[],
  state: string[],
  institutionType: string[]
): Promise<Response> {
  const data = await fetch(
    `/api/instution?year=${JSON.stringify(year)}&state=${JSON.stringify(
      state
    )}&institutionType=${JSON.stringify(institutionType)}`,
    { cache: "no-store" }
  );
  if (!data.ok) {
    throw new Error("something went wrong");
  }
  const response = await data.json();
  return response;
}
