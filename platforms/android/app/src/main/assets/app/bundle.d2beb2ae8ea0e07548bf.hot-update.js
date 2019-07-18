webpackHotUpdate("bundle",{

/***/ "./home_page/inspection-operation/tabs/items/items.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemsComponent", function() { return ItemsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./product_file/jsonFile.json");
var _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t("./product_file/jsonFile.json", 1);


var Sqlite = __webpack_require__("../node_modules/nativescript-sqlite/sqlite.js");
var ItemsComponent = /** @class */ (function () {
    function ItemsComponent() {
        this.id = 0;
        this.inspectionItem = [];
        this.productTitles = ['...'];
        this.identifyCharacters = [];
        this.itemCharacter = [];
        this.selectedIndex = 0;
        this.allow = false;
        this.show = false;
        this.proTitle = '';
        this.proId = '';
        this.productId = '';
        this.columns = "auto,auto,auto,auto";
        //سthis.deleteTable();
        this.create_database();
    }
    ItemsComponent.prototype.genCols = function (item) {
        var columns = "*,*";
        item.forEach(function (el) {
            columns += ",*";
        });
        return columns;
    };
    ItemsComponent.prototype.genRows = function (item) {
        var rows = "*";
        item.forEach(function (el) {
            rows += ",*";
        });
        return rows;
    };
    ItemsComponent.prototype.create_database = function () {
        var _this = this;
        (new Sqlite("my.db")).then(function (db) {
            db.execSQL("CREATE TABLE IF NOT EXISTS itemTbl (id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " productCharacter TEXT, productName TEXT, productId TEXT)").then(function (id) {
                alert('جدول ایجاد شد');
                _this.database = db;
            }, function (error) {
                console.log("CREATE TABLE ERROR", error);
            });
        }, function (error) {
            console.log("OPEN DB ERROR", error);
        });
    };
    ItemsComponent.prototype.clearData = function () {
        for (var _i = 0, _a = this.itemCharacter; _i < _a.length; _i++) {
            var i = _a[_i];
            i.value = '';
        }
    };
    ItemsComponent.prototype.insert = function () {
        this.database.execSQL("INSERT INTO itemTbl (productCharacter,productName,productId) VALUES (?,?,?)", [JSON.stringify(this.itemCharacter), this.proTitle, this.proId]).then(function (id) {
            alert('ثبت شد');
            console.log("INSERT RESULT", id);
        }, function (error) {
            console.log("INSERT ERROR", error);
        });
        this.fetch();
        this.clearData();
        console.log(this.itemCharacter);
    };
    ItemsComponent.prototype.fetch = function () {
        var _this = this;
        this.database.all("SELECT * FROM itemTbl e where e.productId=" + this.proId).then(function (rows) {
            _this.resultItemChsrschter = [];
            for (var row in rows) {
                _this.resultItemChsrschter.push({
                    id: rows[row][0],
                    values: JSON.parse(rows[row][1])
                });
            }
        }, function (error) {
            console.log("SELECT ERROR", error);
        });
        this.show = true;
    };
    ItemsComponent.prototype.ngOnInit = function () {
        this.inspectionItem = _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__.inspectionOperationItems;
        for (var _i = 0, _a = this.inspectionItem; _i < _a.length; _i++) {
            var item = _a[_i];
            this.productTitles.push(item.productTitle);
        }
    };
    ItemsComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        var itemName = picker.items[picker.selectedIndex];
        if (itemName != 0) {
            this.itemCharacter = [];
            var titleIndex = this.inspectionItem.findIndex(function (obj) { return obj.productTitle == itemName; });
            for (var _i = 0, _a = this.inspectionItem[titleIndex].identifyCharacters; _i < _a.length; _i++) {
                var it = _a[_i];
                this.proId = it.productId;
                this.proTitle = it.productTitle;
                this.itemCharacter.push({ title: it.title, value: "", productName: it.productTitle, productId: it.productId });
            }
            this.allow = true;
            this.fetch();
        }
        else {
            this.allow = false;
        }
    };
    ItemsComponent.prototype.deleteTable = function () {
        this.database.execSQL("DROP TABLE itemTbl").then(function (de) {
            alert("جدول مورد نظر حذف شد");
        }, function (error) {
            console.log('errore is...', error);
        });
    };
    ItemsComponent.prototype.delete = function (id) {
        this.database.execSQL("DELETE FROM  itemTbl WHERE id=" + id).then(function (de) {
            alert("deleted succesfully....");
        }, function (error) {
            console.log('errore is...', error);
        });
        this.fetch();
    };
    ItemsComponent.prototype.edit = function (id) {
        alert(id);
        this.database.all("select * FROM  itemTbl WHERE id=" + id).then(function (de) {
            console.log('selected data is...', de[0][1]);
        }, function (error) {
            console.log('errore is...', error);
        });
        // this.database.execSQL("DELETE FROM  itemTbl WHERE id="+id).then(de => {
        //     alert("deleted succesfully....");
        // }, error => {
        //     console.log('errore is...', error);
        // });
    };
    ItemsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-items",
            template: __webpack_require__("./home_page/inspection-operation/tabs/items/items.component.html"),
            styles: [__webpack_require__("./home_page/inspection-operation/tabs/items/items.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ItemsComponent);
    return ItemsComponent;
}());



/***/ })

})