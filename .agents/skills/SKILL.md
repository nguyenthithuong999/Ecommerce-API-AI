# Skill: Hướng Dẫn Phát Triển Module Kiểm Thử Mới

Tài liệu quy trình chuẩn hóa các bước tạo mới Page Object, API Client, Fixture và Test Spec theo kiến trúc phân tách `src/pages/api/<domain>` và `src/pages/e2e/<domain>`.

## 1. Bản đồ tài nguyên tham chiếu (Resource Sitemap)
| Phân loại | Tài nguyên | Mô tả quy định |
| :--- | :--- | :--- |
| **Quy định Tag** | [tagging-rules.md](./references/tagging-rules.md) | Bắt buộc tag 3 items có tiền tố `@`: `['@test_id', '@module_id', '@special_tags']`. |
| **Vòng đời Fixture** | [fixture-lifecycle.md](./references/fixture-lifecycle.md) | Cơ chế setup/teardown với `use()` và gộp qua `mergeTests`. |
| **Page Template** | [page.template.ts](./assets/page.template.ts) | File mẫu Page Object chuẩn kế thừa `BasePage` trong `src/pages/e2e/<domain>/`. |
| **Spec Template** | [spec.template.ts](./assets/spec.template.ts) | File mẫu Test Spec chuẩn trong `tests/` sử dụng `conf` fixture và data kề spec. |

---

## 2. Quy trình 5 bước phát triển (5-Step Workflow)

```text
[1. Test Data] -> [2. Page / API Object] -> [3. Custom Fixture] -> [4. Merge Fixture] -> [5. Test Spec]
```

### Bước 1: Chuẩn bị Test Data (Không Hardcode)

**Dữ liệu riêng của domain** — Tạo file JSON CÙNG THƯ MỤC với spec:
- E2E: `tests/e2e/<domain>/<domain>.json`
- API: `tests/api/<domain>/<domain>-api.json`

Key trong JSON = TC ID (không có `@`):
```json
{
  "TC_UI_01": {
    "email": "test@example.com",
    "password": "Test@1234",
    "expectedMessage": "Account Created!"
  },
  "TC_UI_02": {
    "email": "valid@example.com",
    "password": "Valid@123"
  }
}
```

**Dữ liệu dùng chung toàn cục** — Chỉ khai báo tại `src/data/global.json`:
```json
{
  "baseUrl": "https://automationexercise.com",
  "apiBaseUrl": "https://automationexercise.com/api",
  "defaultTimeout": 10000,
  "defaultUser": { "title": "Mr", "name": "Standard Test User", "country": "United States" }
}
```
> **KHÔNG** tạo thêm file nào trong `src/data/` ngoài `global.json`.

### Bước 2: Tạo Page Object (UI) hoặc API Client (API) theo Domain

**UI — Page Object:**
- Tạo file tại `src/pages/e2e/<domain>/[feature].page.ts`, kế thừa `BasePage`.
- Thứ tự ưu tiên khai báo locator trong `constructor()`:
  1. `page.getByRole()`, `page.getByLabel()`, `page.getByPlaceholder()`, `page.getByText()`, `page.getByTestId()`
  2. `page.locator('input[data-qa="..."]')`, `page.locator('#id')`, `page.locator('.stable-class')`
  3. `page.locator('xpath=...')` — chỉ khi CSS/semantic không khả thi, kèm comment lý do
- Fallback với `.or()`: `page.getByRole(...).or(page.locator('a[href="..."]'))`

**API — API Client:**
- Tạo file tại `src/pages/api/<domain>/[feature].api.ts`, kế thừa `BaseApi`.
- `BaseApi` tự động đọc URL từ `process.env.API_BASE_URL || globalData.apiBaseUrl`.

### Bước 3: Đăng ký vào Custom Fixture
- UI: thêm vào `src/fixtures/e2e/e2e.fixture.ts`
- API: thêm vào `src/fixtures/api/api.fixture.ts`
- **Giữ phẳng** — KHÔNG tạo subfolder domain trong `src/fixtures/api/` hoặc `src/fixtures/e2e/`.

### Bước 4: Kiểm tra gộp Fixture
Đảm bảo `src/fixtures/index.ts` đang merge đủ 3 fixtures:
```typescript
export const test = mergeTests(confTest, apiTest, e2eTest);
```

### Bước 5: Viết Test Spec theo Domain

- Tạo spec tại `tests/e2e/<domain>/` hoặc `tests/api/<domain>/`.
- Import `test, expect` từ `@fixtures`.
- **KHÔNG import JSON data trực tiếp** — dùng `conf.caseData` hoặc `conf.getCaseData('TC_ID')`.
- Gắn thẻ tag đúng chuẩn 3 phần tử: `['@TC_XXX', '@MOD_XXX', '@tag']`.
- `conf.caseData` tự động resolve data theo tag `@TC_...` đang chạy.

---

## 3. Quy tắc Locator (Locator Hierarchy)

```
Playwright Semantic  >  CSS (data-qa / #id)  >  XPath (tối hạn)
```

| Loại | Ví dụ | Khi nào dùng |
|------|-------|--------------|
| `getByRole` | `page.getByRole('button', { name: /submit/i })` | Luôn thử trước |
| `getByLabel` | `page.getByLabel('Email')` | Input có label |
| `getByPlaceholder` | `page.getByPlaceholder('Enter email')` | Input có placeholder |
| `getByTestId` | `page.getByTestId('submit-btn')` | Có `data-testid` |
| CSS `data-qa` | `page.locator('input[data-qa="email"]')` | Form inputs không có label |
| CSS `#id` | `page.locator('#search_product')` | ID ổn định |
| XPath | `page.locator('xpath=...')` | Last resort + comment |

---

## 4. Kiểm tra và thực thi

```bash
# Chạy toàn bộ test
npx playwright test

# Chạy E2E
npx playwright test tests/e2e/ --project=e2e-chromium

# Chạy API
npx playwright test tests/api/ --project=api

# Chạy theo tag
npx playwright test --grep "@smoke"

# TypeScript check
npx tsc --noEmit
```
