import {Component, DoCheck, OnInit} from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import data from "~/product_file/jsonFile.json";
import {error} from "tns-core-modules/trace";
import {GridLayout} from "tns-core-modules/ui/layouts/grid-layout";
import {Button} from "tns-core-modules/ui/button";
import {ListPicker} from "tns-core-modules/ui/list-picker";
import {DropDown} from "nativescript-drop-down";

var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "app-items",
    templateUrl: "./items.component.html",
    styleUrls: ["./items.component.css"],
    moduleId: module.id
})
export class ItemsComponent implements OnInit {
    private database: any;
    public resultItemChsrschter: Array<any>;

    id: number = 0;
    inspectionItem = [];
    productTitles = ['...'];
    identifyCharacters = [];
    public itemCharacter = [];
    public selectedIndex = 0;
    public index: number;
    allow = false;
    show = false;
    proTitle = '';
    proId = '';
    productId = '';
    public mainId: number;
    columns: string = "auto,auto,auto,auto";

    public constructor() {
        //سthis.deleteTable();
        this.create_database();
    }

    genCols(item) {
        let columns = "*,*";
        item.forEach((el) => {
            columns += ",*";
        })
        return columns
    }

    genRows(item) {
        let rows = "*";
        item.forEach((el) => {
            rows += ",*";
        })
        return rows
    }

    public create_database() {

        (new Sqlite("my.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS itemTbl (id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " productCharacter TEXT, productName TEXT, productId TEXT)").then(id => {
                alert('جدول ایجاد شد');
                this.database = db;
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    public insert() {
        this.database.execSQL("INSERT INTO itemTbl (productCharacter,productName,productId) VALUES (?,?,?)", [JSON.stringify(this.itemCharacter), this.proTitle, this.proId]).then(id => {
            alert('ثبت شد');
            console.log("INSERT RESULT", id);
        }, error => {
            console.log("INSERT ERROR", error);
        });
        this.fetch();
    }

    public fetch() {
        this.database.all("SELECT * FROM itemTbl e where e.productId=" + this.proId).then(rows => {
            this.resultItemChsrschter = [];
            for (var row in rows) {
                this.resultItemChsrschter.push({
                        id: rows[row][0],
                        values: JSON.parse(rows[row][1])
                    }

                );

            }
        }, error => {
            console.log("SELECT ERROR", error);
        });

        this.show = true;

    }

    ngOnInit() {
        this.inspectionItem = data.inspectionOperationItems;
        for (let item of this.inspectionItem) {
            this.productTitles.push(item.productTitle);
        }
    }

    public selectedIndexChanged(args) {
        let picker = <DropDown>args.object;
        let itemName = picker.items[picker.selectedIndex];
        if (itemName != 0) {
            this.itemCharacter = [];
            let titleIndex = this.inspectionItem.findIndex(obj => obj.productTitle == itemName);
            for (let it of this.inspectionItem[titleIndex].identifyCharacters) {
                this.proId = it.productId;
                this.proTitle = it.productTitle;
                this.itemCharacter.push(
                    {title: it.title, value: "", productName: it.productTitle, productId: it.productId}
                );
            }
            this.allow = true;
            this.fetch();
        } else {
            this.allow = false;
        }


    }

    public deleteTable() {
        this.database.execSQL("DROP TABLE itemTbl").then(de => {
            alert("جدول مورد نظر حذف شد");
        }, error => {
            console.log('errore is...', error);
        });
    }

    delete(id) {
        this.database.execSQL("DELETE FROM  itemTbl WHERE id="+id).then(de => {
            alert("deleted succesfully....");
        }, error => {
            console.log('errore is...', error);
        });
       this.fetch();
    }

    edit(id) {
        alert(id);
        // this.database.execSQL("DELETE FROM  itemTbl WHERE id="+id).then(de => {
        //     alert("deleted succesfully....");
        // }, error => {
        //     console.log('errore is...', error);
        // });
    }

}
