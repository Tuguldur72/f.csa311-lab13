# OWASP Top 10 Security Review – taskController.js

## 1. Broken Access Control

**Асуудал:**

* Endpoint-ууд дээр authentication / authorization алга
* Хэн ч бүх task-уудыг харах, үүсгэх боломжтой

**Шийдэл:**

* JWT / session-based auth нэмэх
* Role-based access control (RBAC) хэрэглэх

---

## 2. Injection (NoSQL Injection)

**Асуудал:**

* `Task.create(req.body)` шууд хэрэглэж байна
* `req.body` validate хийгдээгүй → MongoDB injection боломжтой

**Шийдэл:**

* Input validation (Joi / express-validator)
* Allowed fields whitelist хийх

```js
const { title, description } = req.body;
const newTask = await Task.create({ title, description });
```

---

## 3. Insecure Design

**Асуудал:**

* Business logic validation байхгүй (жишээ: хоосон task, урт текст)

**Шийдэл:**

* Model level validation (Mongoose schema)
* Required, maxlength тохиргоо

---

## 4. Security Misconfiguration

**Асуудал:**

* Error message шууд буцааж байна (`err.message`)
* Internal мэдээлэл алдагдах эрсдэлтэй

**Шийдэл:**

```js
res.status(400).json({ success: false, error: "Bad Request" });
```

---

## 5. Sensitive Data Exposure

**Асуудал:**

* Одоогоор мэдрэмтгий өгөгдөл байхгүй
* Гэхдээ future-д encryption хэрэгтэй байж болно

---

## 6. Logging & Monitoring Failures

**Асуудал:**

* Error log хадгалахгүй байна

**Шийдэл:**

* Winston / Morgan ашиглах
* Error-уудыг файл эсвэл monitoring system руу бичих

---

## 7. Lack of Rate Limiting

**Асуудал:**

* API abuse хамгаалалт алга

**Шийдэл:**

* express-rate-limit ашиглах

---

## 8. Mass Assignment Vulnerability

**Асуудал:**

* `req.body` бүхэлд нь DB-д орж байна
* Хэрэглэгч хүсээгүй field нэмэх боломжтой

**Шийдэл:**

* Allowed fields filter хийх

---

## Сайжруулсан жишээ код

```js
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: "Title required" });
    }

    const newTask = await Task.create({ title, description });

    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
```

---

## Дүгнэлт

Таны код:

* ✔ Энгийн CRUD зөв ажиллах боломжтой
* ❌ Security layer бараг байхгүй

**Хамгийн чухал сайжруулалт:**

1. Input validation
2. Authentication / Authorization
3. Error handling
4. Mass assignment хамгаалалт

---
