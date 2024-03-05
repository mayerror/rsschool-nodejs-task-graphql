import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { UserType, UserTypeList } from './queries/user/types.js';
import { UUIDType } from './types/uuid.js';
import { MemberTypeG, MemberTypeList, idEnumType } from './queries/memberType/types.js';
import { PostType, PostTypeList } from './queries/post/types.js';
import { ProfileType, ProfileTypeList } from './queries/profile/types.js';

export type GraphQLContext = {
  prisma: PrismaClient;
};

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserType as GraphQLObjectType,
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
        type: MemberTypeG as GraphQLObjectType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
            // type: new GraphQLNonNull(idEnumType),
          },
        },
        resolve: async (_source, args: MemberType, { prisma }: GraphQLContext) => {
          const member = await prisma.memberType.findUnique({
            where: {
              id: args.id,
            },
          });
          return member;
        },
      },
      posts: {
        type: PostTypeList as GraphQLList<GraphQLObjectType>,
        resolve: async (_root, _args, { prisma }: GraphQLContext) => {
          const posts = await prisma.post.findMany();
          return posts;
        },
      },
      post: {
        type: PostType as GraphQLObjectType,
        args: {
          id: {
            type: new GraphQLNonNull(UUIDType),
          },
        },
        resolve: async (_source, args: Post, { prisma }: GraphQLContext) => {
          const post = await prisma.post.findUnique({
            where: {
              id: args.id,
            },
          });
          return post;
        },
      },
      profiles: {
        type: ProfileTypeList as GraphQLList<GraphQLObjectType>,
        resolve: async (_root, _args, { prisma }: GraphQLContext) => {
          const profiles = await prisma.profile.findMany();
          return profiles;
        },
      },
      profile: {
        type: ProfileType as GraphQLObjectType,
        args: {
          id: {
            type: new GraphQLNonNull(UUIDType),
          },
        },
        resolve: async (_source, args: Profile, { prisma }: GraphQLContext) => {
          const profile = await prisma.profile.findUnique({
            where: {
              id: args.id,
            },
          });
          return profile;
        },
      },
    },
  }),
});
