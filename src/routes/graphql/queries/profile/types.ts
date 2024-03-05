import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: GraphQLString },
  },
});

export const ProfileTypeList = new GraphQLList(ProfileType);
