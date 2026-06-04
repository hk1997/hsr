import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as path from 'path';
import * as fs from 'fs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Define DynamoDB Table (Phase 7 & Phase 10)
    const casesTable = new dynamodb.Table(this, 'FnaCases', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Cost-effective for unpredictable workloads
      removalPolicy: cdk.RemovalPolicy.RETAIN, // Keep data safe on stack deletion
    });

    const doctorsTable = new dynamodb.Table(this, 'FnaDoctors', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // 2. Define API Gateway (Phase 7)
    const api = new apigateway.RestApi(this, 'MedantaIrRegistryApi', {
      restApiName: 'Medanta IR Registry API',
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

    const listDoctorsLambda = new lambda.Function(this, 'ListDoctorsFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'listDoctors.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/handlers')),
      environment: {
        TABLE_NAME: doctorsTable.tableName,
      },
    });

    const createDoctorLambda = new lambda.Function(this, 'CreateDoctorFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'createDoctor.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/handlers')),
      environment: {
        TABLE_NAME: doctorsTable.tableName,
      },
    });

    const deleteDoctorLambda = new lambda.Function(this, 'DeleteDoctorFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'deleteDoctor.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src/handlers')),
      environment: {
        TABLE_NAME: doctorsTable.tableName,
      },
    });

    // 4. Grant Permissions (Phase 7 & 10)
    casesTable.grantReadWriteData(createCaseLambda);
    casesTable.grantReadData(listCasesLambda);
    casesTable.grantReadWriteData(updateCaseLambda);

    doctorsTable.grantReadData(listDoctorsLambda);
    doctorsTable.grantReadWriteData(createDoctorLambda);
    doctorsTable.grantReadWriteData(deleteDoctorLambda);

    // 5. Connect API Gateway to Lambda
    const casesResource = api.root.addResource('cases');

    // POST /cases
    casesResource.addMethod('POST', new apigateway.LambdaIntegration(createCaseLambda));

    // GET /cases
    casesResource.addMethod('GET', new apigateway.LambdaIntegration(listCasesLambda));

    // PATCH /cases/{id}
    const singleCaseResource = casesResource.addResource('{id}');
    singleCaseResource.addMethod('PATCH', new apigateway.LambdaIntegration(updateCaseLambda));

    // /doctors Resource
    const doctorsResource = api.root.addResource('doctors');

    // GET /doctors
    doctorsResource.addMethod('GET', new apigateway.LambdaIntegration(listDoctorsLambda));

    // POST /doctors
    doctorsResource.addMethod('POST', new apigateway.LambdaIntegration(createDoctorLambda));

    // DELETE /doctors/{id}
    const singleDoctorResource = doctorsResource.addResource('{id}');
    singleDoctorResource.addMethod('DELETE', new apigateway.LambdaIntegration(deleteDoctorLambda));

    // Output the API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'The root URL of the API Gateway',
    });

    // Ensure the frontend dist directory exists (synthesis safeguard)
    const distPath = path.join(__dirname, '../../dist');
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath, { recursive: true });
      fs.writeFileSync(path.join(distPath, 'index.html'), '<html><body>Medanta IR Registry Mock Frontend</body></html>');
    }

    // 6. Define S3 Bucket for Static Website Hosting
    const websiteBucket = new s3.Bucket(this, 'MedantaIrRegistryWebsite', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // 8. Look up the Route53 Hosted Zone
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'irflo.net',
    });

    // 9. Request SSL Certificate in us-east-1 for CloudFront
    const certificate = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
      domainName: 'irflo.net',
      hostedZone,
      region: 'us-east-1',
    });

    // 10. Create CloudFront Distribution pointing to S3 website origin
    const distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      defaultBehavior: {
        origin: new origins.HttpOrigin(websiteBucket.bucketWebsiteDomainName, {
          protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
      },
      domainNames: ['irflo.net'],
      certificate,
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/medanta/thyroidfna/index.html',
          ttl: cdk.Duration.seconds(0),
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/medanta/thyroidfna/index.html',
          ttl: cdk.Duration.seconds(0),
        },
      ],
    });

    // 7. Deploy Website Assets to S3 under medanta/thyroidfna prefix.
    //    Wired to the CloudFront distribution so each deploy invalidates the
    //    cache (otherwise CloudFront keeps serving a stale index.html that
    //    references old, hashed asset bundles).
    new s3deploy.BucketDeployment(this, 'DeployMedantaIrRegistryWebsite', {
      sources: [s3deploy.Source.asset(distPath)],
      destinationBucket: websiteBucket,
      destinationKeyPrefix: 'medanta/thyroidfna',
      distribution,
      distributionPaths: ['/*'],
    });

    // 11. Create Route53 ARecord Alias pointing to CloudFront Distribution
    new route53.ARecord(this, 'SiteAliasRecord', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    });

    // Output the Website URL
    new cdk.CfnOutput(this, 'WebsiteUrl', {
      value: 'https://irflo.net/medanta/thyroidfna',
      description: 'The custom domain URL hosting the frontend',
    });
  }
}
