import { Command } from 'commander';
import { Debug, log } from '@wbt-web-cli/utils';
import { runInit } from '../src';
import ownPkgJSON from '../package.json';

const debug = Debug(__filename);
const program = new Command();
const { infoText, errorText } = log;

program
  .description(infoText('命令行工具'))
  .version(ownPkgJSON.version, '-v, --version')
  .usage('<command> [command-options]');

program
  .command('init')
  .description('项目初始化')
  .option('--force', `强制删除并重新初始化模板目录[${errorText('DANGROUS')}]`)
  .option('--config [config]', '初始化配置参数')
  .action(async (
    options: {
      config: string;
      force: boolean;
    },
  ) => {
    debug('Init Project');
    const { force, config } = options;
    await runInit({
      isForce: force,
      config,
    });
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
