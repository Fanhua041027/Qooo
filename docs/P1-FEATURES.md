# 农间诊 P1 田间服务接口契约

本轮扩展天气、农资商城、农业社区和专家复核。所有接口都要求 Bearer 登录，响应统一由后端封装为 `ApiEnvelope`。天气、商品目录和专家目录当前使用可替换的目录 Provider；订单、社区内容、点赞、会话和消息真实写入 PostgreSQL。

## 天气

`GET /api/v1/weather/overview?location=浙江省杭州市临安区`

返回 `WeatherOverview`：`location`、`updatedAt`、`current`（温度、体感、天气、湿度、风力、UV）、`forecast[]`（日期、天气、高低温、降水概率、风力）、`alerts[]`（等级、标题、内容、行动建议）和 `source`。当配置了 `WEATHER_API_KEY` 或复用 `SHENNONG_API_KEY` 时，后端通过 `/chat/completions` 的 `weather_get_forecast` 工具读取真实数据；没有密钥或明确设置 `WEATHER_PROVIDER=mock` 时使用演示数据。

`GET /api/v1/weather/forecast?location=浙江省杭州市临安区&days=5&granularity=daily`

支持中国县区名称或 `latitude`、`longitude`，`days` 范围为 1–15，`granularity` 支持 `daily` 和 `hourly`。真实 Provider 使用 `weather_get_forecast`，返回 `daily[]`，请求逐小时时返回 `hourly[]`。

`GET /api/v1/weather/history?location=浙江省杭州市临安区&startDate=2026-09-21&endDate=2026-09-28`

使用 `weather_get_history` 查询最近两年内的历史再分析天气，单次最多 31 天。页面默认读取最近 7 天，用于复盘连续高湿、降雨和异常发生的关系；历史数据仍然属于农业决策参考，不能替代现场观测。

天气页面使用微信原生 `Picker mode="region"` 选择省、市、区县，用户不能手动输入地区。选中的地区会保存到当前设备，下次进入天气页继续使用；查询请求使用选中的区县名称，后续可扩展为绑定农场地块坐标。

## 商城

`GET /api/v1/shop/products?category=BIOCONTROL`

返回商品分页结果。商品目录字段为 `id`、`name`、`subtitle`、`category`、`categoryLabel`、`price`、`unit`、`stock`、`badge`、`safetyNote`、`suitableCrops`。

`POST /api/v1/shop/orders`

请求：`{ items: [{ productId, quantity }], address, note? }`。地址和商品明细必填，数量必须为正整数且不能超过目录库存。订单状态只允许返回 `PENDING_PAYMENT`、`PROCESSING`、`COMPLETED`，本轮只创建 `PENDING_PAYMENT`，不接入真实支付、物流或分佣。

订单和订单明细真实持久化到 `ShopOrder`、`ShopOrderItem`。商品目录价格和库存当前来自 Provider，接入真实库存时必须在同一事务内锁定库存并扣减。

## 社区

`GET /api/v1/community/posts?topic=番茄`

返回最近 50 条帖子，字段为 `id`、`author`、`role`、`crop`、`title`、`content`、`tags`、`likes`、`comments`、`liked`、`createdAt`。

`POST /api/v1/community/posts`

请求：`{ title, content, crop?, tags? }`。标题不能为空且不超过 80 字，内容不能为空且不超过 2000 字，标签最多 5 个。内容审核、举报和评论系统暂不包含在本轮，发布前必须保留安全提醒。

`POST /api/v1/community/posts/{postId}/like`

切换当前用户点赞状态。`CommunityPostLike` 使用 `(postId, userId)` 唯一约束，避免同一用户重复点赞。

## 专家复核聊天

`GET /api/v1/experts` 返回专家目录；专家资料字段为 `id`、`name`、`title`、`specialty`、`crops`、`online`、`responseTime`、`rating`、`cases`。

`GET /api/v1/expert-chats/{expertId}` 创建或读取当前用户与专家的唯一会话，返回 `ExpertChatSession`：`id`、`expert`、`status`、`messages[]`。`POST /api/v1/expert-chats/{expertId}/messages` 请求 `{ text }`，消息不能为空且不超过 2000 字。

会话和消息真实持久化到 `ExpertChatSession`、`ExpertChatMessage`。当前专家回复为 Mock/队列占位，页面必须明确“辅助复核，不替代现场检查和用药指导”；真实专家排班、实时推送、音视频和付费服务属于后续版本。

## Mock/Real 边界

| 能力 | 当前实现 | 必须真实持久化 |
| --- | --- | --- |
| 天气 | 默认 Provider，可替换真实天气服务 | 否，建议缓存而非先落库 |
| 商品和专家目录 | 配置 Provider | 目录接入运营后台后再落库 |
| 订单 | Real API + Prisma | 是，订单和明细 |
| 社区帖子 | Real API + Prisma | 是，帖子和作者 |
| 点赞 | Real API + 唯一约束 | 是，用户和帖子关系 |
| 专家会话消息 | Real API + Prisma | 是，会话和消息 |
| 专家自动回复 | Mock/队列占位 | 否，替换为专家服务后保留消息记录 |
| 支付、物流、分佣、举报、评论 | 暂不实现 | 不得在 UI 中暗示已完成 |

## 错误码

`SHOP_ORDER_INVALID`、`SHOP_PRODUCT_UNAVAILABLE`、`COMMUNITY_POST_INVALID`、`COMMUNITY_POST_NOT_FOUND`、`EXPERT_NOT_FOUND`、`CHAT_MESSAGE_INVALID`。
