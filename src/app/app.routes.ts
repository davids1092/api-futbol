import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'home',loadComponent: () => import('../app/screens/home/home.component').then(m=>m.HomeComponent)
    },
    {
        path:'api',loadComponent: () => import('../app/screens/api/api.component').then(m=>m.ApiComponent)
    },
    {
        path:'',
        pathMatch:'full',
        redirectTo:'home'
    },
    {
        path:'**',
        pathMatch:'full',
        redirectTo:'home'
    }

];
