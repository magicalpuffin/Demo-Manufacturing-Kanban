import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { StackContext, SvelteKitSite, use } from "sst/constructs";
import { APIStack } from "./APIStack";

export function FrontendStack({ app, stack }: StackContext) {
  const { api } = use(APIStack);

  const frontend = new SvelteKitSite(stack, "frontend", {
    path: "packages/frontend/",
    environment: { PUBLIC_API_URL: api.url },
    customDomain: {
      isExternalDomain: true,
      domainName: "demo.kanban.puffinsystems.com",
      cdk: {
        certificate: Certificate.fromCertificateArn(
          stack,
          "mycert",
          process.env.CERT_ARN ?? ""
        ),
      },
    },
  });
  stack.addOutputs({ FrontendUrl: frontend.url });
}
