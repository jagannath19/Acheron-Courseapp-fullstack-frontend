import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard,KeycloakService } from 'keycloak-angular';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn:'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  constructor(
    protected override router:Router,
    protected keycloakService:KeycloakService,
    private authService:AuthService
  ){
    super(router,keycloakService);
  }

  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
    const user =this.authService.getLoggedUser();
    console.log(user);

    //Force the user to log in if currently unauthenticated
    if(!this.authenticated){
      await this.keycloakService.login({
        redirectUri:window.location.origin+state.url,
      });
    }

    //Get the roles required from the route
    const requiredRoles=route.data['roles'];

    //Allow the user to proceed if no additional roles are required to access the route
    if(!(requiredRoles instanceof Array) || requiredRoles.length==0){
      return true;
    }

    //Allow the user to proceed if all the required roles are present
    return requiredRoles.some((role)=>this.roles.includes(role));
  }
  
  
}
