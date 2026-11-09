import { mergeTests } from '@playwright/test';
import { test as confTest } from './conf.fixture';
import { test as apiTest } from './api/api.fixture';
import { test as e2eTest } from './e2e/e2e.fixture';

export const test = mergeTests(confTest, apiTest, e2eTest);
export { expect } from '@playwright/test';
export type { ConfFixture } from './conf.fixture';
