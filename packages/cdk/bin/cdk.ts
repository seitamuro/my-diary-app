#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DbStack } from '../lib/db-stack';
import { VpcStack } from '../lib/vpc-stack';

const app = new cdk.App();

const vpcStack = new VpcStack(app, 'VpcStack');
const dbStack = new DbStack(app, 'DbStack', { vpc: vpcStack.vpc });
