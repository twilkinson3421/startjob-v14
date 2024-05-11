import chalk from "chalk";

export const konsole = {
  err(message: string, reason?: any) {
    console.error(
      `${chalk.bgRed(chalk.bold(" ERROR "))} ${message}${
        reason
          ? `\n${chalk.bgBlue(chalk.bold(" REASON "))} ${chalk.grey(
              chalk.italic(reason)
            )}\n`
          : `\n`
      }`
    );
  },
  warn(message: string) {
    console.warn(`${chalk.bgYellow(chalk.bold(" WARN "))} ${message}\n`);
  },
  info(message: string) {
    console.info(`${chalk.bgBlue(chalk.bold(" INFO "))} ${message}\n`);
  },
};
