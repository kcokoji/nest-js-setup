import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Carol Williams',
      email: 'carol.williams@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'ENGINEER',
    },
    { id: 5, name: 'Eve Davis', email: 'eve.davis@example.com', role: 'ADMIN' },
    {
      id: 6,
      name: 'Frank Miller',
      email: 'frank.miller@example.com',
      role: 'INTERN',
    },
    {
      id: 7,
      name: 'Grace Wilson',
      email: 'grace.wilson@example.com',
      role: 'ENGINEER',
    },
    {
      id: 8,
      name: 'Hank Moore',
      email: 'hank.moore@example.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException('User Role Not Found');
      }
      return rolesArray;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id == id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }
  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
