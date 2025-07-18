# 🚀 Task: Implement Logout Flow in Home.tsx

## 📋 Overview

คุณต้องเพิ่ม logout functionality ในหน้า Home โดยใช้ pattern เดียวกับที่มีอยู่ในไฟล์ Login.tsx

## 🎯 What You Need To Do

### 1. เพิ่ม Imports และ State

```typescript
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
```

### 2. เพิ่ม useRef สำหรับ authChannel

```typescript
const authChannelRef = useRef<BroadcastChannel | null>(null);
```

### 3. Copy Functions จาก Login.tsx

คัดลอก functions เหล่านี้จาก Login.tsx มาใช้:

- `isAuthenticated()` - ตรวจสอบว่า user login อยู่หรือไม่
- สร้าง `handleLogout()` function ใหม่

### 4. สร้าง handleLogout Function

```typescript
const handleLogout = useCallback(() => {
  // 1. ลบ user จาก localStorage
  localStorage.removeItem("user");

  // 2. ส่งสัญญาณ LOGOUT ไปแท็บอื่น
  authChannelRef.current?.postMessage({ type: "LOGOUT" });

  // 3. Navigate ไปหน้า login
  navigate("/login");
}, [navigate]);
```

### 5. เพิ่ม Auth Logic ใน useEffect

ใน useEffect ให้เพิ่ม:

```typescript
useEffect(() => {
  // สร้าง auth channel
  const authChannel = new BroadcastChannel("auth_channel");
  authChannelRef.current = authChannel;

  // ตรวจสอบ authentication
  if (!isAuthenticated()) {
    navigate("/login");
    return;
  }

  // สร้าง handler สำหรับ LOGOUT events จากแท็บอื่น
  const authHandler = (
    event: MessageEvent<{ type: string; user?: string }>
  ) => {
    if (event.data.type === "LOGOUT" && !isAuthenticated()) {
      navigate("/login");
    }
  };

  authChannel.addEventListener("message", authHandler);

  // ... existing bcMsg code ...

  return () => {
    bcMsg.close();
    authChannel.removeEventListener("message", authHandler);
    authChannel.close();
  };
}, [navigate, isAuthenticated]); // อย่าลืม dependencies
```

## 🔍 Reference Files

### Login.tsx - ใช้เป็น Template

ไฟล์ `Login.tsx` มี comments `✅ REFERENCE:` ที่บอกว่าส่วนไหนสามารถ copy มาใช้ได้

### Pattern ที่ต้องทำตาม:

1. **BroadcastChannel Setup** - เหมือนกับใน Login.tsx
2. **Message Handler** - แต่ฟัง "LOGOUT" แทน "LOGIN"
3. **Navigation Logic** - ตรงข้ามกับ Login (logout → /login)
4. **Cleanup Pattern** - เหมือนกันทุกประการ

## 🧪 Testing Your Implementation

### ทดสอบ Cross-tab Logout:

1. เปิด 2 แท็บของแอป
2. Login ในทั้ง 2 แท็บ
3. กด Logout ในแท็บใดแท็บหนึ่ง
4. แท็บอื่นต้อง redirect ไป login อัตโนมัติ

### ทดสอบ Authentication Check:

1. เข้าหน้า Home โดยไม่ login
2. ต้อง redirect ไป login อัตโนมัติ
3. Login แล้วเข้าหน้า Home ต้องอยู่ได้

**หมายเหตุ:** ถ้าติดปัญหาตรงไหน ให้ดู Login.tsx เพราะมี pattern ที่ใช้ได้แล้ว!
