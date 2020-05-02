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

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {SharedStateService} from '../shared-state.service';
import {Sign} from '../entity/sign';
import {DrawStyle} from "../drawlayer/draw-style";
import {Signs} from "../signs/signs";
import {I18NService} from "../i18n.service";

@Component({
    selector: 'app-drawing-dialog',
    templateUrl: './drawing-dialog.component.html',
    styleUrls: ['./drawing-dialog.component.css']
})
export class DrawingDialogComponent implements OnInit {

    displayedColumns: string[] = ['symbol', 'name'];
    dataSource = new MatTableDataSource(Signs.SIGNS.sort((a,b) => a[this.i18n.locale]> b[this.i18n.locale] ? 1 : (b[this.i18n.locale] > a[this.i18n.locale] ? -1 : 0)));

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(public dialogRef: MatDialogRef<DrawingDialogComponent>, public i18n:I18NService) {
    }

    getImageUrl(file: string) {
        return DrawStyle.getImageUrl(file);
    }

    ngOnInit(): void {
    }

    select(sign: Sign) {
        this.dialogRef.close(sign);
    }

}
