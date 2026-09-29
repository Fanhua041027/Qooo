# P0-11 运营配置页设计交付

## 交付范围

运营账号从“我的 → 运营配置”进入配置管理页。首版使用与未来服务端字段一致的本地 Mock，页面和交互已经按 Figma 可拆分的 Frame 结构实现，前端可以直接依照本文件和运行页面开发。

建议在 Figma 建立页面 `P0-11 运营配置`，Frame 命名如下：

```text
P0-11 运营配置/
├── 01 配置列表/Default · Empty · Error · Offline · 375
├── 02 配置详情/Read only · Long text · Large type
├── 03 编辑/Edit · Disabled · Loading · Save error
├── 04 保存前预览/Bottom sheet · 375
├── 05 保存结果/Success · Failure
├── 06 版本恢复/Confirm · Success · Failure
└── 07 组件标注/QdUI · Tokens · Interaction
```

仓库中的可运行页面位于 `src/pages/ops-config`，本文件承担 Figma 页面、组件标注和状态验收说明。设计工具中同步时，使用同名 Frame 与下面的状态名称，避免前端自行猜测。

## 页面和状态

| 状态 | 触发 | 页面反馈和下一步 |
| --- | --- | --- |
| 配置列表 | 运营账号正常进入 | 每行显示名称、分类、发布状态、当前版本、最后修改时间、修改人；点击行进入详情 |
| 配置详情 | 点击列表项 | 默认只读，展示完整文案和版本元信息；点击“编辑配置”进入编辑 |
| 编辑状态 | 点击编辑 | Textarea 支持换行和 2000 字；显示字数计数、文案规范提示、保存前预览 |
| 保存前预览 | 文案发生变化后点击“预览并保存” | Bottom sheet 展示新文案和影响说明；“返回修改”关闭，“确认保存”进入 loading |
| 保存中 | 点击确认保存 | 主按钮显示 loading，按钮 disabled，防止重复提交 |
| 保存成功 | 服务返回成功 | 关闭预览，回到只读详情，显示绿色成功反馈和新版本号，历史记录新增上一版本 |
| 保存失败 | 服务校验失败或网络失败 | 文案保留在编辑器；红色错误块同时显示“保存失败”和原因；按钮切为危险色“重新预览并保存” |
| 恢复上一版本 | 点击历史记录的“恢复” | 先弹出确认弹窗；确认后 loading，成功生成 `vX.Y-恢复` 新版本，当前版本进入历史 |
| 未授权访问 | 未登录或普通农户账号进入 | ErrorState 显示无权访问和原因；按钮返回“我的”，不调用配置 API |
| 空配置 | 服务返回空数组 | EmptyState 说明会继续使用安全默认文案，提供“重新读取” |
| 加载失败 | 首次列表读取失败 | ErrorState 提供重试；已有数据时保留旧列表并显示顶部错误提示 |
| 离线 | 网络断开 | 顶部显示“离线”，保存和恢复按钮 disabled；网络恢复后自动刷新 |
| 长文案 | 文案包含多行或超过一屏 | 所有内容使用 `pre-wrap`、`break-word`，允许纵向增长，不截断、不用省略号 |
| 大字号 | `large=1` 或系统大字号演示 | 标题、正文、辅助文本同步放大，布局改为自然高度，375px 下仍可滚动 |

## 组件标注

| 组件 | 用法 | 关键状态 |
| --- | --- | --- |
| `Button` | 主操作、取消、恢复 | primary、secondary、ghost、danger；保存支持 loading、disabled、error |
| `Badge` | 发布状态、分类、网络状态 | 文字必须表达含义，风险不可只靠颜色 |
| `Field` / `Textarea` | 多行文案编辑 | 标签、占位、最大长度、错误边框 |
| `EmptyState` | 空配置 | 标题、原因、恢复动作 |
| `ErrorState` | 未授权、加载错误 | 标题、可读原因、重试或返回入口 |
| `LoadingState` | 首次读取 | 状态文本“正在读取最新配置” |
| `Toast` | 保存/恢复成功 | 仅作为即时反馈，页面同时保留成功状态 |
| `BottomSheet`（页面实现） | 保存前预览 | 遮罩、拖拽提示、长文案滚动、返回修改/确认保存 |

## Token

页面沿用 `src/styles/tokens.scss`：

| Token | 值 | 用途 |
| --- | --- | --- |
| `--qd-primary` | `#25666D` | 主按钮、链接、分类 |
| `--qd-primary-strong` | `#174B51` | 标题、激活态 |
| `--qd-primary-soft` | `#E7F1F2` | 列表激活背景、辅助面 |
| `--qd-warning` | `#9B5B12` | 离线、草稿 |
| `--qd-warning-soft` | `#FFF0D9` | 离线/读取错误背景 |
| `--qd-danger` | `#B63F37` | 保存失败、危险操作 |
| `--qd-success` | `#277A4C` | 已发布、成功反馈 |
| `--qd-surface` | `#FFFFFF` | 卡片、Bottom sheet |
| `--qd-border` | `#D4E0E1` | 分隔线、输入边框 |
| `--qd-foreground` | `#172B2E` | 主要文字 |
| `--qd-muted-foreground` | `#465F62` | 辅助文字，保持可读对比度 |

文字层级：页面标题 48rpx，卡片标题 36rpx，正文 29rpx，辅助信息 23–25rpx。大字号模式将正文提升到 32rpx、标题提升到 56rpx，并保持自然换行。

## 375px 规则

- 页面左右内边距保持 32rpx，列表行改为自然高度，版本和时间允许换行。
- 卡片头部由横向改为纵向，状态 Badge 放到标题下方。
- 历史版本的恢复按钮单独占一行，点击热区不低于 88rpx。
- 保存操作保持底部可见，预览 Bottom sheet 最大高度 86vh，内容独立滚动。
- 长文案使用 `white-space: pre-wrap`、`overflow-wrap: anywhere` 和 `word-break: break-word`。

## 交互验收

1. 运营账号登录后，3 秒内可以在“我的”看到“运营配置”入口。
2. 普通账号访问路径时，不读取、不保存配置数据。
3. 列表每一项都同时显示当前版本和最后修改时间。
4. 未修改、空文案、离线、保存中时，保存按钮均 disabled；保存中显示 loading。
5. 保存失败不丢失用户输入，恢复失败不改变当前配置。
6. 风险和发布状态同时使用文字 Badge 与图形/布局区分，不依赖颜色 alone。
7. 保存前预览必须点击“确认保存”才会调用保存接口。

## 演示路径

开发环境可以使用以下 query 直接验收状态：

- `/pages/ops-config/index?state=empty`
- `/pages/ops-config/index?state=error`
- `/pages/ops-config/index?state=unauthorized`
- `/pages/ops-config/index?state=long&large=1`
- `/pages/ops-config/index?state=save-error`，编辑后保存会触发错误反馈
- `/pages/ops-config/index?key=risk.medium.label`

