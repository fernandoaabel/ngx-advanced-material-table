import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableDemoPageComponent } from './table-demo-page/table-demo-page.component';

const routes: Routes = [
    {
        path: 'demo',
        component: TableDemoPageComponent,
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/demo',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
