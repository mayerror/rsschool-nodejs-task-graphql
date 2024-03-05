import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UserType, UserTypeList } from './user/types.js';
import { User } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import { MemberType, MemberTypeList } from './memberType/types.js';
import { PostTypeList } from './post/types.js';

export type GraphQLContext = {
  prisma: PrismaClient;
};

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
        resolve: async (_source, args: User, { prisma }: GraphQLContext) => {
          console.log(args);
          const user = await prisma.user.findUnique({
            where: {
              id: args.id,
            },
          });
          return user;
        },
      },
      users: {
        type: UserTypeList,
        resolve: async (_root, _args, context: GraphQLContext) => {
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
      memberTypes: {
        type: MemberTypeList,
        resolve: async (_root, _args, { prisma }: GraphQLContext) => {
          const memberTypes = await prisma.memberType.findMany();
          return memberTypes;
        },
      },
      posts: {
        type: PostTypeList,
        resolve: async (_root, _args, { prisma }: GraphQLContext) => {
          const posts = await prisma.post.findMany();
          return posts;
        },
      },
    },
  }),
});
