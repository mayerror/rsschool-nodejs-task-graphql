import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLEnumType,
} from 'graphql';
import { MemberTypeId } from '../../../member-types/schemas.js';
import { ProfileTypeList, ProfileType } from '../profile/types.js';
import { MemberType } from '@prisma/client';
import { GraphQLContext } from '../../graphQLSchema.js';

export const idEnumType = new GraphQLEnumType({
  name: 'IdType',
  values: {
    basic: {
      value: MemberTypeId.BASIC,
    },
    business: {
      value: MemberTypeId.BUSINESS,
    },
  },
});

export const MemberTypeG = new GraphQLObjectType({
  name: 'MemberTypeG',
  fields: () => ({
    id: { type: idEnumType },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: ProfileTypeList as GraphQLList<GraphQLObjectType>,
      resolve: async (source: MemberType, _args, { prisma }: GraphQLContext) => {
        return await prisma.profile.findMany({
          where: {
            memberTypeId: source.id,
          },
        });
      },
    },
  }),
});

export const MemberTypeList = new GraphQLList(MemberTypeG);
