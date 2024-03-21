import * as ec2 from "aws-cdk-lib/aws-ec2";
import { StackContext } from "sst/constructs";

export function VPCStack({ app, stack }: StackContext) {
  // const vpc = new ec2.Vpc(stack, "BastionTestVPC", {
  //   maxAzs: 2, // Adjust as needed
  // });
  const vpc = ec2.Vpc.fromLookup(stack, "dev-vpc", {
    vpcName: "dev-vpc",
  });
  const bastionSecurityGroup = new ec2.SecurityGroup(
    stack,
    "bastionSecurityGroup",
    {
      vpc,
      allowAllOutbound: true,
    }
  );
  bastionSecurityGroup.addIngressRule(
    ec2.Peer.anyIpv4(),
    ec2.Port.tcp(22),
    "SSH Access"
  );
  // Create Security Group for RDS
  const rdsSecurityGroup = new ec2.SecurityGroup(stack, "rdsSecurityGroup", {
    vpc,
    allowAllOutbound: true,
  });
  rdsSecurityGroup.addIngressRule(bastionSecurityGroup, ec2.Port.tcp(5432));
  return {
    vpc,
    bastionSecurityGroup,
    rdsSecurityGroup,
  };
}
