import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { TableDemoPageComponent } from './table-demo-page/table-demo-page.component';

const routes: Routes = [
    {
        path: 'demo',
        component: TableDemoPageComponent,
    },
    {
        path: 'getting-started',
        component: GettingStartedComponent,
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
