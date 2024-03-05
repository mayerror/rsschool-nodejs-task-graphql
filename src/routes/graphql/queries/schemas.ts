import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { UserType, UserTypeList } from './user/types.js';
import { User } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import { MemberType, MemberTypeList } from './memberType/types.js';
import { PostTypeList } from './post/types.js';
import { ProfileTypeList } from './profile/types.js';

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
      memberType: {
        type: MemberType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: async (_source, args: { id: string }, { prisma }: GraphQLContext) => {
          const member = await prisma.memberType.findUnique({
            where: {
              id: args.id,
            },
          });
          return member;
        },
      },
      posts: {
        type: PostTypeList,
        resolve: async (_root, _args, { prisma }: GraphQLContext) => {
          const posts = await prisma.post.findMany();
          return posts;
        },
      },
      profiles: {
        type: ProfileTypeList,
        resolve: async (_root, _args, { prisma }: GraphQLContext) => {
          const profiles = await prisma.profile.findMany();
          return profiles;
        },
      },
    },
  }),
});
