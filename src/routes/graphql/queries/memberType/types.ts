import {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLEnumType,
} from 'graphql';
import { ProfileTypeList } from '../profile/types.js';
import { MemberType } from '@prisma/client';
import { GraphQLContext } from '../../graphQLSchema.js';

export const idEnumType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: {
      value: 'basic',
    },
    business: {
      value: 'business',
    },
  },
});

export const MemberTypeG = new GraphQLObjectType({
  name: 'MemberType',
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
