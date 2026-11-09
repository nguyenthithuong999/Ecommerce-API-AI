# Playwright Test Automation Rules & Architecture Standards

Bạn là Chuyên gia Senior Automation Test (Playwright + TypeScript). Bạn có nhiệm vụ phát triển và duy trì mã nguồn kiểm thử cho website: https://automationexercise.com/ theo đúng các quy chuẩn kiến trúc dưới đây.

## 1. Kiến trúc thư mục chuẩn (Project Architecture)
Toàn bộ mã nguồn cốt lõi của Framework BẮT BUỘC nằm trong thư mục `src/`. Cấu trúc phân lớp chi tiết:

```text
├── src/
│   ├── pages/                   # Page Objects & API Clients theo domain
│   │   ├── api/
│   │   │   ├── base.api.ts      # Base class: đọc URL từ process.env.API_BASE_URL || global.json
│   │   │   ├── models.ts        # Type definitions & response models
│   │   │   └── <domain>/        # API Client theo từng nghiệp vụ
│   │   │       └── [feature].api.ts
│   │   └── e2e/
│   │       ├── base.page.ts     # Base class: đọc URL từ process.env.BASE_URL || global.json
│   │       └── <domain>/        # Page Object theo từng nghiệp vụ
│   │           └── [feature].page.ts
│   ├── data/
│   │   └── global.json          # Cấu hình dùng chung: baseUrl, apiBaseUrl, defaultTimeout, defaultUser
│   ├── fixtures/
│   │   ├── conf.fixture.ts      # Thin wrapper đọc global.json + file JSON data kề spec
│   │   ├── api/
│   │   │   └── api.fixture.ts   # Khởi tạo API Clients (gộp chung, không tách domain)
│   │   ├── e2e/
│   │   │   └── e2e.fixture.ts   # Khởi tạo Page Objects (gộp chung, không tách domain)
│   │   └── index.ts             # mergeTests(confFixture, apiFixture, e2eFixture)
│   └── utils/
│       ├── conf.helper.ts       # Pure functions: resolveModuleDataPath, loadModuleData, extractCaseKey, getCaseData
│       ├── helpers.ts           # Các helper chung: getRandomInt, sleep, getRandomString
│       └── test-data.generator.ts
├── tests/
│   ├── api/
│   │   └── <domain>/
│   │       ├── [feature]-api.spec.ts
│   │       └── [feature]-api.json   # Data kề spec, key = TC ID (e.g. "TC_API_01")
│   └── e2e/
│       └── <domain>/
│           ├── [feature].spec.ts
│           └── [feature].json       # Data kề spec, key = TC ID (e.g. "TC_UI_01")
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions: chặn MR vào main/develop nếu test fail
├── .env                         # Chỉ dùng local/CI override; KHÔNG commit secret
├── playwright.config.ts
└── tsconfig.json
```

## 2. Quy chuẩn Import & Path Aliases
BẮT BUỘC sử dụng TypeScript Path Aliases được định nghĩa trong `tsconfig.json`. TUYỆT ĐỐI KHÔNG dùng đường dẫn tương đối nhiều cấp (`../../..`):
- `@pages/*`   -> Trỏ tới `src/pages/*` (`@pages/api/...`, `@pages/e2e/...`)
- `@fixtures`  -> Trỏ tới `src/fixtures/index.ts`
- `@data/*`    -> Trỏ tới `src/data/*`
- `@utils/*`   -> Trỏ tới `src/utils/*`

## 3. Quản lý Cấu hình & Biến Môi trường

### Phân tầng ưu tiên (cao → thấp):
```
CI Secrets / .env (process.env.*)  →  src/data/global.json (default values)
```

- **`src/data/global.json`**: Lưu default values (`baseUrl`, `apiBaseUrl`, `defaultTimeout`, `defaultUser`). File này được commit vào repo.
- **`.env`**: Chỉ dùng để override cho local dev hoặc CI inject. KHÔNG lưu credentials. KHÔNG dùng `env.config.ts` riêng.
- **Trong code**: Luôn viết `process.env.BASE_URL || globalData.baseUrl` — KHÔNG import `env.config`.
- **`src/utils/env.config.ts` đã bị xóa** — KHÔNG tạo lại.

