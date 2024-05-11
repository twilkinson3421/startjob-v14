import chalk from "chalk";

import { konsole } from "@/utils/console";
import { Handlers } from "@handlers/main";

export namespace Internal_Service {
  export async function action<
    DataType extends Handlers.Basic.AcceptableDataType
  >(
    action: () => Promise<
      Handlers.Basic.Response<DataType> | Handlers.Basic.ServerError
    >
  ): Promise<ReturnType<typeof action>> {
    try {
      return await action();
    } catch (error) {
      if (process.env.NODE_ENV !== "production")
        konsole.err(
          `Failed to execute server action`,
          `${chalk.grey(chalk.italic(error))}`
        );

      return Handlers.Methods.serverError();
    }
  }

  export function sendResponse<
    DataType extends Handlers.Basic.AcceptableDataType
  >(
    status: Handlers.Basic.Response<any>["status"],
    payload: {
      description?: Handlers.Basic.Response<any>["description"];
      data: DataType;
    }
  ): Handlers.Basic.Response<DataType> {
    return {
      status,
      ok: 100 <= status && status < 400,
      message: Handlers.Config.responses[status],
      description: payload.description,
      data: payload.data,
    };
  }
}
