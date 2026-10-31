// Konfigurasi aplikasi (APK) — edit file ini saja untuk mengganti link download.
// Set `enabled: true` dan isi `url` setelah APK siap dipublikasikan.

export const appConfig = {
  appName: "TaoSite",
  tagline: "Downloader super cepat, langsung dari HP.",
  latestVersion: "1.0.0",
  updatedNote: "Rilis perdana — ringan, tanpa iklan, tanpa login.",
  android: {
    label: "Android (APK)",
    version: "1.0.0",
    size: "±15 MB",
    minOs: "Android 8.0+",
    url: "", // <-- isi link download APK di sini (contoh: https://.../taosite.apk)
    enabled: false, // <-- ubah ke true saat link sudah diisi
  },
  ios: {
    label: "iOS (TestFlight)",
    version: "1.0.0",
    size: "±20 MB",
    minOs: "iOS 14+",
    url: "", // <-- isi link TestFlight / App Store di sini
    enabled: false,
  },
  // Link alternatif (opsional): mirror, Drive, dsb.
  mirrors: [
    // { label: "Mirror — Google Drive", url: "https://drive.google.com/..." },
  ],
};
