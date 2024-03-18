import {
  CreateAWSLambdaContextOptions,
  awsLambdaRequestHandler,
} from "@trpc/server/adapters/aws-lambda";
import { appRouter } from "@Demo-Manufacturing-Kanban/core/router";

import type { APIGatewayProxyEventV2 } from "aws-lambda";

const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});

// import { ApiHandler } from "sst/node/api";

// export const handler = ApiHandler(async (_evt) => {
//   return {
//     statusCode: 200,
//     body: `Hello world. The time is ${new Date().toISOString()}`,
//   };
// });
