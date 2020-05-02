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
import { MatDialog } from '@angular/material/dialog';
import {DrawingDialogComponent} from '../drawing-dialog/drawing-dialog.component';
import {SharedStateService} from "../shared-state.service";
import {TextDialogComponent} from "../text-dialog/text-dialog.component";
import {I18NService} from "../i18n.service";

export interface Filter {
    value: string;
    viewValue: string;
    color: string;
    textcolor: string;
}

@Component({
    selector: 'app-drawingtools',
    templateUrl: './drawingtools.component.html',
    styleUrls: ['./drawingtools.component.css']
})
export class DrawingtoolsComponent implements OnInit {

    text: string = null;

    constructor(public drawDialog: MatDialog, public textDialog: MatDialog, private sharedState: SharedStateService, public i18n:I18NService) {
    }

    ngOnInit() {
    }

    openDrawDialog(): void {
        const dialogRef = this.drawDialog.open(DrawingDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            this.sharedState.selectSign(result);
        });
    }

    openTextDialog(): void {
        const dialogRef = this.textDialog.open(TextDialogComponent, {
            maxWidth: '80vw',
            maxHeight: '70vh'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.text = result;
        });
    }

    polygon(): void {
            this.sharedState.selectSign({
                type: "Polygon",
                src: null
            });
    }

    line(): void {
        this.sharedState.selectSign({
            type: "LineString",
            src: null
        });
    }


    circle(): void {
        this.sharedState.selectSign({
            type: "Circle",
            src: null
        });
    }
}
