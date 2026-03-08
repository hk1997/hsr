import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Define DynamoDB Table (Phase 7)
    const casesTable = new dynamodb.Table(this, 'FnaCases', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Cost-effective for unpredictable workloads
      removalPolicy: cdk.RemovalPolicy.RETAIN, // Keep data safe on stack deletion
    });

    // 2. Define API Gateway (Phase 7)
    const api = new apigateway.RestApi(this, 'HospitalSarthiApi', {
      restApiName: 'Thyroid FNA Service',
      description: 'API for handling offline-first Thyroid FNA form submissions.',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization'],
      },
    });

    // 3. Define Lambda Functions (Phase 8 scaffolding)
    const createCaseLambda = new lambda.Function(this, 'CreateCaseFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'createCase.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/handlers')),
      environment: {
        TABLE_NAME: casesTable.tableName,
      },
    });

    const listCasesLambda = new lambda.Function(this, 'ListCasesFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'listCases.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/handlers')),
      environment: {
        TABLE_NAME: casesTable.tableName,
      },
    });

    const updateCaseLambda = new lambda.Function(this, 'UpdateCaseFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'updateCase.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/handlers')),
      environment: {
        TABLE_NAME: casesTable.tableName,
      },
    });

    // 4. Grant Permissions (Phase 7)
    casesTable.grantReadWriteData(createCaseLambda);
    casesTable.grantReadData(listCasesLambda);
    casesTable.grantReadWriteData(updateCaseLambda);

    // 5. Connect API Gateway to Lambda
    const casesResource = api.root.addResource('cases');

    // POST /cases
    casesResource.addMethod('POST', new apigateway.LambdaIntegration(createCaseLambda));

    // GET /cases
    casesResource.addMethod('GET', new apigateway.LambdaIntegration(listCasesLambda));

    // PATCH /cases/{id}
    const singleCaseResource = casesResource.addResource('{id}');
    singleCaseResource.addMethod('PATCH', new apigateway.LambdaIntegration(updateCaseLambda));

    // Output the API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'The root URL of the API Gateway',
    });
  }
}
