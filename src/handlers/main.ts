import { ValueOf } from "next/dist/shared/lib/constants";

import { Internal_Service } from "@handlers/service";

export namespace Handlers {
  export namespace Basic {
    export type AcceptableDataType =
      | string
      | number
      | boolean
      | object
      | null
      | Function
      | Array<any>
      | Date
      | Promise<AcceptableDataType>
      | Buffer;

    export type Response<DataType extends AcceptableDataType> = {
      status: keyof typeof Handlers.Config.responses;
      ok: boolean;
      message?: ValueOf<typeof Handlers.Config.responses>;
      description?: string;
      data: DataType;
    };

    export interface ServerError extends Response<null> {
      ok: false;
      status: 500;
      message: (typeof Config.responses)[500];
      data: null;
    }
  }

  export namespace Config {
    export const responses = {
      500: "Internal Server Error",
      501: "Not Implemented",
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not Found",
      406: "Not Acceptable",
      409: "Conflict",
      422: "Unprocessable Entity",
      424: "Failed Dependency",
      200: "OK",
      201: "Created",
    } as const;
  }

  export namespace Methods {
    export function serverError(): Handlers.Basic.ServerError {
      return {
        ok: false,
        status: 500,
        message: Config.responses[500],
        data: null,
      };
    }
  }

  export namespace Service {
    export const { action, sendResponse } = Internal_Service;
  }
}
