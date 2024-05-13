import chalk from "chalk";

export namespace konsole {
  export namespace Internal {
    export function logReason(reason?: string) {
      return `${
        reason
          ? `\n${chalk.bgBlue(chalk.bold(" REASON "))} ${chalk.grey(
              chalk.italic(reason)
            )}\n`
          : `\n`
      }`;
    }
  }

  export function err(message: string, reason?: any) {
    console.error(
      `${chalk.bgRed(
        chalk.bold(" ERROR ")
      )} ${message}${konsole.Internal.logReason(reason)}`
    );
  }

  export function warn(message: string, reason?: any) {
    console.warn(
      `${chalk.bgYellow(
        chalk.black(chalk.bold(" WARN "))
      )} ${message}${konsole.Internal.logReason(reason)}`
    );
  }

  export function info(message: string) {
    console.info(`${chalk.bgBlue(chalk.bold(" INFO "))} ${message}\n`);
  }
}
