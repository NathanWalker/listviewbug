import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { ListComponent } from "./list-component/list.component";

const routes: Routes = [
    { path: "", redirectTo: "/list", pathMatch: "full" },
    { path: "list", component: ListComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
