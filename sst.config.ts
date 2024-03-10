import { SSTConfig } from "sst";
import { APIStack } from "./stacks/APIStack";
import { VPCStack } from "./stacks/VPCStack";
import { MigrateStack, RDSStack } from "./stacks/RDSStack";
import { FrontendStack } from "./stacks/FrontendStack";

export default {
  config(_input) {
    return {
      name: "Demo-Manufacturing-Kanban",
      region: "us-west-1",
    };
  },
  stacks(app) {
    app
      .stack(VPCStack)
      .stack(RDSStack)
      .stack(MigrateStack)
      .stack(APIStack)
      .stack(FrontendStack);
  },
} satisfies SSTConfig;
