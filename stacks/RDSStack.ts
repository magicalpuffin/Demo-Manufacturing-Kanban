import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import {
  StackContext,
  Function,
  RDS,
  use,
  dependsOn,
  Script,
} from "sst/constructs";
import { VPCStack } from "./VPCStack";

export function RDSStack({ app, stack }: StackContext) {
  const { vpc, bastionSecurityGroup, rdsSecurityGroup } = use(VPCStack);
  // Create Bastion Host
  // Could use a cheaper instance
  const bastionHost = new ec2.BastionHostLinux(stack, "BastionHost", {
    instanceType: ec2.InstanceType.of(
      ec2.InstanceClass.BURSTABLE4_GRAVITON,
      ec2.InstanceSize.NANO
    ),
    vpc,
    securityGroup: bastionSecurityGroup,
    subnetSelection: {
      subnetType: ec2.SubnetType.PUBLIC,
    },
  });
  // Create RDS Instance
  const rds = new RDS(stack, "rds", {
    engine: "postgresql13.9",
    defaultDatabaseName: "mydb",
    cdk: {
      cluster: {
        vpc,
        vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
        securityGroups: [rdsSecurityGroup],
      },
    },
  });
  stack.addOutputs({
    RDSEndpoint: rds.clusterEndpoint.hostname,
    BastionHostPublicIP: bastionHost.instancePublicIp,
  });

  return { rds, bastionHost };
}

export function MigrateStack({ stack }: StackContext) {
  const { rds } = use(RDSStack);
  dependsOn(RDSStack);

  const migrateFunction = new Function(stack, "MigrateFunction", {
    bind: [rds],
    handler: "packages/functions/src/migrate.handler",
    timeout: "15 minutes",
    enableLiveDev: false,
    copyFiles: [{ from: "drizzle/" }],
  });

  const migrateScript = new Script(stack, "MigrateScript", {
    onCreate: migrateFunction,
    onUpdate: migrateFunction,
  });
}
