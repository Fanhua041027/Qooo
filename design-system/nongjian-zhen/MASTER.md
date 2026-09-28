# 农间诊设计系统主规范

本文件是机器可检索的设计系统入口，详细规范以项目根目录 `DESIGN.md` 为准。

## Foundation

- Platform: WeChat Mini Program
- Register: product
- Strategy: restrained
- Primary: `#25666d`
- Primary strong: `#174b51`
- Accent: `#b65e18`
- Background: `#f6f8f8`
- Surface: `#ffffff`
- Ink: `#172b2e`
- Secondary ink: `#465f62`
- Border: `#d8e2e3`
- Radius: 12 / 20 / 28rpx
- Spacing: 8rpx base grid
- Touch target: minimum 88 × 88rpx
- Motion: 150–250ms ease-out; support reduced motion

## Product rules

- 首页首屏只突出拍照诊断。
- 诊断结果先显示风险和下一步行动，再显示依据。
- 颜色不单独表达风险。
- 失败状态说明原因、数据是否保留和恢复动作。
- 卡片不嵌套；边框与宽阴影不同时使用。
- 所有固定底栏尊重安全区。
