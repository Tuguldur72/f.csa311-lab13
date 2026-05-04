# Personal Task Tracker API (Part B - Build)

Энэхүү төсөл нь Node.js, Express, болон MongoDB ашиглан бүтээсэн ажлын бүртгэлийн систем юм.

## Суулгах заавар
1. Хавтас руу орох: `cd partB`
2. Сангуудыг суулгах: `npm install`
3. Орчны хувьсагчийг тохируулах: `.env` файл үүсгэж `MONGO_URI` болон `PORT` утгуудыг тохируулна.

## Ажиллуулах
*   Development: `npm start`
*   Тест ажиллуулах: `npm test`

## Архитектур
*   **Models:** Mongoose ашиглан өгөгдлийн бүтцийг тодорхойлсон.
*   **Controllers:** Бизнес логик болон аюулгүй байдлын шалгалт (Mass Assignment protection).
*   **Routes:** API-ийн замуудыг тодорхойлсон.

## Технологийн стек
- Node.js & Express.js
- MongoDB (Mongoose)
- Jest & Supertest (Testing)
- Helmet & Rate Limit (Security)