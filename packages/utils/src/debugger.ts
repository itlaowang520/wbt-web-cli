import debug from 'debug';
import path from 'path';

/**
 * 创建debugger
 * @param name 文件名
 */
export default function Debug(name: string) {
  let debugLabel = name;
  if (name.includes('.js')) {
    debugLabel = path.basename(name, '.js');
  }
  return debug(`wbt: ${debugLabel} ----> `);
}
