import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

const win: any = window;

@Injectable()
export class Database {
    public obj;

    constructor(){
        
    }

    init(){
        var self = this;

        return new Promise((resolve, reject) => {
            self.obj = win.sqlitePlugin.openDatabase({name: 'restaurant.db', location: 'default'});
            self.obj.sqlBatch([ 
                'CREATE TABLE IF NOT EXISTS restaurant (restaurant_name varchar(555))',
                'CREATE TABLE IF NOT EXISTS food_entry (restaurant_id INT, food_name VARHCAR(555), rating INT, picture TEXT, notes TEXT, date DATETIME)',
            ], function() {
                console.log('Populated database OK');
                this.open = true;
                resolve(true);
            }, function(error) {
                console.log('SQL batch ERROR: ' + error.message);
                reject(false);
            });
        });
    }

    doQuery(query, prpd){
        var self = this;

        return new Promise((resolve, reject) => {
            self.obj.transaction(function(tx) {
                tx.executeSql(query, prpd, function(tx, res) {
                    resolve(res);     
                }, function(tx, error) {
                    reject(error);    
                });
            });
        });
    }

}
