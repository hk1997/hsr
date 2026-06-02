#!/usr/bin/env node
import * as dotenv from 'dotenv';
import * as path from 'path';
// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

import * as cdk from 'aws-cdk-lib';
import { BackendStack } from '../lib/backend-stack';

const app = new cdk.App();
new BackendStack(app, 'MedantaIrRegistryBackendStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT || '597088022793',
    region: process.env.CDK_DEFAULT_REGION || 'ap-south-1'
  },
});
