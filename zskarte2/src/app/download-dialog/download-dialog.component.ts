import {Component, Inject, Input, OnInit} from '@angular/core';
import {DrawingDialogComponent} from "../drawing-dialog/drawing-dialog.component";
import {SharedStateService} from "../shared-state.service";
import {Sign} from "../entity/sign";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DrawlayerComponent} from "../drawlayer/drawlayer.component";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.css']
})
export class DownloadDialogComponent implements OnInit {

  downloadData = null;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<DownloadDialogComponent>, private sharedState: SharedStateService) {
  }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
  download(): void{
      this.downloadData = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(this.data));
  }
}
