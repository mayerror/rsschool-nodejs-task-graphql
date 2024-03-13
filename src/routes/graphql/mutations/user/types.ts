import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../types/uuid.js';

export type CreateUserType = {
  dto: {
    name: string;
    balance: number;
  };
};

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(UUIDType),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});
