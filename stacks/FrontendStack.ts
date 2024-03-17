import { StackContext, SvelteKitSite, use } from "sst/constructs";
import { APIStack } from "./APIStack";
import { RDSStack } from "./RDSStack";

export function FrontendStack({ app, stack }: StackContext) {
  const { api } = use(APIStack);

  const frontend = new SvelteKitSite(stack, "frontend", {
    path: "packages/frontend/",
    environment: { PUBLIC_API_URL: api.url },
    customDomain: {
      domainName: "demo.kanban.puffinsystems.com",
      hostedZone: "puffinsystems.com",
    },
  });
  stack.addOutputs({ FrontendUrl: frontend.url });
}
