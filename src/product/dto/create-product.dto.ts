import {
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsUUID()
  @IsString()
  id: string;

  @IsString()
  @Min(1)
  name: string;

  @IsString()
  @Min(1)
  tag: string;

  @IsString()
  @Min(1)
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  @Min(0)
  stock: number;

  @IsString()
  @Min(1)
  category: string;

  @IsString()
  @Min(1)
  ProductImage: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  @Min(1)
  slug: string;
}
