import { Injectable } from '@angular/core';
import { CanLoad } from "@angular/router";
import { AuthService } from '../../core/auth-service/auth-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';

@Injectable()
export class AdminAuthGuardService implements CanLoad {

  constructor(private authService: AuthService,
    private router: Router) { }

  canLoad() {
  return this.authService.isAdmin();
  }
}

