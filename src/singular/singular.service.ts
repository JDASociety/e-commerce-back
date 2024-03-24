import { Injectable } from '@nestjs/common';
import { CreateSingularDto } from './dto/create-singular.dto';
import { UpdateSingularDto } from './dto/update-singular.dto';

@Injectable()
export class SingularService {
  create(createSingularDto: CreateSingularDto) {
    return 'This action adds a new singular';
  }

  findAll() {
    return `This action returns all singular`;
  }

  findOne(id: number) {
    return `This action returns a #${id} singular`;
  }

  update(id: number, updateSingularDto: UpdateSingularDto) {
    return `This action updates a #${id} singular`;
  }

  remove(id: number) {
    return `This action removes a #${id} singular`;
  }
}
