import { warningText } from './log';

/**
 * 延时函数
 * @param ms 毫秒
 * @param showCount 是否展示倒计时
 */
export async function delay(ms: number, showCount: boolean) {
  let currMS = ms;
  if (showCount) {
    if (ms > 1000) {
      const timer = setInterval(() => {
        currMS -= 1000;
        console.log(warningText(currMS / 1000));
        if (currMS === 1000) {
          clearInterval(timer);
        }
      }, 1000);
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}