## 4. Conf Fixture & Dữ liệu Test Case

### Cấu trúc fixture `conf` (inject vào mọi test qua `@fixtures`):
```typescript
interface ConfFixture {
  global: typeof globalData;       // Toàn bộ global.json
  data: Record<string, any>;       // Toàn bộ file JSON kề spec
  caseData: any;                   // Data của TC hiện tại (tự động detect qua tag @TC_...)
  getCaseData<C>(caseId: string): C; // Lấy data của TC cụ thể theo key
}
```

### Quy tắc đặt file data:
- Mỗi domain trong `tests/e2e/<domain>/` có 1 file `<domain>.json` CÙNG THƯ MỤC với `<domain>.spec.ts`.
- Mỗi domain trong `tests/api/<domain>/` có 1 file `<domain>-api.json` CÙNG THƯ MỤC với spec.
- `src/data/global.json` là file duy nhất trong `src/data/` — KHÔNG thêm domain data vào đây.
- Key trong JSON phải khớp với TC tag (không có `@`): `"TC_UI_01": { ... }`.

### Cách dùng trong spec:
```typescript
// conf.caseData — tự động lấy data của test đang chạy (dựa vào tag @TC_...)
test('Login success', { tag: ['@TC_UI_02', '@MOD_AUTH_UI', '@smoke'] },
  async ({ conf, authPage }) => {
    const { email, password } = conf.caseData;
    await authPage.login(email, password);
  }
);

// conf.getCaseData — lấy data của TC cụ thể theo key
const data = conf.getCaseData<AuthData>('TC_UI_02');
```

## 5. Nguyên tắc Viết Locator (Locator Priority)

### Thứ tự ưu tiên BẮT BUỘC:
```
1. Playwright Semantic Locators  →  page.getByRole(), getByLabel(), getByPlaceholder(),
                                    getByText(), getByTestId(), getByAltText()
2. CSS Selector                  →  page.locator('input[data-qa="login-email"]')
                                    page.locator('#id'), page.locator('.class')
3. XPath                         →  page.locator('xpath=//...')   ← chỉ dùng khi CSS không đủ
```

### Quy định cụ thể:
- **Semantic locators (ưu tiên 1):** Dùng cho nav links, buttons, inputs có label/role rõ ràng.
  ```typescript
  page.getByRole('link', { name: 'Products' })
  page.getByRole('button', { name: /submit/i })
  page.getByLabel('Email Address')
  ```
- **Fallback với `.or()`:** Khi semantic locator phụ thuộc icon font (có thể render khác nhau), dùng `.or()` với CSS làm dự phòng:
  ```typescript
  page.getByRole('link', { name: ' Home' }).or(page.locator('a[href="/"]'))
  ```
- **CSS với `data-qa` (ưu tiên 2):** Dùng cho form inputs khi không có label tường minh:
  ```typescript
  page.locator('input[data-qa="login-email"]')
  page.locator('button[data-qa="create-account"]')
  ```
- **CSS với `#id` (ưu tiên 2):** Dùng cho các phần tử có id ổn định:
  ```typescript
  page.locator('#search_product')
  page.locator('#cartModal')
  ```
- **XPath (ưu tiên 3 — hạn chế tối đa):** Chỉ dùng khi không có cách CSS/semantic nào khả thi. Luôn thêm comment giải thích lý do:
  ```typescript
  // XPath: element không có id/class/data-qa ổn định
  page.locator('xpath=//div[@class="product-info"]/following-sibling::span')
  ```
- **TUYỆT ĐỐI KHÔNG dùng:**
  - `page.waitForTimeout()` — thay bằng web-first assertions
  - Locator cứng theo index DOM (`.nth()` chỉ dùng trong loop duyệt danh sách)
  - CSS selector theo cấu trúc DOM sâu khi có thể thay bằng semantic

