// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router,
// } from '@angular/router';
// import { FirebaseService } from '../services/firebase.service';

// const adminMovieBay = 'lPphCLTxhWNsNEfSc4wNm6Ui0f33';

// @Injectable({
//   providedIn: 'root',
// })
// export class AdminGuard implements CanActivate {
//   constructor(private authService: FirebaseService, private router: Router) {}

//   canActivate(): boolean {
//     const userId = localStorage.getItem('userId');

//     if (userId === adminMovieBay) {
//       this.router.navigate(['/adminpage']);
//       return true;
//     } else {
//       this.router.navigate(['/movielist']);
//       return false;
//     }
//   }
// }
