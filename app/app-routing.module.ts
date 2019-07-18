import {NgModule} from '@angular/core';
import {NativeScriptRouterModule} from 'nativescript-angular/router';
import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {TabsComponent} from "~/home_page/inspection-operation/tabs/tabs.component";
import {InspectionOperationComponent} from "~/home_page/inspection-operation/inspection-operation.component";

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'inspectionOperation', component: InspectionOperationComponent},
    {path: 'tabs', component: TabsComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
