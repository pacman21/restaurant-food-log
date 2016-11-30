import { Injectable, Inject } from '@angular/core';
import { Database } from '../../providers/Database/Database';
import 'rxjs/add/operator/map';


@Injectable()
export class FoodEntry {
    private db;
    public restaurant_id;
    public food_name;
    public rating;
    public picture;
    public notes;
    public date;
  
    constructor(@Inject(Database) database){
        this.db = database;
    }

    getAll(retaurant_id: number){
        let self = this;

        return new Promise((resolve, reject) => {
            self.db.doQuery("SELECT * FROM food_entry WHERE restaurant_id = ?", [retaurant_id]).then(function(data){
                resolve(data);
            });
        });
    }

}