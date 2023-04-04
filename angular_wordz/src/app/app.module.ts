import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { TestComponent } from './test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatumPipe } from './pipe/datum.pipe';
import { WordListItemComponent } from './components/items/word-list-item/word-list-item.component';
import { SearchFilterPipe } from './pipe/search-filter.pipe';
import { ClickOutsideDirective } from './directive/clickOutside.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FilterStringListPipe } from './pipe/filter-string-list.pipe';
import { WordItemItemComponent } from './components/items/word-item-item/word-item-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateComponent,
    TestComponent,
    DatumPipe,
    WordListItemComponent,
    SearchFilterPipe,
    ClickOutsideDirective,
    DropdownComponent,
    FilterStringListPipe,
    WordItemItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
