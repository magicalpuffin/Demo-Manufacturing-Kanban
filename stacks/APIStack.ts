import { StackContext, Api, use } from "sst/constructs";
import { RDSStack } from "./RDSStack";

export function APIStack({ stack }: StackContext) {
  const { rds } = use(RDSStack);

  stack.setDefaultFunctionProps({
    bind: [rds],
  });
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /part": "packages/functions/src/part.list",
      "POST /part": "packages/functions/src/part.create",
      "GET /part/{id}": "packages/functions/src/part.get",
      "PUT /part/{id}": "packages/functions/src/part.update",
      "DELETE /part/{id}": "packages/functions/src/part.remove",
      //   "GET /location": "",
      //   "POST /location": "",
      //   "GET /location/{id}": "",
      //   "PUT /location/{id}": "",
      //   "DELETE /location/{id}": "",
      //   "GET /workorder": "",
      //   "POST /workorder": "",
      //   "GET /workorder/{id}": "",
      //   "PUT /workorder/{id}": "",
      //   "DELETE /workorder/{id}": "",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
