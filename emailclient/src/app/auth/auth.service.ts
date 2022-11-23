import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  password: string;
  passwordConfirmation: string;
  username: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = 'https://api.angular-email.com';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(this.URL + '/auth/username', { username });
  }

  signup(credintials: SignupCredentials | any) {
    return this.http.post<SignupResponse>(this.URL + '/auth/signup', credintials)
  }
}
