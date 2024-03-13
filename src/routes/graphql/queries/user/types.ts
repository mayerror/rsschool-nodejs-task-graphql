import { GraphQLObjectType, GraphQLFloat, GraphQLList } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from '../profile/types.js';
import { GraphQLContext } from '../../graphQLSchema.js';
import { Post, User } from '@prisma/client';
import { PostTypeList } from '../post/types.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: UUIDType },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async (source: User, _args, { prisma }: GraphQLContext) => {
        return await prisma.profile.findUnique({
          where: {
            userId: source.id,
          },
        });
      },
    },
    posts: {
      type: PostTypeList as GraphQLList<GraphQLObjectType>,
      resolve: async (source: User, _args, { prisma }: GraphQLContext) => {
        return await prisma.post.findMany({
          where: {
            authorId: source.id,
          },
        });
      },
    },
    userSubscribedTo: {
      type: UserTypeList as GraphQLList<GraphQLObjectType>,
      resolve: async (source: User, _args, { prisma }: GraphQLContext) => {
        return await prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: source.id,
              },
            },
          },
        });
      },
    },
    subscribedToUser: {
      type: UserTypeList as GraphQLList<GraphQLObjectType>,
      resolve: async (source: User, _args, { prisma }: GraphQLContext) => {
        return await prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: source.id,
              },
            },
          },
        });
      },
    },
  }),
});

export const UserTypeList = new GraphQLList(UserType);
