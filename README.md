# E-commerce Automation Testing Project (Playwright + TypeScript)

Dự án Automation Testing hoàn chỉnh cho website thương mại điện tử [Automation Exercise](https://automationexercise.com/) kết hợp kiểm thử giao diện người dùng (E2E) và kiểm thử giao diện lập trình ứng dụng (API).

---

## 🏗 Cấu trúc dự án (Folder Structure)

Dự án áp dụng mô hình phân lớp rõ ràng, chuẩn hóa theo yêu cầu:

```text
Ecommerce-API-AI/
├── data/                       # Dữ liệu tĩnh và mock test data (JSON, fixtures)
│   └── test-users.json
├── fixtures/                   # Custom Playwright Fixtures
│   ├── api/
│   │   └── api.fixture.ts      # Fixtures cho API clients (authApi, productApi)
│   ├── e2e/
│   │   └── e2e.fixture.ts      # Fixtures cho Page Objects và chặn quảng cáo tự động
│   └── index.ts                # Tổng hợp Fixtures cho test suite
├── pages/                      # Page Object Models (UI) & API Clients
│   ├── api/                    # API Service Clients đóng gói các HTTP endpoints
│   │   ├── base.api.ts         # Base API client wrapper
│   │   ├── auth.api.ts         # Client xác thực & quản lý tài khoản người dùng
│   │   ├── product.api.ts      # Client danh mục sản phẩm, tìm kiếm & nhãn hiệu
│   │   └── models.ts           # TypeScript interfaces & API types
│   └── e2e/                    # Page Object Model cho giao diện người dùng
│       ├── base.page.ts        # Base page chứa navigation & common elements
│       ├── home.page.ts        # Trang chủ & đăng ký newsletter
│       ├── auth.page.ts        # Trang đăng nhập, đăng ký & tạo tài khoản
│       ├── products.page.ts    # Danh sách sản phẩm, chi tiết & tìm kiếm
│       ├── cart.page.ts        # Giỏ hàng & quản lý sản phẩm trong giỏ
│       └── contact.page.ts     # Biểu mẫu liên hệ & đính kèm tệp
├── tests/                      # Kịch bản kiểm thử tự động
│   ├── api/                    # API test suites (.spec.ts)
│   │   ├── auth-api.spec.ts    # Verify login, đăng ký, lấy user detail, xóa tài khoản
│   │   └── products-api.spec.ts# Lấy danh sách sản phẩm, nhãn hiệu, tìm kiếm, kiểm tra method 405
│   └── e2e/                    # E2E UI test suites (.spec.ts)
│       ├── auth.spec.ts        # Luồng đăng ký, đăng nhập hợp lệ/không hợp lệ, đăng xuất
│       ├── products.spec.ts    # Danh sách sản phẩm, chi tiết & tìm kiếm
│       ├── cart.spec.ts        # Thêm vào giỏ hàng, xóa khỏi giỏ hàng
│       └── contact.spec.ts     # Gửi contact us form thành công
├── test-cases/                 # Tài liệu mô tả các kịch bản kiểm thử
│   ├── ui-test-cases.md        # Danh sách Test Cases UI (theo https://automationexercise.com/test_cases)
│   └── api-test-cases.md       # Danh sách Test Cases API (theo https://automationexercise.com/api_list)
├── utils/                      # Các hàm tiện ích dùng chung
│   ├── env.config.ts           # Quản lý cấu hình biến môi trường
│   ├── test-data.generator.ts  # Sinh dữ liệu ngẫu nhiên (Faker-like generator)
│   └── helpers.ts              # Các hàm bổ trợ
├── playwright.config.ts        # Cấu hình đa môi trường Playwright
├── tsconfig.json               # Cấu hình TypeScript với Path Aliases
├── package.json
└── README.md
```

---

## 🚀 Hướng dẫn cài đặt & Thực thi

### 1. Cài đặt môi trường
Yêu cầu: Node.js (>= 18.x)

```bash
# Cài đặt các dependencies
npm install

# Cài đặt trình duyệt cho Playwright (Chromium)
npx playwright install chromium
```

### 2. Cấu hình biến môi trường
Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```
Nội dung `.env`:
```env
BASE_URL=https://automationexercise.com
API_BASE_URL=https://automationexercise.com/api
HEADLESS=true
DEFAULT_TIMEOUT=30000
```

### 3. Chạy kiểm thử

| Lệnh | Mô tả |
| :--- | :--- |
| `npm run test:api` | Chạy toàn bộ các kịch bản kiểm thử **API** |
| `npm run test:ui` | Chạy toàn bộ các kịch bản kiểm thử **UI (E2E)** |
| `npm run test` | Chạy toàn bộ cả **API** và **UI** song song |
| `npm run test:headed` | Chạy kiểm thử UI với trình duyệt có giao diện (headed mode) |
| `npm run test:report` | Mở báo cáo HTML Playwright trực quan |

---

## 📋 Tài liệu Test Cases
Xem chi tiết các kịch bản kiểm thử tại:
- [UI Test Cases](test-cases/ui-test-cases.md)
- [API Test Cases](test-cases/api-test-cases.md)

