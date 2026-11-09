import { test as base } from '@playwright/test';
import globalData from '@data/global.json';
import {
  resolveModuleDataPath,
  loadModuleData,
  extractCaseKey,
  getCaseData,
} from '@utils/conf.helper';

export interface ConfFixture<T = any> {
  global: typeof globalData;
  data: Record<string, any>;
  caseData: T;
  getCaseData: <C = any>(caseId: string) => C;
}

export const test = base.extend<{ conf: ConfFixture }>({
  conf: async ({}, use, testInfo) => {
    const jsonFilePath = resolveModuleDataPath(testInfo.file);
    const moduleData = loadModuleData(jsonFilePath);
    const tcKey = extractCaseKey(testInfo.tags, testInfo.title, moduleData);

    const conf: ConfFixture = {
      global: globalData,
      data: moduleData,
      caseData: tcKey && moduleData[tcKey] ? moduleData[tcKey] : {},
      getCaseData: <C = any>(caseId: string): C => getCaseData<C>(moduleData, caseId),
    };

    await use(conf);
  },
});

export { expect } from '@playwright/test';
