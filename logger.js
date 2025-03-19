import winston, { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import fs from "fs";

// Kiểm tra thư mục logs đã có chưa, nếu chưa có thì tạo mới
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),

    // Ghi log ERROR vào file error.log (không có màu)
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log", // Tự động tạo file theo ngày
      datePattern: "YYYY-MM-DD",
      level: "error",
      format: format.combine(format.uncolorize(), format.timestamp(), format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)),
      maxFiles: "7d", // Chỉ giữ lại log trong 7 ngày
    }),

    // Ghi tất cả log vào file combined.log theo ngày
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log", // Tự động tạo file theo ngày
      datePattern: "YYYY-MM-DD",
      format: format.combine(format.uncolorize(), format.timestamp(), format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)),
      maxFiles: "7d", // Chỉ giữ lại log trong 7 ngày
    }),
  ],
});


