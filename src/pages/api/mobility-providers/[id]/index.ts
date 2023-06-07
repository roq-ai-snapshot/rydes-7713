import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { mobilityProviderValidationSchema } from 'validationSchema/mobility-providers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.mobility_provider
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMobilityProviderById();
    case 'PUT':
      return updateMobilityProviderById();
    case 'DELETE':
      return deleteMobilityProviderById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMobilityProviderById() {
    const data = await prisma.mobility_provider.findFirst(convertQueryToPrismaUtil(req.query, 'mobility_provider'));
    return res.status(200).json(data);
  }

  async function updateMobilityProviderById() {
    await mobilityProviderValidationSchema.validate(req.body);
    const data = await prisma.mobility_provider.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteMobilityProviderById() {
    const data = await prisma.mobility_provider.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
