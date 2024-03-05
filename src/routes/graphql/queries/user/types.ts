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
        const favList = await prisma.subscribersOnAuthors.findMany({
          where: {
            subscriberId: source.id,
          },
        });
        const idFavList = favList.map((user) => user.authorId);
        const authors = await prisma.user.findMany();
        const result = authors.filter((author) => idFavList.includes(author.id));
        console.log(authors);
        console.log(idFavList);
        return result;
      },
    },
  }),
});

export const UserTypeList = new GraphQLList(UserType);
