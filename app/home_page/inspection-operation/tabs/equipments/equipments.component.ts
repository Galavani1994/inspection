import { Component, OnInit } from '@angular/core';
import data from "~/product_file/666.json";
@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css'],
  moduleId: module.id,
})
export class EquipmentsComponent implements OnInit {

  equipment=[];
  constructor() { }

  ngOnInit() {
    this.equipment=data.inspectionEquipments;
  }

}
