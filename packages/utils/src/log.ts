import chalk from 'chalk';
import figlet from 'figlet';

/**
 * 通知信息
 */
export const infoText = chalk.blue;

/**
 * 错误信息
 */
export const errorText = chalk.red;

/**
 * 成功信息
 */
export const successText = chalk.green;

/**
 * 警告信息
 */
export const warningText = chalk.yellow;

export function info(message: string) {
  console.log(infoText(message));
}

export function error(message: string) {
  console.log(errorText(message));
}

export function success(message: string) {
  console.log(successText(message));
}

export function warning(message: string) {
  console.log(warningText(message));
}

/**
 * 装逼专用文字
 */
export function createSplash(str: string) {
  console.log(chalk.white(figlet.textSync(str, {
    horizontalLayout: 'default',
    verticalLayout: 'default',
  })));
}