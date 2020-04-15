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
import {NgForage} from "ngforage";
import {Md5} from "ts-md5";

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
    dataSource = new MatTableDataSource(Signs.SIGNS);

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(public dialogRef: MatDialogRef<DrawingDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DrawingData, private sharedState: SharedStateService, private readonly ngf: NgForage) {
    }

    getImageUrl(file: string) {
        return DrawStyle.getImageUrl(file);
    }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    select(sign: Sign) {
        this.sharedState.selectSign(sign);
        this.dialogRef.close();
    }
    //
    // freeForm() {
    //     if(this.freeFormSign.dataUrl!==null){
    //         let img = document.getElementById("imagePreview") as HTMLImageElement;
    //         this.freeFormSign.dataUrl.nativeHeight=img.naturalHeight;
    //         this.freeFormSign.dataUrl.nativeWidth=img.naturalWidth;
    //         this.freeFormSign.dataUrl.md5 = new Md5().appendStr(this.freeFormSign.dataUrl.src).end().toString();
    //         this.ngf.setItem(this.freeFormSign.dataUrl.md5, this.freeFormSign.dataUrl).then(x => {
    //             this.sharedState.selectSign(this.freeFormSign);
    //             this.dialogRef.close();
    //         });
    //     }
    //     else{
    //         this.sharedState.selectSign(this.freeFormSign);
    //         this.dialogRef.close();
    //     }
    //
    //
    // }
    //
    // drop(ev) {
    //     ev.preventDefault();
    //     let file = null;
    //     if (ev.dataTransfer.items) {
    //         // Use DataTransferItemList interface to access the file(s)
    //         for (let i = 0; i < ev.dataTransfer.items.length; i++) {
    //             // If dropped items aren't files, reject them
    //             if (ev.dataTransfer.items[i].kind === 'file') {
    //                 file = ev.dataTransfer.items[i].getAsFile();
    //                 break;
    //             }
    //         }
    //     } else {
    //         // Use DataTransfer interface to access the file(s)
    //         for (let i = 0; i < ev.dataTransfer.files.length; i++) {
    //             file = ev.dataTransfer.files[i];
    //             break;
    //         }
    //     }
    //     if (file != null) {
    //         if(file.size>1000000){
    //             window.alert("Diese Datei ist leider zu gross - bitte reduziere das Bild (<1MB)");
    //         }
    //         else {
    //             let reader = new FileReader();
    //             reader.onload = e => {
    //                 this.freeFormSign.dataUrl = {nativeHeight: null, nativeWidth: null, md5:null, src:  e.target.result};
    //             };
    //             reader.readAsDataURL(file);
    //         }
    //     }
    // }
    //
    // setDataUrl(dataUrl){
    //     this.freeFormSign.dataUrl = dataUrl;
    // }
    //
    // allowDrop(ev) {
    //     ev.preventDefault();
    // }


}
