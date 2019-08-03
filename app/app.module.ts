import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {TabsComponent} from './home_page/inspection-operation/tabs/tabs.component';
import {InspectionOperationComponent} from './home_page/inspection-operation/inspection-operation.component';
import {SettingComponent} from './home_page/setting/setting.component';
import {InformationComponent} from './home_page/inspection-operation/tabs/information/information.component';
import {ItemsComponent} from './home_page/inspection-operation/tabs/items/items.component';
import {InstanceComponent} from './home_page/inspection-operation/tabs/instance/instance.component';
import {CheckListComponent} from './home_page/inspection-operation/tabs/check-list/check-list.component';
import {StandardsComponent} from './home_page/inspection-operation/tabs/standards/standards.component';
import {EquipmentsComponent} from './home_page/inspection-operation/tabs/equipments/equipments.component';
import {DropDownModule} from "nativescript-drop-down/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NativeScriptFormsModule} from "nativescript-angular";

import {TNSCheckBoxModule} from "nativescript-checkbox/angular";




@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TabsComponent,
        InspectionOperationComponent,
        SettingComponent,
        InformationComponent,
        ItemsComponent,
        InstanceComponent,
        CheckListComponent,
        StandardsComponent,
        EquipmentsComponent,
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        DropDownModule,
        FormsModule,
        ReactiveFormsModule,
        NativeScriptFormsModule,
        TNSCheckBoxModule



    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
}

