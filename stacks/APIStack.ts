import { StackContext, Api, use } from "sst/constructs";
import { RDSStack } from "./RDSStack";

export function APIStack({ stack }: StackContext) {
  const { rds } = use(RDSStack);

  stack.setDefaultFunctionProps({
    bind: [rds],
  });
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/home.list",
      "GET /part": "packages/functions/src/part.list",
      "POST /part": "packages/functions/src/part.create",
      "GET /part/{id}": "packages/functions/src/part.get",
      "PUT /part/{id}": "packages/functions/src/part.update",
      "DELETE /part/{id}": "packages/functions/src/part.remove",
      "GET /location": "packages/functions/src/location.list",
      "POST /location": "packages/functions/src/location.create",
      "PUT /location": "packages/functions/src/location.updateList",
      "GET /location/{id}": "packages/functions/src/location.get",
      "PUT /location/{id}": "packages/functions/src/location.update",
      "DELETE /location/{id}": "packages/functions/src/location.remove",
      "GET /workorder": "packages/functions/src/workorder.list",
      "POST /workorder": "packages/functions/src/workorder.create",
      "GET /workorder/{id}": "packages/functions/src/workorder.get",
      "PUT /workorder/{id}": "packages/functions/src/workorder.update",
      "DELETE /workorder/{id}": "packages/functions/src/workorder.remove",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
