import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.listviewbug',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;