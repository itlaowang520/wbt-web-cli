import { execSync } from 'child_process';
import fsExtra from 'fs-extra';
import { log, Debug } from '@wbt-web-cli/utils';
import { ProjectType } from './constants';

const { errorText } = log;
const debug = Debug(__filename);

/**
 * 初始化项目文件夹
 */
export function initProjectFolder(projectName: string, projectType: string, cwd: string) {
  const branchName = 'master';
  let projectRepo = '';

  switch (projectType) {
    case ProjectType.PC:
      projectRepo = 'https://github.com/itlaowang520/wbt-common-ui-doc.git';
      break;
    case ProjectType.MWEB:
      projectRepo = 'https://github.com/itlaowang520/wbt-common-ui.git';
      break;
    case ProjectType.LIBRARY:
      projectRepo = 'https://github.com/itlaowang520/wbt-common-ui.git';
      break;
    case ProjectType.UTILS:
      projectRepo = 'https://github.com/itlaowang520/wbt-common-ui.git';
      break;
    default:
      break;
  }

  debug(`Init project from git: ${projectRepo} —— ${branchName}`);

  const cmdStr = `cd ${cwd} && git clone ${projectRepo} ${projectName} && cd ${projectName} && git checkout ${branchName}`;

  debug(`CMD str: ${cmdStr}`);

  try {
    execSync(cmdStr, {
      encoding: 'utf-8',
    });
  } catch (err) {
    console.log(errorText(err));
    process.exit(1);
  }

  fsExtra.removeSync(`${projectName}/.git`);
}

export function installDependencies(projectPath: string) {
  debug('Install dependencies');
  const cmdStr = `cd ${projectPath} && yarn`;

  try {
    execSync(cmdStr, {
      encoding: 'utf-8',
      stdio: 'inherit',
    });
  } catch (err) {
    console.log(errorText(err));
    process.exit(1);
  }
}
