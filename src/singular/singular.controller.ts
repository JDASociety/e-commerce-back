import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SingularService } from './singular.service';
import { CreateSingularDto } from './dto/create-singular.dto';
import { UpdateSingularDto } from './dto/update-singular.dto';

@Controller('singular')
export class SingularController {
  constructor(private readonly singularService: SingularService) {}

  @Post()
  create(@Body() createSingularDto: CreateSingularDto) {
    return this.singularService.create(createSingularDto);
  }

  @Get()
  findAll() {
    return this.singularService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.singularService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSingularDto: UpdateSingularDto,
  ) {
    return this.singularService.update(+id, updateSingularDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.singularService.remove(+id);
  }
}
