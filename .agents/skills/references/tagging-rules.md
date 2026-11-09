# Tổng quan tài liệu: `tagging-rules.md`

Tài liệu này định nghĩa các quy chuẩn bắt buộc về việc gắn thẻ (tagging) cho Test Case trong dự án Playwright nhằm đồng bộ hóa báo cáo và tích hợp CI/CD.

> [!NOTE]
> Trong Playwright Test (v1.42+), tất cả các thẻ tag khi khai báo trong thuộc tính `{ tag: [...] }` **bắt buộc phải bắt đầu bằng ký tự `@`**.

| Thành phần / Nội dung | Quy định chi tiết | Ví dụ minh họa |
| :--- | :--- | :--- |
| **Cấu trúc Tag bắt buộc** | Phải là một mảng gồm đúng **3 phần tử**: `[test_id, module_id, special_tags]` (tất cả đều có tiền tố `@`) | `['@TC_AUTH_001', '@MOD_LOGIN', '@smoke']` |
| **1. `test_id`** | Mã định danh duy nhất (đồng bộ Jira/TestRail), viết hoa, bắt đầu bằng `@TC_`. | `'@TC_AUTH_001'` |
| **2. `module_id`** | Mã phân vùng/tính năng, viết hoa, bắt đầu bằng `@MOD_`. | `'@MOD_LOGIN'` |
| **3. `special_tags`** | Nhóm chạy, mức độ ưu tiên hoặc thẻ đặc biệt, bắt đầu bằng ký tự `@`. | `'@smoke'`, `'@regression'` |
| **Quy định nghiêm ngặt** | **Tuyệt đối cấm annotation ngoài luồng** (không tự chế chuỗi đơn, không bỏ sót thành phần). | Dạng viết sai cú pháp hoặc thiếu `@` sẽ bị từ chối khi Code Review. |
