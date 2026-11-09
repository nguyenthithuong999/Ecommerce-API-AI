import { test, expect } from '@fixtures';

// KHÔNG import JSON data trực tiếp — dùng conf fixture để tự động resolve
// ❌ import featureData from '@data/feature.data.json';  <-- Cách cũ, không dùng
// ✅ Dùng conf.caseData (auto-detect theo tag @TC_...) hoặc conf.getCaseData('TC_ID')

test.describe('[Feature Module] Test Suite', () => {
  // =========================================================================
  // Chuẩn Tag bắt buộc 3 phần tử (đều có tiền tố @):
  //   ['@TC_FEAT_001', '@MOD_FEATURE', '@smoke']
  //   test_id: @TC_... | module_id: @MOD_... | special_tag: @smoke / @regression
  // =========================================================================

  test(
    'Verify user can perform feature action successfully',
    {
      tag: ['@TC_FEAT_001', '@MOD_FEATURE', '@smoke'],
    },
    // conf: tự động inject data từ file JSON kề spec (tests/<type>/<domain>/<domain>.json)
    // conf.caseData: data của TC đang chạy (key = "TC_FEAT_001")
    async ({ conf, featurePage }) => {
      const { email, expectedMessage } = conf.caseData;

      // 1. Act: Page Object inject tự động qua fixture
      await featurePage.navigate();
      await featurePage.submitForm(email);

      // 2. Assert: Web-first assertions — KHÔNG dùng waitForTimeout()
      await expect(featurePage.headingTitle).toBeVisible();
      await expect(featurePage.headingTitle).toContainText(expectedMessage);
    }
  );

  test(
    'Verify error case',
    {
      tag: ['@TC_FEAT_002', '@MOD_FEATURE', '@regression'],
    },
    async ({ conf, featurePage }) => {
      // Lấy data của TC cụ thể theo key — dùng khi cần data của TC khác
      const data = conf.getCaseData<{ email: string; errorMessage: string }>('TC_FEAT_002');

      await featurePage.navigate();
      await featurePage.submitForm(data.email);
      await expect(featurePage.errorMessage).toContainText(data.errorMessage);
    }
  );
});
