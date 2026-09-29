import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'node',
    // Mock 存储使用进程内状态，单线程可避免不同测试文件互相污染。
    singleThread: true,
    include: ['packages/**/*.test.ts', 'src/**/*.test.ts']
  }
})
