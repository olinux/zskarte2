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

import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {DrawingDialogComponent} from "../drawing-dialog/drawing-dialog.component";
import {SharedStateService} from "../shared-state.service";
import {Sign} from "../entity/sign";

@Component({
    selector: 'app-text-dialog',
    templateUrl: './text-dialog.component.html',
    styleUrls: ['./text-dialog.component.css']
})
export class TextDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DrawingDialogComponent>, private sharedState: SharedStateService) {
    }

    text: string = null;

    ngOnInit() {
    }


    cancel(): void {
        this.dialogRef.close(null);
    }

    submit(): void{
        const textSign:Sign = {
            type: 'Point',
            text: this.text,
            kat: null,
            de: null,
            src: null,
            style: null,
            example: null, fillOpacity: null, color: null
        };
        this.sharedState.selectSign(textSign);
        this.dialogRef.close(this.text);
    }
}
