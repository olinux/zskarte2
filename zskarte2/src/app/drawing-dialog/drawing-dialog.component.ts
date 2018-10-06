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

import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';

import {
    MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource
} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {SharedStateService} from '../shared-state.service';
import {Sign} from '../entity/sign';
import {DrawStyle} from "../drawlayer/draw-style";

export interface DrawingData {
    name: string;
}

@Component({
    selector: 'app-drawing-dialog',
    templateUrl: './drawing-dialog.component.html',
    styleUrls: ['./drawing-dialog.component.css']
})
export class DrawingDialogComponent implements OnInit {


    displayedColumns: string[] = ['symbol', 'name'];
    dataSource = null;

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    signs: Sign[] = [];
    signCtrl = new FormControl();
    filteredSigns: Observable<Sign[]>;

    constructor(public dialogRef: MatDialogRef<DrawingDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DrawingData, private sharedState: SharedStateService) {
    }

    getImageUrl(file:string){
        return DrawStyle.getImageUrl(file);
    }

    ngOnInit(): void {
        this.sharedState.signatures.subscribe(values => {
            this.dataSource = new MatTableDataSource(values)
        });
        this.filteredSigns = this.signCtrl.valueChanges.pipe(map(value => this._filterSigns(value)));
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    select(sign: Sign) {
        this.sharedState.selectSign(sign);
        this.dialogRef.close();
    }

    private _filterSigns(value: string): Sign[] {
        const filterValue = value.toLowerCase();
        return this.signs.filter(sign => filterValue === '' || sign.de.toLowerCase().indexOf(filterValue) > -1);
    }
}
