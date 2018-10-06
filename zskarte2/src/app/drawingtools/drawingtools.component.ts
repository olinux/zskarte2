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
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DrawingData, DrawingDialogComponent} from '../drawing-dialog/drawing-dialog.component';
import {SharedStateService} from "../shared-state.service";
import {HttpClient} from "@angular/common/http";
import {Sign} from "../entity/sign";

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

    draw: DrawingData = null;
    sourceUrl = './assets/img/signs/signaturen.json';

    constructor(public dialog: MatDialog, private sharedState: SharedStateService, private http: HttpClient) {
    }

    ngOnInit() {
        this.http.get(this.sourceUrl).subscribe(data => {
            this.sharedState.setSignatures(<Sign[]>data);
        });
    }

    openDrawDialog(): void {
        const dialogRef = this.dialog.open(DrawingDialogComponent, {
            width: '600px',
            maxWidth: '600px',
            height: '90%',
            maxHeight: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.draw = result;
        });
    }

}
