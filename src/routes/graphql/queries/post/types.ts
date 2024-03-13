import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { GraphQLContext } from '../../graphQLSchema.js';
import { Post } from '@prisma/client';
import { UserType } from '../user/types.js';

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: UserType as GraphQLObjectType,
      resolve: async (source: Post, _args, { prisma }: GraphQLContext) => {
        return await prisma.user.findUnique({
          where: {
            id: source.authorId,
          },
        });
      },
    },
    authorId: { type: UUIDType },
  }),
});

export const PostTypeList = new GraphQLList(PostType);
