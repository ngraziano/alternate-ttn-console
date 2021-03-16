import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root',
})
export class IsConfigurateGard implements CanActivate {
  constructor(private config: AppConfigService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.config.get().pipe(
      map((c) => {
        const isConfigurate = !!c.ttnUserToken;
        if (!isConfigurate) {
          return this.router.createUrlTree(['/config']);
        }
        return isConfigurate;
      })
    );
  }
}
