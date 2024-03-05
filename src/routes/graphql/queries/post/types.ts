import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { UUIDType } from '../../types/uuid.js';

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
  },
});

export const PostTypeList = new GraphQLList(PostType);
