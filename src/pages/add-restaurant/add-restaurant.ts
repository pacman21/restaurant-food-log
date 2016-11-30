import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../../providers/Database/Database';
import { Restaurants } from '../../providers/Resataurants/Restaurants';
import { HomePage } from '../../pages/home/home';
import { Toast } from 'ionic-native';

@Component({
  selector: 'page-add-restaurant',
  templateUrl: 'add-restaurant.html',
  providers: [Database, Restaurants]
})
export class AddRestaurant {
  public db: Database;
  public restaurantName = "";

  constructor(public navCtrl: NavController, public database: Database, private navParams: NavParams) {
    let self = this;
    this.db = navParams.get('database');       
  }

  addRestaurant(){
    let self = this;
    let restaurant = new Restaurants(this.db);

    restaurant.create(this.restaurantName).then(function(data){
      console.log("Test -- " + data);
      self.navCtrl.push(HomePage, {
        database: self.db
      });
    });
  }
}
