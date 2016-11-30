import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../../providers/Database/Database';
import { ListEntriesPage } from '../../pages/list_entries/list_entries';
import { AddRestaurant } from '../../pages/add-restaurant/add-restaurant';
import { Restaurants } from '../../providers/Resataurants/Restaurants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Database, Restaurants]
})
export class HomePage {
  public database;
  public restaurant: Restaurants;
  public restaurantList;

  constructor(public navCtrl: NavController, db: Database, private ngZone: NgZone, private navParams: NavParams) {
    this.database = db; 
  }
 
  ionViewDidEnter() {
    let self = this;
    this.restaurant = new Restaurants(this.database);

    this.database.init().then(function(){
      self.refreshList(); 
    });
  }

  refreshList(){
    var self = this;

    this.restaurant.getAll().then(function(data: any){
      self.restaurantList = data;
    });
  }

  openPage(restaurant: any){
    this.navCtrl.push(ListEntriesPage, {
       restaurant: restaurant,
       database: this.database
    });
  }

  addRestaurant(){
    this.navCtrl.push(AddRestaurant, {
       database: this.database
    });
  }
}