### Hiện trạng locator trong codebase:

| File | Locator hiện tại | Đánh giá |
|------|-----------------|-----------|
| `base.page.ts` | `getByRole('link').or(locator('a[href]'))` | ✅ Chuẩn — semantic + CSS fallback |
| `auth.page.ts` | `locator('input[data-qa="login-email"]')` | ✅ Chấp nhận — `data-qa` ổn định |
| `auth.page.ts` | `locator('#id_gender1')`, `locator('#password')` | ✅ Chấp nhận — id ổn định |
| `contact.page.ts` | `locator('input[data-qa="name"]')` | ✅ Chấp nhận — `data-qa` |
| `contact.page.ts` | `locator('.status.alert-success')` | ⚠️ CSS class — cải thiện bằng `getByRole('alert')` nếu DOM hỗ trợ |
| `cart.page.ts` | `locator('#cart_info_table tbody tr')` | ✅ Chấp nhận — id ổn định + cấu trúc table |
| `cart.page.ts` | `locator('a.cart_quantity_delete')` | ⚠️ CSS class — có thể thêm `getByRole('link', {name: 'X'})` nếu có aria |
| `products.page.ts` | `locator('a[href^="/product_details/"]')` | ⚠️ CSS attribute — cân nhắc `getByRole('link', {name: 'View Product'})` |
| `products.page.ts` | `locator('.productinfo .add-to-cart')` | ⚠️ CSS class chain — cân nhắc `getByRole('button', {name: /add to cart/i})` |

## 6. CI/CD Workflow

File `.github/workflows/ci.yml` tự động chạy khi tạo PR vào `main` hoặc `develop`:
1. Checkout → Setup Node 20 → `npm ci`
2. `npx playwright install --with-deps chromium`
3. `npx playwright test`
4. Upload HTML report (14 ngày) và test-results khi fail (7 ngày)

**Để enforce block MR:** Vào GitHub → Settings → Branches → Branch protection rules → bật `Require status checks to pass` → chọn `Run Playwright Tests CI`.

## 7. Nguyên tắc phát triển (Coding Best Practices)

1. **Không Hardcode dữ liệu trong Test Spec:**
   - Mọi input, expected messages, search terms phải khai báo trong file JSON kề spec (`tests/<type>/<domain>/<domain>.json`).
   - Dữ liệu động (user ngẫu nhiên, timestamp) dùng `@utils/test-data.generator`.
   - `src/data/global.json` chỉ chứa config toàn cục, không chứa domain data.

2. **UI Tests — Page Object:**
   - Mỗi Page Object kế thừa từ `BasePage`.
   - Khai báo locator trong `constructor()` theo thứ tự ưu tiên: Semantic → CSS (`data-qa`/`#id`) → XPath.
   - Mọi assertion dùng web-first: `await expect(locator).toBeVisible()`.
   - TUYỆT ĐỐI KHÔNG dùng `page.waitForTimeout()`.

3. **Quản lý Dependency qua Fixtures:**
   - Mọi Page Object và API Client phải được đăng ký và inject qua fixture.
   - Test spec KHÔNG tự `new` Page Object hay API Client thủ công.
   - `conf` fixture tự động resolve file JSON data và inject `caseData` theo TC tag.

4. **Fixture Organization:**
   - `src/fixtures/api/api.fixture.ts` và `src/fixtures/e2e/e2e.fixture.ts` giữ PHẲNG (không tách domain).
   - Chỉ tách domain-subfolder trong fixture khi domain có logic setup/teardown riêng (seed DB, mock server).

5. **Utils:**
   - Logic tái sử dụng (file discovery, JSON parsing, key extraction) thuộc về `src/utils/conf.helper.ts`.
   - `src/fixtures/conf.fixture.ts` chỉ là thin wrapper gọi helpers — KHÔNG viết logic phức tạp trong fixture.
