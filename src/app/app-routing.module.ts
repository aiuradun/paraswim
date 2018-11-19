import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragComponent } from './components/drag/drag.component';
import { ItemsComponent } from './components/items/items.component';
import { AddItemComponent } from './components/add-item/add-item.component';
const routes: Routes = [
  { path: 'items', component: ItemsComponent},
  { path: 'drag', component: DragComponent},
  { path: 'add-item', component: AddItemComponent},
  { path: '',
    redirectTo: '/items',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'error/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


