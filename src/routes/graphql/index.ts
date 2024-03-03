import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  createGqlResponseSchema,
  gqlResponseSchema,
  rootValue,
  schema,
  // rootValue,
  // schema,
} from './schemas.js';
import { graphql } from 'graphql';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma, httpErrors } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },

    async handler(req) {
      const query = req.body.query;
      // const data = await prisma.user.findMany();
      const res = await graphql({
        schema,
        source: `{ ${query} }`,
        rootValue,
      });

      return { data: res };
      // return {};
    },
  });
};

export default plugin;
