/* 
  ใช้งาน Https เมื่อจะ Deploy
  ใช้ log บ่อยๆ
*/
const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
dotenv.config();

//Routes
const authRoutes = require(__dirname + "/routes/auth");
const projectRoutes = require(__dirname + "/routes/project");
const userRoutes = require(__dirname + "/routes/user");

// Set up
const app = express();
const catchAsync = require(__dirname + "/utils/catchAsync");
const AppError = require(__dirname + "/utils/appError");
const globalErrorHandler = require(__dirname + "/middleware/errorHandler");

// Middleware
app.use(cors());
app.use(express.json({limit: '100kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(morgan('combined'));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  max: 100, 
  message: 'Too many requests, please try again later.', 
  headers: true, 
}));  

/*

// ตั้งค่า CORS ให้อนุญาตการเข้าถึงจากโดเมนที่กำหนด
app.use(cors({
  origin: 'http://example.com',  // กำหนดโดเมนที่สามารถเข้าถึงข้อมูลจากเซิร์ฟเวอร์นี้
  methods: ['GET', 'POST'],     // กำหนด method ที่อนุญาต
  allowedHeaders: ['Content-Type', 'Authorization']  // กำหนด headers ที่อนุญาต
}));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // อนุญาตให้โหลดจากโดเมนตัวเองเท่านั้น
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // อนุญาต script จากตัวเองและบางคำสั่งที่จำเป็น
      styleSrc: ["'self'", "'unsafe-inline'"], // อนุญาต style จากตัวเองและ inline
      objectSrc: ["'none'"], // ปิดการใช้งาน object เช่น Flash
      imgSrc: ["'self'", 'data:'], // อนุญาตให้โหลดรูปจากตัวเองและ data URI
      fontSrc: ["'self'"], // อนุญาต font จากตัวเอง
      connectSrc: ["'self'"], // อนุญาตการเชื่อมต่อจากตัวเอง (เช่น AJAX)
      mediaSrc: ["'self'"], // อนุญาตให้โหลดสื่อจากตัวเอง
      frameAncestors: ["'none'"], // ป้องกันการแสดงผลใน iframe (Clickjacking)
    },
  },
  frameguard: { action: 'deny' }, // ป้องกันการแสดงแอปใน iframe
  hidePoweredBy: true, // ซ่อน header "X-Powered-By"
  strictTransportSecurity: { maxAge: 31536000, includeSubDomains: true }, // บังคับให้ใช้ HTTPS เสมอ
  xssFilter: true, // เปิดใช้งานการป้องกัน XSS ในเบราว์เซอร์
  dnsPrefetchControl: { allow: false }, // ป้องกัน DNS prefetch
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }, // การส่งข้อมูล referrer ในการทำงานข้ามโดเมน
  permissionsPolicy: {
    geolocation: "'none'", // ปิดการเข้าถึงข้อมูลตำแหน่ง
    microphone: "'none'", // ปิดการเข้าถึงไมโครโฟน
    camera: "'none'", // ปิดการเข้าถึงกล้อง
  },
  expectCt: {
    maxAge: 86400, // กำหนดเวลาให้ตรวจสอบการใช้ Certificate Transparency
    enforce: true, // บังคับใช้งาน
  },
  originAgentCluster: true, // ช่วยป้องกันการโจมตีที่ใช้การแยกโปรเซส
}));*/


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/user", userRoutes);

app.use(catchAsync(async (req, res, next) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
}));

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
