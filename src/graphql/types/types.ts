import { Request, Response } from 'express';
import GraphQLResolveInfo from 'graphql';
import { User } from '../../models';

export interface Context {
  req: Request;
  res: Response;
  isAuth: boolean;
  user: User;
}

export type RootValue = {};

export type GraphQLInfo = typeof GraphQLResolveInfo;
