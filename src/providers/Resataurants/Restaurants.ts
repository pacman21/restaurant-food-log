import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Database } from '../../providers/Database/Database';
import 'rxjs/add/operator/map';

@Injectable()
export class Restaurants {
    public name;
    public id;
    private db;

    constructor(@Inject(Database) database){
        this.db = database;
    }

    /**
     * Set the id and restaurant name given a restaurant id
     */
    get(id){
        let self = this;

         return new Promise((resolve, reject) => {
              this.db.doQuery("SELECT rowid, restaurant_name FROM restaurant WHERE rowid = ?", [id]).then(function(data: any){
                if(data.rows.length > 0){
                    for(let i: number = 0; i < data.rows.length; i++){
                        self.id = data.rows.item(i).rowid;
                        self.name = data.rows.item(i).restaurant_name;
                        resolve(true);
                    }
                } else {
                     resolve(false);
                }
            });
         });
    }

    /**
     * Return an array Restaurants of all of the restaurants in the database. 
     */
    getAll(){
        var restaurantList = new Array();
        let self = this;

        return new Promise((resolve, reject) => {
            self.db.doQuery("SELECT rowid, restaurant_name FROM restaurant", []).then(function(data: any){
                if(data.rows.length > 0){
                    for(let i: number = 0; i < data.rows.length; i++){
                        let restaurant = new Restaurants(self.db);
                        restaurant.id = data.rows.item(i).rowid;
                        restaurant.name =  data.rows.item(i).restaurant_name;
                        restaurantList.push(restaurant); 
                        resolve(restaurantList);
                    }
                } else {
                    resolve([]);
                }
            });
        });
    }

    /**
     * Create a new restaurant record into the database
     */
    create(restaurant_name){
        let self = this;
        console.log("restaurant-1");
        return new Promise((resolve, reject) => {
            self.db.doQuery("INSERT INTO restaurant (restaurant_name) VALUES (?)", [restaurant_name]).then(function(data: any){
                console.log("Test 2 -- " + data);
                console.log(data);
                resolve(data);
            });
        });
    }

}
