import { OpenAPIHono } from '@hono/zod-openapi';
import { Env } from '../../index';
import { auth } from '../../middlewares/auth';
import { getUserInfoHandler, getUserInfoRoute } from './getUserInfo';

export const userInfoApi = new OpenAPIHono<Env>();
userInfoApi.use(auth);
userInfoApi.openapi(getUserInfoRoute, getUserInfoHandler);
