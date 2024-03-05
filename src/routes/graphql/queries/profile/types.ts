import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { UserType } from '../user/types.js';
import { GraphQLContext } from '../../graphQLSchema.js';
import { Profile } from '@prisma/client';
import { MemberTypeG } from '../memberType/types.js';

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: GraphQLString },
    user: {
      type: UserType as GraphQLObjectType,
      resolve: async (source: Profile, _args, { prisma }: GraphQLContext) => {
        return await prisma.user.findUnique({
          where: {
            id: source.userId,
          },
        });
      },
    },
    memberType: {
      type: MemberTypeG as GraphQLObjectType,
      resolve: async (source: Profile, _args, { prisma }: GraphQLContext) => {
        return await prisma.memberType.findUnique({
          where: {
            id: source.memberTypeId,
          },
        });
      },
    },
  }),
});

export const ProfileTypeList = new GraphQLList(ProfileType);
