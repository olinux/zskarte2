import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GeoadminService} from "../geoadmin.service";
import {I18NService} from "../i18n.service";

@Component({
  selector: 'app-map-legend-display',
  templateUrl: './map-legend-display.component.html',
  styleUrls: ['./map-legend-display.component.css']
})
export class MapLegendDisplayComponent implements OnInit {


  html:string = null;
  constructor(public dialogRef: MatDialogRef<MapLegendDisplayComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string, private geoAdmin:GeoadminService, public i18n:I18NService) {
    if(data) {
      geoAdmin.getLegend(data).subscribe(data=>{
       this.html = data;
      })
    }
    else{
      this.html = this.i18n.get('legendNotLoaded');
    }
  }

  ngOnInit(): void {
  }

}
