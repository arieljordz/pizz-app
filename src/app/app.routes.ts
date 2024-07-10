import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'', loadComponent: ()=> import('./order/order.component').then(a=>a.OrderComponent)},
  {path:'orderdetails', loadComponent: ()=> import('./orderdetails/orderdetails.component').then(a=>a.OrderdetailsComponent)},
  {path:'pizza', loadComponent: ()=> import('./pizza/pizza.component').then(a=>a.PizzaComponent)},
  {path:'pizzatype', loadComponent: ()=> import('./pizzatype/pizzatype.component').then(a=>a.PizzatypeComponent)},
];
