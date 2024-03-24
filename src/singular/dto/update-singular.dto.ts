import { PartialType } from '@nestjs/swagger';
import { CreateSingularDto } from './create-singular.dto';

export class UpdateSingularDto extends PartialType(CreateSingularDto) {}
