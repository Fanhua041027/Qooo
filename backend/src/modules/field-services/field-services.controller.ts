import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, CurrentUser } from '../../common/current-user.decorator';
import { CreateCommunityPostDto, CreateShopOrderDto, SendExpertMessageDto } from './dto/field-services.dto';
import { FieldServicesService } from './field-services.service';

@ApiTags('田间服务')
@ApiBearerAuth()
@Controller('v1')
export class FieldServicesController {
  constructor(private readonly services: FieldServicesService) {}

  @Get('weather/overview')
  @ApiOperation({ summary: '获取田间天气概览' })
  weather(@Query() query: WeatherQuery) {
    return this.services.getWeather(queryToWeatherInput(query));
  }

  @Get('weather/forecast')
  @ApiOperation({ summary: '获取未来 1 至 15 天天气预报' })
  forecast(@Query() query: WeatherQuery) {
    return this.services.getWeatherForecast(queryToWeatherInput(query));
  }

  @Get('weather/history')
  @ApiOperation({ summary: '获取最近两年内最多 31 天历史天气' })
  history(@Query() query: WeatherHistoryQuery) {
    return this.services.getWeatherHistory(queryToWeatherInput(query));
  }

  @Get('shop/products')
  @ApiOperation({ summary: '获取农资商品目录' })
  products(@Query('category') category?: string) {
    return this.services.listProducts(category);
  }

  @Post('shop/orders')
  @ApiOperation({ summary: '创建待支付农资订单' })
  createOrder(@CurrentUser() user: AuthUser, @Body() input: CreateShopOrderDto) {
    return this.services.createOrder(user.id, input);
  }

  @Get('community/posts')
  @ApiOperation({ summary: '获取农友社区帖子' })
  posts(@CurrentUser() user: AuthUser, @Query('topic') topic?: string) {
    return this.services.listPosts(user.id, topic);
  }

  @Post('community/posts')
  @ApiOperation({ summary: '发布社区帖子' })
  createPost(@CurrentUser() user: AuthUser, @Body() input: CreateCommunityPostDto) {
    return this.services.createPost(user.id, input);
  }

  @Post('community/posts/:postId/like')
  @ApiOperation({ summary: '切换帖子点赞状态' })
  likePost(@CurrentUser() user: AuthUser, @Param('postId') postId: string) {
    return this.services.likePost(user.id, postId);
  }

  @Get('experts')
  @ApiOperation({ summary: '获取专家目录' })
  experts() {
    return this.services.listExperts();
  }

  @Get('expert-chats/:expertId')
  @ApiOperation({ summary: '获取专家复核会话' })
  chat(@CurrentUser() user: AuthUser, @Param('expertId') expertId: string) {
    return this.services.getChat(user.id, expertId);
  }

  @Post('expert-chats/:expertId/messages')
  @ApiOperation({ summary: '发送专家复核消息' })
  message(@CurrentUser() user: AuthUser, @Param('expertId') expertId: string, @Body() input: SendExpertMessageDto) {
    return this.services.sendMessage(user.id, expertId, input);
  }
}

interface WeatherQuery { location?: string; latitude?: string; longitude?: string; days?: string; granularity?: 'daily' | 'hourly' }
interface WeatherHistoryQuery extends WeatherQuery { startDate?: string; endDate?: string }

function queryToWeatherInput(query: WeatherHistoryQuery) {
  const latitude = query.latitude === undefined ? undefined : Number(query.latitude);
  const longitude = query.longitude === undefined ? undefined : Number(query.longitude);
  const days = query.days === undefined ? undefined : Number(query.days);
  return {
    location: query.location,
    latitude: Number.isFinite(latitude) ? latitude : undefined,
    longitude: Number.isFinite(longitude) ? longitude : undefined,
    days: Number.isFinite(days) ? days : undefined,
    granularity: query.granularity,
    startDate: query.startDate,
    endDate: query.endDate,
  };
}
