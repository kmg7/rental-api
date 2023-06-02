import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  register() {
    return {
      kind: 'Auth-Register',
      success: true,
    };
  }

  login() {
    return {
      kind: 'Auth-Login',
      success: true,
    };
  }
}
