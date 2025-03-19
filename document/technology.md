## 1. MIGRATION (đã add project)
migration để giữ lại lịch sử thay đổi database, sau này nếu cần có thể revert được (thư mục migration - ở dây ta dùng sequelise, một vài ngôn ngữ hoặc thư viện khác có hỗ trợ tự động migration)

## 2. EXport excel- Dùng thư viện excel-xlsx (đã add trong project)

## 3. Export csv - dùng thư viện fast-csv và writeable trong stream của Nodejs

## 4. VALIDATOR: (đã làm trong project với joi)
có nhiều lựa chọn cho validator trong express như 
a/ express validator
b/ joi
c/ tự viết middleware

nhưng về cơ bản chúng đều là middleware để chèn vào giữa (trong dự án này dùng joi)

### router.post("/users", validateCreateUser, createUser);

## 5. Ghi log: winston hoặc morgan (winston phổ biến hơn - đã add trong project)

## 6. Send mail (1 luồng mail dùng main thread để thấy độ chậm, tách luồng (dùng worker) để cho xử lý luồng riêng cho nhanh)
 (Dùng nodemailer thử trước nhưng node mailer thường dùng với hệ thống nhỏ, ta có thể 
 Thử với bản free của sendGrid để giống hệ thống thực tế)

 **send mail with node mailer trên luồng chính (3-5s/mail)