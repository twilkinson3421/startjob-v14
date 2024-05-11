import { UserModel } from "@/models/user";

declare namespace FormTypes {
  export namespace Basic {}

  export namespace Expect {
    export type Register = {
      firstName: UserModel["firstName"];
      lastName: UserModel["lastName"];
      email: UserModel["email"];
      password: string;
      confirmPassword: string;
    };
  }
}
