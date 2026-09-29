import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class MockLoginDto {
  @ApiProperty({ example: 'user_p0_farmer_001' })
  @IsString()
  @IsIn(['user_p0_farmer_001', 'user_p0_farmer_low_001', 'ops_p0_001', 'ops_expert_p0_001', 'ops_admin_p0_001'])
  accountId: string;
}
