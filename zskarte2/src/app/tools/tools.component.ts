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
import {MatDialog} from "@angular/material/dialog";
import {ImportDialogComponent} from "../import-dialog/import-dialog.component";
import {I18NService} from "../i18n.service";
import {SharedStateService} from "../shared-state.service";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {TagStateComponent} from "../tag-state/tag-state.component";
import {MapStoreService} from "../map-store.service";


@Component({
    selector: 'app-tools',
    templateUrl: './tools.component.html',
    styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

    @Input() drawLayer: DrawlayerComponent;
    downloadData = null;
    downloadTime = null;

    constructor(private sanitizer: DomSanitizer, public dialog: MatDialog, public i18n: I18NService, private sharedState: SharedStateService, private mapStore: MapStoreService) {
    }

    importData(): void {
        const dialogRef = this.dialog.open(ImportDialogComponent, {
            maxWidth: '80vw',
            maxHeight: '80vh'
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result && result.value) {
                this.dialog.open(ConfirmationDialogComponent, {
                    data: result.replace ?  this.i18n.get('confirmImportDrawing') : this.i18n.get("confirmImportDrawingNoReplace")
                }).afterClosed().subscribe(confirmed => {
                    if (confirmed) {
                        this.drawLayer.loadFromString(result.value, true, result.replace);
                    }
                })
            }
        });
    }

    getDownloadFileName() {
        return "zskarte_" + this.downloadTime.toISOString() + ".geojson";
    }

    clear(): void {
        this.dialog.open(ConfirmationDialogComponent, {
            data: this.i18n.get('confirmClearDrawing')
        }).afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.drawLayer.removeAll();
            }
        })
    }

    ngOnInit() {
        this.downloadTime = new Date();
    }

    download(): void {
        this.downloadData = this.sanitizer.bypassSecurityTrustUrl(this.drawLayer.toDataUrl());
    }

    tagState(): void{
        const dialogRef = this.dialog.open(TagStateComponent);
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.mapStore.setTag(result).then(()=>{});
            }
        });
    }
}
