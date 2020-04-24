/*
 * Copyright © 2018 ZSO Bern Plus
 *
 * This file is part of Zivilschutzkarte 2.
 *
 * Zivilschutzkarte 2 is free software: you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License as published by the 
 * Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * Zivilschutzkarte 2 is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS 
 * FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Zivilschutzkarte 2.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 */

import {Component, Input, OnInit} from '@angular/core';
import {DrawlayerComponent} from "../drawlayer/drawlayer.component";
import {DomSanitizer} from "@angular/platform-browser";
import {HistoryComponent} from "../history/history.component";
import { MatDialog } from "@angular/material/dialog";
import {ImportDialogComponent} from "../import-dialog/import-dialog.component";
import {I18NService} from "../i18n.service";
import {SharedStateService} from "../shared-state.service";


@Component({
    selector: 'app-tools',
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

    @Input() drawLayer: DrawlayerComponent;
    @Input() history: HistoryComponent;

    downloadData = null;
    downloadTime = null;

    constructor(private sanitizer: DomSanitizer, public dialog: MatDialog, public i18n:I18NService, private sharedState: SharedStateService) {
    }

    importData(): void {
        const dialogRef = this.dialog.open(ImportDialogComponent, {
            width: '600px',
            maxWidth: '600px',
            height: '90%',
            maxHeight: '400px'
        }, );
        dialogRef.afterClosed().subscribe(result => {
            this.drawLayer.loadFromString(result);
        });
    }

    getDownloadFileName(){
        return "zskarte_"+this.downloadTime.toISOString()+".geojson";
    }

    clear(): void {
        this.drawLayer.removeAll();
    }

    ngOnInit() {
        this.downloadTime = new Date();
    }

    download(withHistory: boolean): void {
        this.downloadData = this.sanitizer.bypassSecurityTrustUrl(this.drawLayer.toDataUrl(false, withHistory));
    }

}
