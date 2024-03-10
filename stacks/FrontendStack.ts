import { StackContext, SvelteKitSite, use } from "sst/constructs";
import { APIStack } from "./APIStack";
import { RDSStack } from "./RDSStack";

export function FrontendStack({ app, stack }: StackContext) {
  //   const { rds } = use(RDSStack);
  const { api } = use(APIStack);

  // Requires two deploys, first without site
  // https://github.com/sst/sst/issues/3698
  const frontend = new SvelteKitSite(stack, "frontend", {
    // bind: [api, rds],
    path: "packages/frontend/",
    environment: { PUBLIC_API_URL: api.url },
  });
  stack.addOutputs({ FrontendUrl: frontend.url });
}
