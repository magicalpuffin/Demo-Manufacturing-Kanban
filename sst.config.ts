import { SSTConfig } from "sst";
import { APIStack } from "./stacks/APIStack";
import { VPCStack } from "./stacks/VPCStack";
import { RDSStack } from "./stacks/RDSStack";

export default {
  config(_input) {
    return {
      name: "Demo-Manufacturing-Kanban",
      region: "us-west-1",
    };
  },
  stacks(app) {
    app.stack(VPCStack).stack(RDSStack).stack(APIStack);
  },
} satisfies SSTConfig;
