import { useQuery } from "@tanstack/react-query";

interface InstitutionData {
  institutionType: string;
  data: number;
}

interface KeyType {
  [key: string]: number;
}

type Response = {
  totalInstutionsC: InstitutionData[];
  sortedObjectC: KeyType;
  numberInstutionC: number;
};

export default function useGetCourseDataHook({
  key,
  yearC,
  stateC,
  institutionTypeC,
}: {
  key: (string | string[])[];
  yearC: string[];
  stateC: string[];
  institutionTypeC: string[];
}) {
  return useQuery({
    queryKey: key,
    queryFn: async () => await getData(yearC, stateC, institutionTypeC),
  });
}

async function getData(
  year: string[],
  state: string[],
  institutionType: string[]
): Promise<Response> {
  const data = await fetch(
    `/api/getCourse?yearC=${JSON.stringify(year)}&stateC=${JSON.stringify(
      state
    )}&institutionTypeC=${JSON.stringify(institutionType)}`
  );
  if (!data.ok) {
    throw new Error("something went wrong");
  }
  const response = await data.json();
  return response;
}
