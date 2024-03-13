import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { idEnumType } from '../../queries/memberType/types.js';

export type CreateProfileType = {
  dto: {
    userId: string;
    memberTypeId: string;
    isMale: boolean;
    yearOfBirth: number;
  };
};

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    memberTypeId: {
      type: new GraphQLNonNull(idEnumType),
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});
