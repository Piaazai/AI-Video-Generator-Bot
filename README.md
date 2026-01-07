<div align="center">

# 🎬 Piaaz AI Video Generator Bot

### ✨ توليد الفيديوهات بالذكاء الاصطناعي عبر تيليجرام.✨

[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/piaazgroup)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@piaazai)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/piaazai)
[![Website](https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=About.me&logoColor=white)](https://piaaz.com)

**🌐 [English](#english) | [العربية](#العربية)**

---

</div>

---

<div id="العربية">

# 🇸🇦 العربية

## 📖 نظرة عامة

**Piaaz AI Video Generator Bot** هو بوت تيليجرام متقدم لتوليد الفيديوهات باستخدام الذكاء الاصطناعي. البوت يتكامل مع [kie.ai API](https://kie.ai) لإنشاء فيديوهات احترافية من خلال واجهة سهلة الاستخدام في تيليجرام.

### 🎯 المميزات الرئيسية

- 🎬 **توليد فيديوهات بالذكاء الاصطناعي** - أنشئ فيديوهات احترافية بسهولة
- 📚 **مكتبة الفيديوهات** - احفظ وادير جميع الفيديوهات المولدة
- 📺 **نشر مباشر على يوتيوب** - انشر الفيديوهات على قناتك مباشرة
- ⚙️ **إعدادات يوتيوب متقدمة** - ربط قناتك بسهولة باستخدام OAuth 2.0
- 🔄 **تحويل تلقائي للصيغ** - يدعم جميع صيغ الفيديو الشائعة
- 🎨 **واجهة مستخدم جميلة** - أزرار تفاعلية وسهلة الاستخدام
- 🧹 **تنظيف تلقائي للشات** - حذف الرسائل القديمة تلقائياً
- 📊 **لوجات مفصلة** - تتبع جميع العمليات بسهولة

### 🚀 المميزات التقنية

- ✅ تكامل كامل مع **kie.ai API**
- ✅ قاعدة بيانات **Supabase** موثوقة
- ✅ سيرفر **Express.js** جاهز للنشر
- ✅ معالجة شاملة للأخطاء
- ✅ دعم **OAuth 2.0** لليوتيوب
- ✅ تحويل تلقائي للفيديوهات
- ✅ تخزين سحابي للفيديوهات

---

## 📋 المتطلبات

قبل البدء، تأكد من توفر:

- **Node.js** 18 أو أحدث
- حساب **Telegram Bot** (احصل على Token من [@BotFather](https://t.me/BotFather))
- حساب **Supabase** (للقاعدة البيانات والتخزين)
- **API Key** من [kie.ai](https://kie.ai)
- حساب **Render** أو أي منصة نشر (لنشر السيرفر)
- **Google Cloud Console** (لإعداد يوتيوب OAuth 2.0)

---

## 🛠️ التثبيت والإعداد

### 1️⃣ استنساخ المشروع

```bash
git clone <repository-url>
cd Bot
```

### 2️⃣ تثبيت المتطلبات

```bash
cd backend
npm install
```

### 3️⃣ إعداد المتغيرات البيئية

أنشئ ملف `.env` في مجلد `backend`:

```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# KIE.ai API
KIE_API_KEY=your_kie_api_key
KIE_API_URL=https://api.kie.ai

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# Server
PORT=3000
CALLBACK_BASE_URL=https://your-app-name.onrender.com
```

### 4️⃣ إعداد قاعدة البيانات

1. سجل دخول إلى [Supabase Dashboard](https://supabase.com)
2. أنشئ مشروع جديد
3. اذهب إلى **SQL Editor**
4. نفذ ملف `database/complete_schema.sql` لإنشاء جميع الجداول

### 5️⃣ إعداد Supabase Storage

1. في Supabase Dashboard، اذهب إلى **Storage**
2. أنشئ bucket جديد باسم `videos`
3. عيّن الإعدادات:
   - **Public**: `false` (خاص)
   - **File size limit**: `100 MB`
   - **Allowed MIME types**: `video/*`

---

## 🚀 النشر على Render

### خطوات النشر:

1. سجل دخول إلى [Render Dashboard](https://render.com)
2. انقر على **New +** → **Web Service**
3. اربط المستودع الخاص بك
4. حدد الإعدادات:
   - **Name**: `piaaz-video-bot`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
5. أضف **Environment Variables** من ملف `.env`
6. انقر على **Create Web Service**

### ⚙️ إعدادات إضافية:

- **Auto-Deploy**: `Yes` (للنشر التلقائي عند الدفع)
- **Health Check Path**: `/health` (اختياري)

---

## 📱 الاستخدام

### بدء الاستخدام:

1. ابحث عن البوت في تيليجرام
2. اضغط `/start` لبدء العملية
3. اتبع التعليمات:
   - 🎬 اضغط **"بدء توليد فيديو جديد"**
   - 📹 أرسل الفيديو المرجعي (3-30 ثانية)
   - 🖼️ أرسل الصورة المرجعية
   - ✍️ اكتب وصف الفيديو (برومبت)
4. ⏳ انتظر حتى يتم توليد الفيديو
5. 📺 انشر الفيديو على يوتيوب مباشرة!

### إعداد قناة يوتيوب:

1. اضغط **"⚙️ إعداد قناة يوتيوب"**
2. أدخل **Client Secret** من Google Cloud Console
3. أدخل **Client ID** من Google Cloud Console
4. أدخل **Refresh Token** من OAuth 2.0 Playground
5. ✅ تم! الآن يمكنك نشر الفيديوهات مباشرة

---

## 🏗️ البنية

```
Bot/
├── backend/
│   ├── bot/
│   │   ├── bot.js                      # إعداد البوت الرئيسي
│   │   ├── handlers/
│   │   │   ├── messageHandler.js       # معالجة الرسائل
│   │   │   ├── callbackHandler.js      # معالجة الأزرار
│   │   │   └── videoLibraryHandler.js  # إدارة مكتبة الفيديوهات
│   │   └── messages.js                 # رسائل البوت
│   ├── db/
│   │   ├── supabase.js                 # عميل Supabase
│   │   └── database.js                 # عمليات قاعدة البيانات
│   ├── services/
│   │   ├── kieService.js               # تكامل مع kie.ai API
│   │   └── youtubeService.js           # تكامل مع YouTube API
│   ├── routes/
│   │   └── callback.js                 # معالج callback من kie.ai
│   ├── utils/
│   │   ├── validators.js               # التحقق من الملفات
│   │   ├── videoConverter.js           # تحويل الفيديوهات
│   │   ├── storage.js                  # رفع الملفات إلى Supabase
│   │   └── logger.js                   # نظام اللوجات
│   ├── server.js                       # سيرفر Express
│   └── package.json
├── database/
│   └── complete_schema.sql             # مخطط قاعدة البيانات الكامل
└── README.md
```

---

## 📊 الجداول في قاعدة البيانات

- **user_states** - حالات المستخدمين في المحادثة
- **user_tasks** - مهام توليد الفيديوهات
- **generated_videos** - مكتبة الفيديوهات المولدة
- **youtube_channels** - إعدادات قنوات يوتيوب
- **youtube_uploads** - سجل رفع الفيديوهات على يوتيوب

---

## 🔧 الأوامر المتاحة

| الأمر | الوصف |
|------|-------|
| `/start` | بدء استخدام البوت |
| `🎬 بدء توليد فيديو جديد` | بدء عملية توليد فيديو |
| `📚 مكتبة الفيديوهات` | عرض جميع الفيديوهات المولدة |
| `⚙️ إعداد قناة يوتيوب` | إعداد/تعديل قناة يوتيوب |
| `📺 رفع على يوتيوب` | رفع فيديو على يوتيوب |
| `🔙 القائمة الرئيسية` | العودة للقائمة الرئيسية |

---

## 🐛 استكشاف الأخطاء

### مشاكل شائعة:

1. **البوت لا يستجيب**
   - تحقق من صحة `TELEGRAM_BOT_TOKEN`
   - تأكد من أن السيرفر يعمل

2. **خطأ في قاعدة البيانات**
   - تحقق من `SUPABASE_URL` و `SUPABASE_KEY`
   - تأكد من تنفيذ `complete_schema.sql`

3. **فشل توليد الفيديو**
   - تحقق من صحة `KIE_API_KEY`
   - تأكد من أن الفيديو والصورة صحيحين

4. **مشكلة في رفع يوتيوب**
   - تحقق من صحة بيانات OAuth 2.0
   - تأكد من تفعيل YouTube Data API v3

---

## 📝 اللوجات

جميع العمليات مسجلة بوضوح مع:
- ⏰ الطوابع الزمنية
- 👤 معرفات المستخدمين
- 📊 حالات المهام
- ❌ الأخطاء والتفاصيل
- ✅ العمليات الناجحة

---

## 🔗 روابط التواصل

<div align="center">

### 🌐 الموقع الرسمي
**[piaaz.com](https://piaaz.com)**

### 📱 وسائل التواصل الاجتماعي

[![Telegram Group](https://img.shields.io/badge/Telegram%20Group-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/piaazgroup)
[![YouTube Channel](https://img.shields.io/badge/YouTube%20Channel-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@piaazai)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/piaazai)

</div>

---

## 📄 الرخصة

ISC License

---

<div id="english"></div>

# 🇺🇸 English

## 📖 Overview

**Piaaz AI Video Generator Bot** is an advanced Telegram bot for generating videos using artificial intelligence. The bot integrates with [kie.ai API](https://kie.ai) to create professional videos through an easy-to-use Telegram interface.

### 🎯 Key Features

- 🎬 **AI Video Generation** - Create professional videos easily
- 📚 **Video Library** - Save and manage all generated videos
- 📺 **Direct YouTube Publishing** - Publish videos to your channel directly
- ⚙️ **Advanced YouTube Settings** - Link your channel easily using OAuth 2.0
- 🔄 **Automatic Format Conversion** - Supports all common video formats
- 🎨 **Beautiful User Interface** - Interactive and easy-to-use buttons
- 🧹 **Automatic Chat Cleanup** - Automatically delete old messages
- 📊 **Detailed Logging** - Track all operations easily

### 🚀 Technical Features

- ✅ Full integration with **kie.ai API**
- ✅ Reliable **Supabase** database
- ✅ **Express.js** server ready for deployment
- ✅ Comprehensive error handling
- ✅ **OAuth 2.0** support for YouTube
- ✅ Automatic video conversion
- ✅ Cloud storage for videos

---

## 📋 Requirements

Before starting, make sure you have:

- **Node.js** 18 or later
- **Telegram Bot** account (Get Token from [@BotFather](https://t.me/BotFather))
- **Supabase** account (for database and storage)
- **API Key** from [kie.ai](https://kie.ai)
- **Render** account or any deployment platform (to deploy the server)
- **Google Cloud Console** (for YouTube OAuth 2.0 setup)

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd Bot
```

### 2️⃣ Install Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the `backend` folder:

```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# KIE.ai API
KIE_API_KEY=your_kie_api_key
KIE_API_URL=https://api.kie.ai

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# Server
PORT=3000
CALLBACK_BASE_URL=https://your-app-name.onrender.com
```

### 4️⃣ Setup Database

1. Log in to [Supabase Dashboard](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor**
4. Execute `database/complete_schema.sql` to create all tables

### 5️⃣ Setup Supabase Storage

1. In Supabase Dashboard, go to **Storage**
2. Create a new bucket named `videos`
3. Set the settings:
   - **Public**: `false` (private)
   - **File size limit**: `100 MB`
   - **Allowed MIME types**: `video/*`

---

## 🚀 Deployment on Render

### Deployment Steps:

1. Log in to [Render Dashboard](https://render.com)
2. Click **New +** → **Web Service**
3. Connect your repository
4. Set the settings:
   - **Name**: `piaaz-video-bot`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
5. Add **Environment Variables** from `.env` file
6. Click **Create Web Service**

### ⚙️ Additional Settings:

- **Auto-Deploy**: `Yes` (for automatic deployment on push)
- **Health Check Path**: `/health` (optional)

---

## 📱 Usage

### Getting Started:

1. Search for the bot in Telegram
2. Press `/start` to begin
3. Follow the instructions:
   - 🎬 Press **"Start New Video Generation"**
   - 📹 Send the reference video (3-30 seconds)
   - 🖼️ Send the reference image
   - ✍️ Write the video description (prompt)
4. ⏳ Wait for the video to be generated
5. 📺 Publish the video to YouTube directly!

### YouTube Channel Setup:

1. Press **"⚙️ YouTube Channel Setup"**
2. Enter **Client Secret** from Google Cloud Console
3. Enter **Client ID** from Google Cloud Console
4. Enter **Refresh Token** from OAuth 2.0 Playground
5. ✅ Done! Now you can publish videos directly

---

## 🏗️ Project Structure

```
Bot/
├── backend/
│   ├── bot/
│   │   ├── bot.js                      # Main bot setup
│   │   ├── handlers/
│   │   │   ├── messageHandler.js       # Message handling
│   │   │   ├── callbackHandler.js      # Button handling
│   │   │   └── videoLibraryHandler.js  # Video library management
│   │   └── messages.js                 # Bot messages
│   ├── db/
│   │   ├── supabase.js                 # Supabase client
│   │   └── database.js                 # Database operations
│   ├── services/
│   │   ├── kieService.js               # kie.ai API integration
│   │   └── youtubeService.js           # YouTube API integration
│   ├── routes/
│   │   └── callback.js                 # kie.ai callback handler
│   ├── utils/
│   │   ├── validators.js               # File validation
│   │   ├── videoConverter.js           # Video conversion
│   │   ├── storage.js                  # File upload to Supabase
│   │   └── logger.js                   # Logging system
│   ├── server.js                       # Express server
│   └── package.json
├── database/
│   └── complete_schema.sql             # Complete database schema
└── README.md
```

---

## 📊 Database Tables

- **user_states** - User conversation states
- **user_tasks** - Video generation tasks
- **generated_videos** - Generated videos library
- **youtube_channels** - YouTube channel settings
- **youtube_uploads** - YouTube upload records

---

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `/start` | Start using the bot |
| `🎬 Start New Video Generation` | Start video generation process |
| `📚 Video Library` | View all generated videos |
| `⚙️ YouTube Channel Setup` | Setup/edit YouTube channel |
| `📺 Upload to YouTube` | Upload video to YouTube |
| `🔙 Main Menu` | Return to main menu |

---

## 🐛 Troubleshooting

### Common Issues:

1. **Bot not responding**
   - Check `TELEGRAM_BOT_TOKEN` validity
   - Ensure server is running

2. **Database error**
   - Check `SUPABASE_URL` and `SUPABASE_KEY`
   - Ensure `complete_schema.sql` is executed

3. **Video generation failed**
   - Check `KIE_API_KEY` validity
   - Ensure video and image are correct

4. **YouTube upload issue**
   - Check OAuth 2.0 credentials
   - Ensure YouTube Data API v3 is enabled

---

## 📝 Logging

All operations are logged clearly with:
- ⏰ Timestamps
- 👤 User IDs
- 📊 Task states
- ❌ Errors and details
- ✅ Successful operations

---

## 🔗 Contact Links

<div align="center">

### 🌐 Official Website
**[piaaz.com](https://piaaz.com)**

### 📱 Social Media

[![Telegram Group](https://img.shields.io/badge/Telegram%20Group-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/piaazgroup)
[![YouTube Channel](https://img.shields.io/badge/YouTube%20Channel-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@piaazai)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/piaazai)

</div>

---

## 📄 License

ISC License

---

<div align="center">

### ⭐ Made with ❤️ by [Piaaz](https://piaaz.com)

**🎬 Generate Amazing Videos with AI 🎬**

</div>

