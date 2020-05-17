import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {I18NService} from "../i18n.service";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public initialLoad: boolean, public i18n:I18NService) {

  }

  ngOnInit(): void {
  }

}
