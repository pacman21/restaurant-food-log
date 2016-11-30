import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../../providers/Database/Database';
import { FoodEntry } from '../../providers/FoodEntry/FoodEntry';

@Component({
  selector: 'list-entries',
  templateUrl: 'list_entries.html',
  providers: [Database, FoodEntry]
})
export class ListEntriesPage {
  public restaurant;
  public entryList: Array<FoodEntry>;
  public db;
  public entry: FoodEntry;

  constructor(public navCtrl: NavController, private database: Database, private navParams: NavParams) {
    this.db = database;
    this.restaurant = navParams.get('restaurant'); 
    let self = this;
    self.entry = new FoodEntry(this.db);

    this.db.init().then(function(){
      self.entry.getAll(self.restaurant.id).then(function(data){
        console.log(data);
      });
    });
  }

  addFoodEntry(){
    console.log("hello");
  }

}