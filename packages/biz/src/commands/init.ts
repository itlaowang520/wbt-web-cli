import path from 'path';
import { prompt } from 'inquirer';
import fsExtra from 'fs-extra';
import { stringFormator, log, Debug, delay } from '@wbt-web-cli/utils';
import { initProjectFolder, installDependencies } from '../utils/initProject';
import { ProjectType } from '../utils/constants';

const { infoText, successText, warningText, errorText, createSplash } = log;
const debug = Debug(__filename);

export interface InitConfig {
  projectName: string;
  projectType: string;
}

export const runInit = async (options: {
  config: string,
  isForce: boolean,
}) => {
  const { config: quickConfig, isForce } = options;
  const config: InitConfig = quickConfig && JSON.parse(quickConfig);
  const questions = [
    {
      type: 'list',
      name: 'projectType',
      message: '项目类型',
      choices: [
        ProjectType.PC,
        ProjectType.MWEB,
        ProjectType.UTILS,
        ProjectType.LIBRARY,
      ],
    },
    {
      type: 'input',
      name: 'projectName',
      message: '项目名称',
      validate: (value: string) => {
        if (!value) {
          return '请输入项目名称';
        }
        if (stringFormator.isChinese(value)) {
          return '请输入英文名称';
        }
        if (fsExtra.existsSync(value) && !isForce) {
          return '目录已经存在，请重新命名！';
        }
        return true;
      },
    },
    {
      type: 'confirm',
      message: '确认要在当前目录创建该项目吗？',
      name: 'isConfirm',
      prefix: '提示: ',
    },
  ];
  const { projectType = '', projectName = '' } = config || await prompt(questions);
  const cwd = process.cwd();
  const projectPath = path.join(process.cwd(), projectName);

  debug(`Run Init Command —— projectName: ${projectName}, projectPath: ${projectPath}`);

  if (fsExtra.existsSync(projectName) && isForce) {
    const delayLength = 5;
    // 强制删除目录
    console.log(warningText(`将会删除已经存在的目录 ${projectName}, 你有 ${delayLength} 秒钟时间取消(CTRL+C)`));
    await delay(delayLength * 1000, true);
    console.log(errorText(`删除目标目录 ${projectName}...`));
    fsExtra.removeSync(projectName);
  }


  console.log(infoText('\n开始生成...\n'));
  // TODO: 拉取项目代码
  initProjectFolder(projectName, projectType, cwd);
  console.log(infoText('\n正在安装依赖\n'));
  installDependencies(projectPath);
  console.log(successText('\n生成完成😊\n'));
  console.log(createSplash('BIZ CLI'));
};

