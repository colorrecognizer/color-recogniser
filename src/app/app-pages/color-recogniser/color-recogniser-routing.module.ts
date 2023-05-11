import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorRecogniserComponent } from './color-recogniser.component';

const routes: Routes = [{ path: '', component: ColorRecogniserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorRecogniserRoutingModule { }
