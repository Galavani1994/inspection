import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import data from "~/product_file/666.json";
import {ItemsService} from "~/services/items/items.service";
import {DropDown} from "nativescript-drop-down";
import {CheckListItem} from "~/model/checkListItem";
import {CheckListService} from "~/services/checkList/checkList.service";

@Component({
    selector: 'app-check-list',
    templateUrl: './check-list.component.html',
    styleUrls: ['./check-list.component.css'],
    moduleId: module.id,
})
export class CheckListComponent implements OnInit {
    @ViewChild("CB1") FirstCheckBox: ElementRef;
    productTitles = [];
    inspectionItem = [];
    indexItem: number;

    checkLists = [];
    checkListTitle = [];
    indexCheckList: number;

    itemId:number;


    checkListItemVaue={itemTitle:'',identifyCharId:null,checkListTitle:'',checkListId:null,points:null};

    show = false;
    proTitle = '';
    proId = '';
    productId = '';
    public resultItemChsrschter: Array<any>;
    public resultCheckList: Array<any>;
    public itemCharacter = [];
    allow = false;

    constructor(public itemService: ItemsService,public checkListService:CheckListService) {
        this.itemService;
        this.checkListService;
    }

    ngOnInit() {
        this.inspectionItem = data.inspectionOperationItems;
        for (let item of this.inspectionItem) {
            this.productTitles.push(item.productTitle);
        }
        this.checkLists = data.inspectionCheckLists;
        for (let ch of this.checkLists) {
            this.checkListTitle.push(ch.checkListTitle);
        }

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
        return rows;
    }
    /*
    genCheckListRows(item) {
        let rows = "*";
        item.forEach((el) => {
            rows += ",*";
        })
        return rows
    }*/

    public checkedTbl(args){
        this.checkListItemVaue.identifyCharId=args;
    }
    public checkListSave(el){
        this.checkListService.excute2("insert into checkListTbl(checkList) VALUES (?) ",[JSON.stringify(this.checkListItemVaue)]).then(id => {
            alert('ثبت شد');
            console.log("INSERT RESULT", id);
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }
    public deleteTable(){
        this.checkListService.excute("DROP TABLE checkListTbl").then(de => {
            alert("جدول مورد نظر حذف شد");
        }, error => {
            console.log('errore is...', error);
        });
    }
    public createTable(){
        this.checkListService;
    }
    public fetch() {
        this.itemService.All("SELECT * FROM itemTbl e where e.productId=" + this.proId).then(rows => {
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

    public fetchChecklist(){
       /* this.checkListService.All("SELECT * FROM checkListTbl").then(rows => {
            this.resultCheckList = [];
            for (var row in rows) {
                this.resultCheckList.push({
                        id: rows[row][0],
                        values: JSON.parse(rows[row][1])
                    }
                );
            }
            console.log( this.resultCheckList);

        }, error => {
            console.log("SELECT ERROR", error);
        });*/

    }
    public selectedIndexChanged(args) {
        let picker = <DropDown>args.object;
        let itemName = picker.items[picker.selectedIndex];
        this.checkListItemVaue.itemTitle=itemName;
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

    public selectedIndexChangedCheckList(args) {
        let picker = <DropDown>args.object;
        let checkListName = picker.items[picker.selectedIndex];
        this.checkListItemVaue.checkListTitle=checkListName;

    }


}
