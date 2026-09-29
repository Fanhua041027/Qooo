import { IsIn, IsOptional, IsString } from 'class-validator';

export class ListDiagnosisDto {
  @IsOptional()
  @IsString()
  plotId?: string;

  @IsOptional()
  @IsIn(['created', 'uploading', 'analyzing', 'completed', 'need_more_images', 'need_expert_review', 'failed'])
  status?: string;
}
