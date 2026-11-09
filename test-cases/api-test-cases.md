# Danh Sách Test Cases API - Automation Exercise

API Documentation: [https://automationexercise.com/api_list](https://automationexercise.com/api_list)
Base URL: `https://automationexercise.com/api`

---

## 1. Product APIs (Quản lý sản phẩm)

### TC_API_01: Lấy danh sách tất cả sản phẩm (Get All Products List)
- **Endpoint:** `GET /productsList`
- **Mục tiêu:** Xác minh trả về danh sách toàn bộ sản phẩm của hệ thống.
- **Headers:** `Accept: application/json`
- **Body:** Không
- **Kết quả mong đợi:**
  - Status Code: `200 OK`
  - Response Code trong JSON body: `200`
  - Body chứa mảng `products` với các trường: `id`, `name`, `price`, `brand`, `category`.

---

### TC_API_02: POST tới danh sách sản phẩm (POST To All Products List - Method Not Allowed)
- **Endpoint:** `POST /productsList`
- **Mục tiêu:** Kiểm tra xử lý khi gọi sai HTTP Method (POST thay vì GET).
- **Kết quả mong đợi:**
  - Status Code: `200 OK`
  - Response Code trong JSON: `405`
  - Message: `'This request method is not supported.'`

---

### TC_API_03: Lấy danh sách thương hiệu (Get All Brands List)
- **Endpoint:** `GET /brandsList`
- **Mục tiêu:** Xác minh API trả về danh sách các thương hiệu sản phẩm.
- **Kết quả mong đợi:**
  - Status Code: `200 OK`
  - Response Code trong JSON: `200`
  - Body chứa danh sách `brands` gồm `id` và `brand`.

---

### TC_API_04: Tìm kiếm sản phẩm hợp lệ (Search Product with Valid Keyword)
- **Endpoint:** `POST /searchProduct`
- **Mục tiêu:** Tìm kiếm sản phẩm theo từ khóa.
- **Request Body (form-data / x-www-form-urlencoded):**
  - `search_product`: `"tshirt"` hoặc `"top"`
- **Kết quả mong đợi:**
  - Status Code: `200 OK`
  - Response Code trong JSON: `200`
  - Mảng `products` trả về không rỗng và chứa các sản phẩm liên quan.

---

### TC_API_05: Tìm kiếm sản phẩm không truyền tham số (Search Product Without Parameter)
- **Endpoint:** `POST /searchProduct`
- **Mục tiêu:** Xác minh phản hồi khi thiếu tham số tìm kiếm.
- **Request Body:** Không có tham số `search_product`.
- **Kết quả mong đợi:**
  - Status Code: `200 OK`
  - Response Code trong JSON: `400`
  - Message: `'Bad request, search_product parameter is missing'`

---

## 2. Authentication & User Account APIs (Quản lý người dùng)

### TC_API_06: Xác thực đăng nhập hợp lệ (Verify Login with Valid Details)
- **Endpoint:** `POST /verifyLogin`
- **Mục tiêu:** Xác thực tài khoản đăng nhập với email và password chính xác.
- **Request Body:**
  - `email`: `"<valid_email>"`
  - `password`: `"<valid_password>"`
- **Kết quả mong đợi:**
  - Status Code: `200 OK`
  - Response Code trong JSON: `200`
  - Message: `'User exists!'`

---

### TC_API_07: Xác thực đăng nhập không truyền Email (Verify Login Without Email)
- **Endpoint:** `POST /verifyLogin`
- **Mục tiêu:** Kiểm tra validation khi thiếu trường email.
- **Request Body:**
  - `password`: `"<password>"`
- **Kết quả mong đợi:**
  - Status Code: `200 OK`
  - Response Code trong JSON: `400`
  - Message: `'Bad request, email or password parameter is missing in POST request.'`

---

### TC_API_08: Xác thực đăng nhập với tài khoản không tồn tại (Verify Login with Invalid Details)
- **Endpoint:** `POST /verifyLogin`
- **Mục tiêu:** Kiểm tra phản hồi khi đăng nhập bằng email sai hoặc chưa đăng ký.
- **Request Body:**
  - `email`: `"nonexistent_user_99999@test.com"`
  - `password`: `"WrongPass123"`
- **Kết quả mong đợi:**
  - Status Code: `200 OK`
  - Response Code trong JSON: `404`
  - Message: `'User not found!'`

---

### TC_API_09: Tạo tài khoản người dùng mới (Create/Register User Account)
- **Endpoint:** `POST /createAccount`
- **Mục tiêu:** Đăng ký tài khoản người dùng mới qua API.
- **Request Body (form-data):**
  - `name`, `email`, `password`, `title`, `birth_date`, `birth_month`, `birth_year`, `firstname`, `lastname`, `company`, `address1`, `address2`, `country`, `zipcode`, `state`, `city`, `mobile_number`
- **Kết quả mong đợi:**
  - Status Code: `200 OK`
  - Response Code trong JSON: `201`
  - Message: `'User created!'`

---

### TC_API_10: Lấy chi tiết thông tin người dùng qua Email (Get User Detail by Email)
- **Endpoint:** `GET /getUserDetailByEmail`
- **Mục tiêu:** Truy vấn thông tin chi tiết của người dùng bằng địa chỉ email.
- **Query Params:**
  - `email`: `"<registered_email>"`
- **Kết quả mong đợi:**
  - Status Code: `200 OK`
  - Response Code trong JSON: `200`
  - Body chứa object `user` với đầy đủ các trường thông tin cá nhân.

---

### TC_API_11: Xóa tài khoản người dùng (Delete User Account)
- **Endpoint:** `DELETE /deleteAccount`
- **Mục tiêu:** Xóa tài khoản người dùng đã tạo để dọn dẹp dữ liệu (cleanup).
- **Request Body:**
  - `email`: `"<registered_email>"`
  - `password`: `"<registered_password>"`
- **Kết quả mong đợi:**
  - Status Code: `200 OK`
  - Response Code trong JSON: `200`
  - Message: `'Account deleted!'`
