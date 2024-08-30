import prisma from '@/utlis/db';

export async function POST(req: Request) {
  const { institutionType } = (await req.json()) as {
    institutionType: string;
  };
  if (!institutionType) return Response.json([]);

  const data = await prisma.data.findMany({
    distinct: ['INSTITUTION'],
    orderBy: {
      INSTITUTION: 'asc',
    },
    where: {
      InstitutionType: institutionType,
    },
    select: {
      INSTITUTION: true,
    },
  });

  return Response.json(data);
}
