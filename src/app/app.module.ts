import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ListEntriesPage } from '../pages/list_entries/list_entries';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddRestaurant } from '../pages/add-restaurant/add-restaurant';
import { SQLite } from 'ionic-native';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ListEntriesPage,
    HomePage,
    AddRestaurant,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ListEntriesPage,
    HomePage,
    AddRestaurant,
    TabsPage
  ],
  providers: [SQLite]
})
export class AppModule {}
