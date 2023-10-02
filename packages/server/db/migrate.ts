import { watch as runThroughCurrent } from "graphile-migrate";
import { watch } from "fs";

import { connectionConfig } from "./connection";

let ALLOW_OTHERS = true;

export const migrateWatch = () => {
  watch("./db/migrations", async (eventType, filename) => {
    if (!ALLOW_OTHERS) {
      return;
    }

    ALLOW_OTHERS = false;

    await runThroughCurrent(
      {
        connectionString: connectionConfig.connectionString,
        migrationsFolder: "./db/migrations",
        afterCurrent: [
          {
            _: "command",
            command: "bun db:codegen",
          },
        ],
      },
      true
    );

    ALLOW_OTHERS = true;

    Bun.spawn({
      cmd: ["bun", "db:codegen"],
      stdout: "pipe",
    });
  });
};
