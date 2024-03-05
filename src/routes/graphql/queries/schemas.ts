import { PrismaClient } from '@prisma/client';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UserType } from './user/types.js';
import { User } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';

export type GraphQLContext = {
  prisma: PrismaClient;
};

const UserListType = new GraphQLList(UserType);

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserType,
        args: {
          id: {
            type: new GraphQLNonNull(UUIDType),
          },
        },
        resolve: async (_source, args: User, context: GraphQLContext) => {
          return await context.prisma.user.findUnique({
            where: {
              id: args.id,
            },
          });
        },
      },
      users: {
        type: UserListType,
        resolve: async (root, args, context: GraphQLContext) => {
          const users = await context.prisma.user.findMany();
          // const users = await context.prisma.user.findMany({
          //   select: {
          //     id: true,
          //     name: true,
          //     balance: true,
          //   },
          // });
          return users;
        },
      },
    },
  }),
});
