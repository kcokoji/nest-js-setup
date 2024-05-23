import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class RoleValidationPipe implements PipeTransform {
  readonly allowedRoles = Object.values(Role);

  transform(value: any) {
    if (!value) {
      return undefined; // No role provided, return undefined
    }

    if (!this.allowedRoles.includes(value)) {
      throw new BadRequestException(`"${value}" is an invalid role`);
    }

    return value;
  }
}
