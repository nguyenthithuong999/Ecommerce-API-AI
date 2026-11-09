# Danh Sách Test Cases UI (E2E) - Automation Exercise

Website: [https://automationexercise.com/](https://automationexercise.com/)

---

## 1. Authentication & User Management (Đăng ký / Đăng nhập)

### TC_UI_01: Đăng ký tài khoản người dùng thành công (Register User)
- **Mục tiêu:** Xác minh người dùng có thể đăng ký tài khoản mới hợp lệ.
- **Tiền điều kiện:** Email chưa từng đăng ký trong hệ thống.
- **Các bước thực hiện:**
  1. Điều hướng đến trang chủ `https://automationexercise.com/`.
  2. Xác minh trang chủ hiển thị thành công.
  3. Nhấp vào nút **'Signup / Login'**.
  4. Xác minh tiêu đề **'New User Signup!'** hiển thị.
  5. Nhập Name và Email hợp lệ (ngẫu nhiên).
  6. Nhấp nút **'Signup'**.
  7. Xác minh trang **'ENTER ACCOUNT INFORMATION'** hiển thị.
  8. Điền đầy đủ thông tin: Title, Password, Date of birth, Newsletter & Special offers checkbox.
  9. Điền thông tin địa chỉ: First name, Last name, Company, Address, Country, State, City, Zipcode, Mobile Number.
  10. Nhấp nút **'Create Account'**.
  11. Xác minh thông báo **'ACCOUNT CREATED!'** hiển thị.
  12. Nhấp nút **'Continue'**.
  13. Xác minh hiển thị **'Logged in as [username]'**.
- **Kết quả mong đợi:** Tài khoản được tạo thành công và người dùng được đăng nhập vào hệ thống.

---

### TC_UI_02: Đăng nhập thành công với Email & Password hợp lệ (Login Valid)
- **Mục tiêu:** Xác minh người dùng có thể đăng nhập bằng tài khoản hợp lệ.
- **Tiền điều kiện:** Tài khoản đã được đăng ký từ trước.
- **Các bước thực hiện:**
  1. Điều hướng đến trang chủ.
  2. Nhấp vào nút **'Signup / Login'**.
  3. Xác minh tiêu đề **'Login to your account'** hiển thị.
  4. Nhập đúng Email và Password.
  5. Nhấp nút **'Login'**.
  6. Xác minh hiển thị **'Logged in as [username]'**.
- **Kết quả mong đợi:** Đăng nhập thành công và chuyển hướng đến trang chủ với trạng thái đã đăng nhập.

---

### TC_UI_03: Đăng nhập thất bại với thông tin không hợp lệ (Login Invalid)
- **Mục tiêu:** Xác minh thông báo lỗi khi nhập sai Email hoặc Mật khẩu.
- **Tiền điều kiện:** Không có.
- **Các bước thực hiện:**
  1. Điều hướng đến trang chủ.
  2. Nhấp vào nút **'Signup / Login'**.
  3. Nhập Email hoặc Mật khẩu sai.
  4. Nhấp nút **'Login'**.
  5. Kiểm tra hiển thị thông báo lỗi: `'Your email or password is incorrect.'`.
- **Kết quả mong đợi:** Đăng nhập thất bại và hiển thị đúng thông báo lỗi.

---

### TC_UI_04: Đăng xuất người dùng (Logout)
- **Mục tiêu:** Xác minh người dùng có thể đăng xuất khỏi phiên làm việc.
- **Tiền điều kiện:** Người dùng đang đăng nhập.
- **Các bước thực hiện:**
  1. Nhấp nút **'Logout'** trên thanh điều hướng.
  2. Xác minh người dùng được chuyển hướng về trang Login/Signup.
- **Kết quả mong đợi:** Phiên làm việc kết thúc thành công.

---

### TC_UI_05: Đăng ký tài khoản với Email đã tồn tại (Register Existing Email)
- **Mục tiêu:** Xác minh hệ thống chặn đăng ký với email đã có trong cơ sở dữ liệu.
- **Tiền điều kiện:** Email đã được đăng ký trước.
- **Các bước thực hiện:**
  1. Điều hướng đến trang Login/Signup.
  2. Nhập Name và Email đã tồn tại vào mục 'New User Signup!'.
  3. Nhấp nút **'Signup'**.
  4. Xác minh thông báo lỗi: `'Email Address already exist!'`.
- **Kết quả mong đợi:** Không cho phép tạo tài khoản và hiển thị thông báo lỗi chính xác.

---

## 2. Product Management (Quản lý sản phẩm)

### TC_UI_06: Xem danh sách tất cả sản phẩm & Chi tiết sản phẩm (Verify All Products & Detail)
- **Mục tiêu:** Xác minh danh sách sản phẩm hiển thị đầy đủ và xem được chi tiết.
- **Các bước thực hiện:**
  1. Nhấp vào menu **'Products'**.
  2. Xác minh tiêu đề **'ALL PRODUCTS'** hiển thị.
  3. Xác minh danh sách sản phẩm hiển thị các card sản phẩm.
  4. Nhấp vào nút **'View Product'** của sản phẩm đầu tiên.
  5. Xác minh trang chi tiết sản phẩm hiển thị: Tên sản phẩm, Danh mục, Giá, Trạng thái còn hàng (Availability), Tình trạng (Condition), Thương hiệu (Brand).
- **Kết quả mong đợi:** Thông tin sản phẩm được hiển thị đầy đủ và chính xác.

---

### TC_UI_07: Tìm kiếm sản phẩm (Search Product)
- **Mục tiêu:** Xác minh chức năng tìm kiếm sản phẩm hoạt động chính xác.
- **Các bước thực hiện:**
  1. Điều hướng tới trang **'Products'**.
  2. Nhập từ khóa tìm kiếm (ví dụ: `'Dress'`, `'Top'`) vào ô tìm kiếm.
  3. Nhấp nút tìm kiếm (Search button).
  4. Xác minh tiêu đề **'SEARCHED PRODUCTS'** hiển thị.
  5. Xác minh tất cả sản phẩm hiển thị đều chứa từ khóa tìm kiếm.
- **Kết quả mong đợi:** Trả về danh sách sản phẩm liên quan đến từ khóa.

---

## 3. Cart & Checkout (Giỏ hàng & Đặt hàng)

### TC_UI_08: Thêm sản phẩm vào giỏ hàng (Add Products to Cart)
- **Mục tiêu:** Xác minh người dùng có thể thêm sản phẩm vào giỏ hàng thành công.
- **Các bước thực hiện:**
  1. Điều hướng tới trang **'Products'**.
  2. Hover vào sản phẩm thứ nhất và nhấp **'Add to cart'**.
  3. Nhấp nút **'Continue Shopping'**.
  4. Hover vào sản phẩm thứ hai và nhấp **'Add to cart'**.
  5. Nhấp nút **'View Cart'**.
  6. Xác minh cả 2 sản phẩm đã hiển thị trong giỏ hàng với Giá, Số lượng và Tổng tiền chính xác.
- **Kết quả mong đợi:** Giỏ hàng lưu trữ đúng danh sách sản phẩm và giá tiền tương ứng.

---

### TC_UI_09: Xóa sản phẩm khỏi giỏ hàng (Remove Product from Cart)
- **Mục tiêu:** Xác minh xóa sản phẩm khỏi giỏ hàng.
- **Tiền điều kiện:** Giỏ hàng có ít nhất 1 sản phẩm.
- **Các bước thực hiện:**
  1. Điều hướng tới trang **'Cart'**.
  2. Nhấp vào nút xóa (biểu tượng `'X'`) bên cạnh sản phẩm.
  3. Xác minh sản phẩm đó không còn hiển thị trong bảng giỏ hàng.
- **Kết quả mong đợi:** Sản phẩm được loại bỏ hoàn toàn khỏi giỏ hàng.

---

## 4. Contact Us & Subscription (Liên hệ & Đăng ký nhận tin)

### TC_UI_10: Gửi biểu mẫu liên hệ thành công (Contact Us Form)
- **Mục tiêu:** Xác minh người dùng có thể gửi thông tin liên hệ kèm file đính kèm.
- **Các bước thực hiện:**
  1. Nhấp vào menu **'Contact us'**.
  2. Xác minh tiêu đề **'GET IN TOUCH'** hiển thị.
  3. Nhập Name, Email, Subject và Message.
  4. Đính kèm một file tài liệu/ảnh.
  5. Nhấp nút **'Submit'** và đồng ý confirm popup.
  6. Xác minh thông báo thành công: `'Success! Your details have been submitted successfully.'`.
- **Kết quả mong đợi:** Gửi liên hệ thành công và nhận được thông báo phản hồi.
