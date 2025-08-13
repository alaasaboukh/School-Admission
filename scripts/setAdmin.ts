import * as admin from "firebase-admin";
import * as fs from "fs";

// تحميل ملف الصلاحيات
const serviceAccount = JSON.parse(
  fs.readFileSync("scripts/serviceAccountKey.json", "utf8")
);

// تهيئة Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// ✨ الـ UID بتاعك
const uid = "BM0OKO0zElUjWO1nvbvqfOwt9SB3";

// تعيين صلاحية الأدمن
admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log("✅ تم تعيين الحساب كـ أدمن بنجاح.");
    process.exit();
  })
  .catch((error) => {
    console.error("❌ حصل خطأ:", error);
    process.exit(1);
  });
