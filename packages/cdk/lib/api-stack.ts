import * as cdk from 'aws-cdk-lib';
import * as api from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

interface ApiStackProps extends cdk.StackProps {
  userPoolId: string;
  userPoolClientId: string;
}

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const lambda = new NodejsFunction(this, 'ApiHandler', {
      entry: 'lambda/index.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_20_X,
      bundling: {
        sourceMap: true,
      },
      environment: {
        USER_POOL_ID: props.userPoolId,
        USER_POOL_CLIENT_ID: props.userPoolClientId,
      },
    });
    const restApi = new api.LambdaRestApi(this, 'Api', {
      handler: lambda,
    });

    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: restApi.url,
    });
  }
}
