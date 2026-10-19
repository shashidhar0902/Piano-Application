import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.clefring.app",
  appName: "Clefring",
  webDir: "mobile-web",
  bundledWebRuntime: false,
  android: {
    allowMixedContent: false,
  },
};

export default config;
