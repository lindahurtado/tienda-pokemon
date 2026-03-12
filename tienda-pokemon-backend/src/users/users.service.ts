import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface User {
  email: string;
  [key: string]: any;
}

@Injectable()
export class UsersService {
  private readonly filePath = path.resolve(__dirname, '../../users.json');

  //Método para leer los usuarios
  private getUsers(): User[] {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data) as User[];
  }

  //Método para guardar los usuarios
  create(user: User) {
    const users = this.getUsers();
    users.push(user);
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
    return { message: 'Usuario registrado con éxito' };
  }

  //Método para búscar usuario para el login
  findOne(email: string): User | undefined {
    const users = this.getUsers();
    return users.find((u) => u.email === email);
  }
}
