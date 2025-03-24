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

## 6. Send mail (
    1. luồng mail dùng main thread để thấy độ chậm Line266 [[./../controller/usersController.js]]
    (Dùng nodemailer thử trước nhưng node mailer thường dùng với hệ thống nhỏ, ta có thể 
    Thử với bản free của sendGrid để giống hệ thống thực tế)
     **send mail with node mailer trên luồng chính (3-5s/mail)

    2. tách luồng (dùng worker) để cho xử lý luồng riêng cho nhanh)

    3. Send email với setTimeout đơn giản để gửi mail sau khoảng thời gian (nhược điểm là khi server restart, toàn bộ chu trình lịch đã time out sẽ bị mất) Line278 [[./../controller/usersController.js]]

    4. dùng cronjob (ưu điểm là ta có thể set lịch theo giờ, ngày cố định lặp đi lặp lại còn setTimeout chỉ có thể setTime sau khoảng bao lâu đó)
    * * * * * <command>
- - - - -
    | | | | |  
    | | | | ----- Thứ trong tuần (0 - 7, với 0 & 7 đều là Chủ Nhật)  
    | | | ------- Tháng (1 - 12)  
    | | --------- Ngày trong tháng (1 - 31)  
    | ----------- Giờ (0 - 23)  
    ------------- Phút (0 - 59)  

 ## 7. 