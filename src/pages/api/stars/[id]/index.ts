import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { starValidationSchema } from 'validationSchema/stars';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.star
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getStarById();
    case 'PUT':
      return updateStarById();
    case 'DELETE':
      return deleteStarById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStarById() {
    const data = await prisma.star.findFirst(convertQueryToPrismaUtil(req.query, 'star'));
    return res.status(200).json(data);
  }

  async function updateStarById() {
    await starValidationSchema.validate(req.body);
    const data = await prisma.star.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteStarById() {
    const data = await prisma.star.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
