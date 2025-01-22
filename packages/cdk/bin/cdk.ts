#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ApiStack } from "../lib/api-stack";
import { AuthStack } from "../lib/auth-stack";
import { FrontendStack } from "../lib/frontend-stack";

const app = new cdk.App();

const auth = new AuthStack(app, "AuthStack", {});
new ApiStack(app, "ApiStack", {
  userPoolId: auth.userPool.userPoolId,
  userPoolClientId: auth.userPoolClient.userPoolClientId,
});
new FrontendStack(app, "FrontendStack", {});
