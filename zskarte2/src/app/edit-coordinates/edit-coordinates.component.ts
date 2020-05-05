import {Component, Inject, OnInit} from '@angular/core';
import {I18NService} from "../i18n.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-coordinates',
  templateUrl: './edit-coordinates.component.html',
  styleUrls: ['./edit-coordinates.component.css']
})
export class EditCoordinatesComponent implements OnInit {

  coordinates:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,  public i18n: I18NService,  public dialogRef: MatDialogRef<EditCoordinatesComponent>) {
    this.coordinates = data;
  }

  ngOnInit(): void {
  }

  ok():void{
    this.dialogRef.close(this.coordinates);
  }

}
