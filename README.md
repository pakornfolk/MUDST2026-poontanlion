# ระบบบริหารจัดการอพาร์ตเมนต์ (Apartment Management System)

## สิ่งที่ต้องเตรียม (Prerequisites)
- **Java 17** (หรือสูงกว่า)
- **Node.js** (v18 ขึ้นไป)

---

## ขั้นตอนการรันระบบ (Quick Start)

### 1. รัน Backend (Spring Boot API)
เปิด Terminal ที่โฟลเดอร์โปรเจกต์:
```bash
cd backend
.\mvnw.cmd spring-boot:run
```
*(ระบบทำงานที่ `http://localhost:8080` และสร้างข้อมูลเริ่มต้นให้อัตโนมัติ)*

### 2. รัน Frontend (React Web App)
เปิด Terminal อีกหน้าต่างที่โฟลเดอร์โปรเจกต์:
```bash
npm install
npm run dev
```
*(เข้าใช้งานผ่านเบราว์เซอร์ที่ `http://localhost:5173`)*

---

## ข้อมูลเข้าสู่ระบบผู้ดูแลระบบ (Admin Access)
- **URL**: `http://localhost:5173/login`
- **Username / Email**: `admin`
- **Password**: `admin`
