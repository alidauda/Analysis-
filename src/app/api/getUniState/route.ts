// import prisma from '@/utlis/db';

// export async function POST(req: Request) {
//   const { state, institutionType } = (await req.json()) as {
//     institutionType: string;
//     state: string;
//   };

//   const data = await prisma.data.findMany({
//     distinct: ['INSTITUTION'],
//     orderBy: {
//       INSTITUTION: 'asc',
//     },
//     where: {
//       INSTITUTION: {
//         contains: state,
//       },
//       InstitutionType: institutionType,
//     },
//     select: {
//       INSTITUTION: true,
//     },
//   });

//   return Response.json(data);
// }

export async function POST(req: Request) {
  return Response.json({ message: "Hello World" });
}
