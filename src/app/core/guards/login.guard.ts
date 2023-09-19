import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: FirebaseService, private router: Router) {}

  canActivate(): boolean {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
