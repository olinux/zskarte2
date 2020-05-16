/*
 * Copyright © 2018-2020 ZSO Bern Plus / PCi Fribourg
 *
 * This file is part of Zivilschutzkarte 2.
 *
 * Zivilschutzkarte 2 is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * Zivilschutzkarte 2 is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along with
 * Zivilschutzkarte 2.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 */

import {Component, OnInit} from '@angular/core';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Sign} from '../entity/sign';
import {DrawStyle} from "../drawlayer/draw-style";
import {Signs} from "../signs/signs";
import {I18NService} from "../i18n.service";
import {CustomImagesComponent} from "../custom-images/custom-images.component";
import {CustomImageStoreService} from "../custom-image-store.service";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
    selector: 'app-drawing-dialog',
    templateUrl: './drawing-dialog.component.html',
    styleUrls: ['./drawing-dialog.component.css']
})
export class DrawingDialogComponent implements OnInit {

    filter: string = null;
    allSigns: Sign[] = null;
    filteredSigns: Sign[] = [];

    isCustomImage(sign: Sign) {
        return CustomImageStoreService.isCustomImage(sign.src);
    }

    loadSigns() {
        this.allSigns = Signs.SIGNS.concat(CustomImageStoreService.getAllSigns()).sort((a, b) => {
            let aValue = a[this.i18n.locale];
            let bValue = b[this.i18n.locale];
            aValue = aValue ? aValue.toLowerCase() : "";
            bValue = bValue ? bValue.toLowerCase() : "";
            return aValue.localeCompare(bValue);
        });
        this.updateAvailableSigns();
    }

    updateAvailableSigns() {
        this.filteredSigns = this.allSigns.filter(s => !this.filter || this.i18n.getLabelForSign(s).toLowerCase().includes(this.filter));
    }

    constructor(public dialogRef: MatDialogRef<DrawingDialogComponent>, public i18n: I18NService, public dialog: MatDialog, private customImage: CustomImageStoreService) {
    }

    getImageUrl(file: string) {
        if (file) {
            let customImageDataUrl = CustomImageStoreService.getImageDataUrl(file)
            if (customImageDataUrl) {
                return customImageDataUrl;
            }
            return DrawStyle.getImageUrl(file);
        }
        return null;
    }

    ngOnInit(): void {
        this.loadSigns();
    }

    select(sign: Sign) {
        //We need to pass a deep copy of the object
        this.dialogRef.close(JSON.parse(JSON.stringify(sign)));
    }

    editSymbol(sign: Sign) {
        let symbolEdit = this.dialog.open(CustomImagesComponent, {data: sign, disableClose: true});
        symbolEdit.afterClosed().subscribe(r => {
            if (r) {
                this.loadSigns();
            }
        });
    }

    addSymbol() {
        let symbolAdd = this.dialog.open(CustomImagesComponent, {disableClose: true});
        symbolAdd.afterClosed().subscribe(r => {
            if (r) {
                let label = this.i18n.getLabelForSign(r);
                if (label) {
                    this.filter = label;
                }
                this.loadSigns();

            }
        });
    }

    deleteSymbol(sign: Sign) {
        let confirm = this.dialog.open(ConfirmationDialogComponent, {
            data: this.i18n.get("deleteSymbolConfirm")
        });
        confirm.afterClosed().subscribe(r => {
            if (r) {
                this.customImage.deleteSign(sign.src).then(() => {
                    this.loadSigns();
                });
            }
        })

    }

}
