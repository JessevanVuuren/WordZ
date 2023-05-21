import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Wordz.app',
  appName: 'WordZ',
  webDir: 'dist/angular_wordz',
  server: {
    androidScheme: 'https'
  }
};

export default config;
