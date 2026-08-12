# 🏢 Victory Apartment Management System (DevOps & Core Requirements)

ระบบบริหารจัดการอพาร์ตเมนต์แบบครบวงจร (Full-Stack DevOps) ที่พัฒนาด้วย **Spring Boot 3.2.5 (Backend)** + **React 18 / TypeScript (Frontend)** พร้อมระบบ **Containerization (Docker & Docker Compose)** และ **Regression Tests**

---

## 📌 คุณสมบัติหลักตาม Requirement (Core Features)

1. **Dashboard แสดงสถานะ 24 ห้องพัก (12 ห้อง/ชั้น, 2 ชั้น)**:
   - แสดงแผนผังผังห้องแบบ Grid Visualizer ชั้น 1 (101-112) และ ชั้น 2 (201-212)
   - สัญลักษณ์สีแยกสถานะชัดเจน (Available, Occupied, Reserved, Maintenance)
2. **ระบบจัดการผู้เช่า & สัญญาเช่า (Tenant & Lease Management)**:
   - มอบหมายผู้เช่าเข้าพัก กำหนดวัน Check-in / Check-out และรูปแบบการจ่ายเงิน (รายเดือน / รายปี)
   - **ระบบป้องกันการเช่าซ้อน (Occupancy Conflict Prevention)**: บล็อกการสร้างสัญญาใหม่ทันทีหากมีการซ้อนทับช่วงเวลากัน
3. **ระบบออก & พิมพ์/ดาวน์โหลด ใบเสร็จและสัญญาเช่า (Receipts & Contracts)**:
   - ใบเสร็จค่าเช่า + ค่าน้ำ (หน่วย * อัตรา) + ค่าไฟ (หน่วย * อัตรา) พร้อมปุ่ม พิมพ์ (Print Window) และ ดาวน์โหลด PDF
   - สัญญาเช่าระบุข้อตกลง ค่าเช่า เงินประกัน เงื่อนไขการเช่า พร้อมพิมพ์/ดาวน์โหลด PDF
4. **ระบบติดตามงานซ่อมบำรุง & การเบิกใช้อะไหล่ (Maintenance & Supply Usage)**:
   - หมวดหมู่งานซ่อม: เปลี่ยนหลอดไฟ, ล้างแอร์, งานท่อน้ำประปา, ระบบไฟฟ้า
   - บันทึกการใช้อะไหล่/สต็อก (Supply Usage) และคำนวณต้นทุนอัตโนมัติ
   - **Per-Unit Maintenance Log**: ประวัติการซ่อมแยกตามรายห้องพัก
5. **ระบบตั้งเวลาแจ้งเตือนรอบการบำรุงรักษา (Scheduled Reminders)**:
   - แจ้งเตือนรอบล้างแอร์ ตรวจถังดับเพลิง ทำความสะอาดแท็งก์น้ำ แบบครบรอบเวลา
6. **การรันแบบ Zero External Dependencies**:
   - ทำงานได้ในเครื่อง 100% ไม่ต้องพึ่งพา Cloud API หรือ SaaS ภายนอก

---

## 🚀 วิธีการทดสอบและใช้งาน (How to Run & Test)

### 🐳 วิธีที่ 1: รันด้วย Docker Compose (แนะนำสำหรับ DevOps Showcase)

ต้องการเพียง **Docker Desktop** ในเครื่อง:

```bash
# 1. สร้างและรัน Container สำหรับ Frontend และ Backend พร้อมกัน
docker compose up --build

# 2. เข้าใช้งานใน Browser:
# Frontend Web UI: http://localhost:80 (หรือ http://localhost:3000)
# Backend API:      http://localhost:8080/api/rooms
```

*หากต้องการหยุดการทำงาน:* `docker compose down`

---

### 💻 วิธีที่ 2: รันแยกเครื่อง (Manual Local Run)

#### 1. Backend (Spring Boot API):
```bash
cd backend
mvn test                   # รัน Unit / Regression Tests
mvn spring-boot:run        # รัน Backend API Server (Port 8080)
```
*(หากไม่มี `mvn` ในเครื่อง สามารถรันผ่าน Docker หรือใช้ Maven ที่ติดตั้งได้)*

#### 2. Frontend (React + Vite):
```bash
npm install
npm run dev                # รัน Frontend Dev Server (Port 5173)
```

---

## 🧪 วิธีการทดสอบความถูกต้องของระบบ (Testing Guide)

### 1. ทดสอบ Regression Tests (Automated JUnit Tests):
รันคำสั่งในโฟลเดอร์ `/backend`:
```bash
mvn test
```
*ระบบจะทำการทดสอบ:*
- `LeaseServiceTest`: ทดสอบโลจิกป้องกันการจอง/เช่าซ้อน (Occupancy Conflict Prevention) ในห้องเดียวกันช่วงเวลาเดียวกัน
- `RoomServiceTest`: ทดสอบโครงสร้าง 24 ห้องพัก (ชั้น 1 มี 12 ห้อง, ชั้น 2 มี 12 ห้อง)

### 2. ทดสอบระบบทางหน้าเว็บ (Manual Verification Checklist):

| หัวข้อทดสอบ | ขั้นตอนการทดสอบ | ผลลัพธ์ที่คาดหวัง |
|---|---|---|
| **24 Rooms Dashboard** | เข้าหน้า Dashboard | เห็นห้องพัก 24 ห้อง (ชั้น 1: 101-112, ชั้น 2: 201-212) พร้อมสัญลักษณ์สถานะ |
| **Prevent Occupancy Conflict** | ลองสร้าง Lease ใหม่ที่ห้อง 101 ช่วงเวลาเดียวกับ Somchai | ระบบแสดง Toast Error เตือน "Conflict!" และไม่อนุญาตให้สร้างซ้ำ |
| **Print Receipt & Contract** | ไปที่เมนู "Utility Bills & Receipts" หรือ "Tenants" -> กด "Print Receipt" หรือ "Lease Contract" | แสดง Modal หน้าพิมพ์ใบเสร็จ/สัญญาเช่า สามารถสั่ง Print หรือ Save PDF ได้ |
| **Maintenance & Supply Tracking** | ไปที่เมนู "Maintenance & Supplies" -> สร้างงานซ่อมเปลี่ยนหลอดไฟ | บันทึกงานสำเร็จ อะไหล่ถูกตัดสต็อก และบันทึกเข้า Per-unit log ของห้องนั้น |
| **Recurring Reminders** | ไปที่แท็บ "Scheduled Reminders" | เห็นรายการเตือนล้างแอร์/ตรวจถังดับเพลิง สามารถกด Toggle สวิตช์ปิด/เปิดได้ |

---

## 🔑 ข้อมูลเข้าสู่ระบบ (Admin Access)
- **URL**: `http://localhost:5173/login` (หรือ `http://localhost/login` บน Docker)
- **Username / Email**: `admin`
- **Password**: `admin`
