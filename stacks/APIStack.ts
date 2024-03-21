import { StackContext, Api, use } from "sst/constructs";
import { RDSStack } from "./RDSStack";

export function APIStack({ stack }: StackContext) {
  const { rds } = use(RDSStack);

  stack.setDefaultFunctionProps({
    bind: [rds],
  });
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        timeout: "60 seconds",
      },
    },
    routes: {
      "GET /{proxy+}": "packages/functions/src/lambda.handler",
      "POST /{proxy+}": "packages/functions/src/lambda.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
