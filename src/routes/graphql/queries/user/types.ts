import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat } from 'graphql';
import { UUIDType } from '../../types/uuid.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: UUIDType },
    name: { type: UUIDType },
    balance: { type: GraphQLFloat },
  },
});
