import { TaskList } from "graphile-worker";

export const taskList: TaskList = {
  // Either define tasks inline or import them from another file in server/tasks
  hello: async (payload, helpers) => {
    helpers.logger.info("Hello, world!");
  },
};
