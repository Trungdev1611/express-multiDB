# Chức năng của Admin
Quản lý người dùng (User Management):

Thêm, sửa, xoá user.
Phân quyền user (Admin/User).
Kích hoạt/Vô hiệu hoá tài khoản.
Quản lý dữ liệu (Data Management):

CRUD bảng dữ liệu (ví dụ: Sản phẩm, Đơn hàng, Khách hàng...).
Xuất dữ liệu (CSV, Excel, PDF).
Tìm kiếm, lọc dữ liệu.
Dashboard & Thống kê (Reports & Analytics):

Hiển thị biểu đồ thống kê (số lượng user, đơn hàng, doanh thu, v.v.).
Thống kê theo ngày/tháng/năm.
#  Chức năng của User
Đăng ký, đăng nhập.
Xem và chỉnh sửa thông tin cá nhân.
Thực hiện các thao tác cụ thể (ví dụ: đặt hàng, xem lịch sử giao dịch).


# có thể dựa theo đây
Product được phân loại theo Category (Loại sản phẩm).
Product có nhiều biến thể khác nhau (size, color, material…).
Product có nhiều nhà cung cấp khác nhau.
Kho vận quản lý sản phẩm theo từng lô hàng (batch).
Đơn hàng (Order) có thể chứa nhiều sản phẩm với số lượng khác nhau.
User có thể đặt hàng và có các phân quyền khác nhau (Admin, Staff, Customer).

Những điểm mới được thêm vào:
Quản lý nhập hàng (Purchase Orders, Suppliers)
Quản lý kho nâng cao (Stock Movement, Warehouse, Location)
Quản lý giá sản phẩm (Pricing Rules, Discounts, Promotions)
Quản lý khách hàng & chương trình thành viên (Customer Loyalty, Membership)
Quản lý giao hàng & vận chuyển (Shipping, Delivery, Logistics)
Quản lý hóa đơn & thanh toán (Invoices, Payments)
Thống kê & Báo cáo (Sales Reports, Inventory Reports)


# HRM
Core Entities:
Entity	Mô tả
User	Người dùng (nhân viên, quản lý, admin...)
Department	Phòng ban (IT, Sales, HR, v.v.)
Position	Chức vụ (Dev, Manager, v.v.)
Attendance	Chấm công (ngày, giờ vào/ra)
LeaveRequest	Yêu cầu nghỉ phép
Salary	Lương/thưởng
Contract	Thông tin hợp đồng lao động
Area (nếu có)	Khu vực quản lý (cho AREA_MANAGER)

 Business Logic Gợi Ý

# users và department
+) 1 department có nhiều users, 1 department chỉ có 1 manager và 1 deputy manager





Dưới đây là các logic thường gặp trong HRM:

📅 Chấm công (Attendance)
USER check-in/check-out mỗi ngày.

Hệ thống tự tính số giờ làm/nghỉ trong ngày.

Admin có thể export báo cáo công theo tháng.

🌴 Nghỉ phép (LeaveRequest)
USER tạo yêu cầu nghỉ phép (ngày bắt đầu – kết thúc, lý do).

AREA_MANAGER hoặc ADMIN phê duyệt hoặc từ chối.

Lưu trạng thái: PENDING, APPROVED, REJECTED.

💰 Lương (Salary)
Mỗi tháng tạo bản ghi lương cho từng User (lương cơ bản + phụ cấp - nghỉ phép...).

Admin có thể update, export dữ liệu.

USER chỉ xem được lương của mình.

🧾 Quản lý hợp đồng (Contract)
Gắn Contract với User, gồm loại hợp đồng, ngày bắt đầu, ngày kết thúc.

Admin có thể theo dõi sắp hết hạn hợp đồng.

🏢 Phòng ban & Chức vụ
User thuộc 1 Department và giữ 1 Position.

Dễ dàng lọc nhân viên theo phòng ban/chức vụ.