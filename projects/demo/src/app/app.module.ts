import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.module.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { TableDemoPageComponent } from './table-demo-page/table-demo-page.component';
import { NgxAdvancedMaterialTableModule } from 'ngx-advanced-material-table';

@NgModule({
    declarations: [AppComponent, TableDemoPageComponent],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule, NgxAdvancedMaterialTableModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
