import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { schema } from './queries/schemas.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

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
      const variables = req.body.variables;

      console.log('query === ', query);
      const res = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: { prisma },
      });
      return res;
    },
  });
};

export default plugin;
