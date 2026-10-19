# Android APK

The Android app is a fully offline Capacitor app. The React app, curriculum,
fonts, styles, and local progress logic are bundled into the APK. No deployed
website or `CAP_SERVER_URL` is required.

## GitHub Actions build

1. Push the repository to GitHub.
2. Open **Actions → Build Android APK → Run workflow**.
3. Download the `clefring-debug-apk` artifact from the completed workflow run.
4. Transfer `app-debug.apk` to an Android phone and allow installation from that
   source when Android asks.

The workflow also runs automatically on pushes to `master`.

## Local Android build

Install Android Studio with the Android SDK, SDK Platform 36, and Android SDK
Build-Tools. Then run from the project root:

```powershell
npm ci
npm run mobile:sync
cd android
.\gradlew.bat assembleDebug
```

The APK is generated at:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

To open the native project in Android Studio:

```powershell
npm run mobile:open
```

## Important behavior

- The APK does not require an internet connection.
- Drill progress is stored locally on the device.
- The APK contains the current curriculum and UI. Rebuild the APK after code
  changes to distribute an updated version.
- Android back from a drill returns to the chapter list.
- Android back from the chapter list exits the app.
- The web app remains usable independently of the APK.
