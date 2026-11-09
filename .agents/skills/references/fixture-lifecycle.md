# Playwright Fixture Lifecycle & Dependency Injection Guide

Tài liệu này định nghĩa quy chuẩn về vòng đời (lifecycle) của fixture, cách thức thiết lập `setup`/`teardown`, cơ chế inject Page Object / API Client và gộp cấu hình trong dự án Playwright (`src/fixtures/`).

---

## 1. Vòng đời Fixture & Tự động Inject Page Object

Trong Playwright, fixture quản lý trạng thái, tài nguyên độc lập và đóng vai trò như một **Dependency Injection Container** cho từng test case thông qua hàm callback đi kèm với từ khóa `use`.

* **Setup Phase:** Các thao tác khởi tạo Page Object, API Client hoặc chuẩn bị dữ liệu/phiên đăng nhập được thực hiện **trước** lệnh `await use(...)`.
* **Teardown Phase:** Các thao tác dọn dẹp dữ liệu, đóng kết nối hoặc xóa state được thực hiện **sau** lệnh `await use(...)` (thường được đặt trong khối `try/finally` để đảm bảo luôn chạy kể cả khi test fail).

### Ví dụ mẫu Fixture Inject Page Object (`src/fixtures/e2e/e2e.fixture.ts`):
```typescript
import { test as base } from '@playwright/test';
import { AuthPage } from '@pages/e2e/auth/auth.page';
import { ProductsPage } from '@pages/e2e/products/products.page';

type E2EFixtures = {
  authPage: AuthPage;
  productsPage: ProductsPage;
};

export const test = base.extend<E2EFixtures>({
  authPage: async ({ page }, use) => {
    // 1. SETUP: Khởi tạo Page Object
    const authPage = new AuthPage(page);
    // Cung cấp instance cho test case
    await use(authPage);
    // 2. TEARDOWN (nếu cần): Dọn dẹp sau test
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
});
```

---

## 2. Conf Fixture — Tự động resolve dữ liệu Test Case

`conf.fixture.ts` là fixture đặc biệt tự động tìm và load file JSON data kề với spec đang chạy.

### Logic resolve file data (ưu tiên từ trên xuống):
1. `<specBaseName>.json`              (e.g., `auth.json` cho `auth.spec.ts`)
2. `<specBaseName-without-api>.json`  (e.g., `auth.json` cho `auth-api.spec.ts`)
3. `<dirName>.json`                   (e.g., `auth.json` trong folder `auth/`)
4. `<dirName>-api.json`

### Helpers được tách vào `src/utils/conf.helper.ts`:
```typescript
resolveModuleDataPath(specFilePath)        // Tìm đường dẫn file JSON
loadModuleData(jsonFilePath)               // Đọc & parse JSON
extractCaseKey(tags, title, moduleData)    // Lấy key TC từ tag @TC_...
getCaseData<T>(moduleData, caseId)         // Lấy data theo caseId
```

### Interface ConfFixture:
```typescript
interface ConfFixture {
  global: typeof globalData;         // src/data/global.json
  data: Record<string, any>;         // Toàn bộ file JSON kề spec
  caseData: any;                     // Data của TC hiện tại (auto-detect)
  getCaseData<C>(caseId: string): C; // Lấy data TC theo key
}
```

---

## 3. Cơ chế gộp `mergeTests` tại `src/fixtures/index.ts`

`mergeTests` kết hợp 3 fixture độc lập thành 1 đối tượng `test` dùng chung cho toàn bộ spec files qua alias `@fixtures`:

```typescript
// File: src/fixtures/index.ts
import { mergeTests } from '@playwright/test';
import { test as confTest } from './conf.fixture';
import { test as apiTest } from './api/api.fixture';
import { test as e2eTest } from './e2e/e2e.fixture';

export const test = mergeTests(confTest, apiTest, e2eTest);
export { expect } from '@playwright/test';
export type { ConfFixture } from './conf.fixture';
```

---

## 4. Quy tắc tổ chức Fixture

| Quyết định | Quy tắc |
|---|---|
| Có tách domain-subfolder trong `fixtures/api/` và `fixtures/e2e/`? | **KHÔNG** — giữ phẳng |
| Khi nào tách? | Khi domain có logic setup/teardown riêng (seed DB, mock server, auth token riêng) |
| `conf.fixture.ts` có được viết logic phức tạp? | **KHÔNG** — chỉ gọi helpers từ `src/utils/conf.helper.ts` |
