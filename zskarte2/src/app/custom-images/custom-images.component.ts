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

import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {I18NService} from "../i18n.service";
import {Sign} from "../entity/sign";
import {CustomImageStoreService} from "../custom-image-store.service";
import {SharedStateService} from "../shared-state.service";
import {Md5} from "ts-md5";

@Component({
    selector: 'app-custom-images',
    templateUrl: './custom-images.component.html',
    styleUrls: ['./custom-images.component.css']
})
export class CustomImagesComponent implements OnInit {

    sign: Sign;
    shareWithOthers: boolean;
    image;
    processedImage;
    originalImage;
    loading = false;
    keepOriginal = false;


    @ViewChild('importSymbol', {static: false}) el: ElementRef;
    @ViewChild('imageLoader', {static: false}) imgEl: ElementRef
    @ViewChild('imageProcessor', {static: false}) imgProcessorEl: ElementRef

    constructor(@Inject(MAT_DIALOG_DATA) public data: Sign, public dialogRef: MatDialogRef<CustomImagesComponent>, public i18n: I18NService, private customImage: CustomImageStoreService, private sharedState: SharedStateService) {
        this.load(data);
    }

    private load(sign: Sign) {
        this.sign = sign ? sign : {type: "Point", src: null}
        this.shareWithOthers = !this.sign.onlyForSessionId;
        this.originalImage = this.sign.src ? CustomImageStoreService.getOriginalImageDataUrl(this.sign.src) : null
        if(this.originalImage){
            this.keepOriginal = true;
        }
        this.processedImage = this.sign.src ? CustomImageStoreService.getImageDataUrl(this.sign.src) : null
    }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close(null);
    }

    processImage(){
        this.originalImage = this.toReducedOriginal();
        this.processedImage = this.toSymbol();
        let hash = Md5.hashStr(this.image).toString();
        if (CustomImageStoreService.isCustomImage(hash)) {
           this.load(CustomImageStoreService.getSign(hash));
        }
    }



    private toReducedOriginal():string{
        const MAX_SIZE_OF_ORIGINAL_IMAGE:number = 700;
        let canvas = document.createElement("canvas");
        let iw = this.imgEl.nativeElement.naturalWidth;
        let ih = this.imgEl.nativeElement.naturalHeight;
        let vertical = ih > iw;
        if(vertical){
            canvas.height = ih<MAX_SIZE_OF_ORIGINAL_IMAGE ? ih : MAX_SIZE_OF_ORIGINAL_IMAGE;
            canvas.width = iw/ih*canvas.height;
        }
        else{
            canvas.width = iw<MAX_SIZE_OF_ORIGINAL_IMAGE ? iw : MAX_SIZE_OF_ORIGINAL_IMAGE;
            canvas.height = ih/iw*canvas.width;
        }
        let ctx = canvas.getContext("2d");
        ctx.drawImage(this.imgEl.nativeElement, 0 ,0, canvas.width, canvas.height);
        ctx.fill();
        return canvas.toDataURL("image/jpeg", 0.8);
    }


    private toSymbol():string{
        let canvas = document.createElement("canvas");
        let iw = this.imgEl.nativeElement.naturalWidth;
        let ih = this.imgEl.nativeElement.naturalHeight;
        let vertical = ih > iw;
        let targetSize = Math.min(150,  Math.min(iw, ih));
        canvas.width = targetSize;
        canvas.height = targetSize;
        let ctx = canvas.getContext("2d");
        let nw = vertical ? targetSize : targetSize/ih*iw;
        let nh = vertical ? targetSize/iw*ih : targetSize;
        ctx.drawImage(this.imgEl.nativeElement, (targetSize-nw)/2 ,(targetSize-nw)/2, nw, nh);
        ctx.globalCompositeOperation='destination-in';
        ctx.beginPath();
        ctx.arc(canvas.width/2,canvas.height/2,Math.min(canvas.width, canvas.height)/2,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
        return canvas.toDataURL();
    }


    add(): void {
        this.loading = true;
        this.sign.onlyForSessionId = this.shareWithOthers ? null : this.sharedState.getCurrentSession().uuid;
        this.customImage.saveSign(this.sign, this.processedImage, this.keepOriginal ? this.originalImage :null, [this.imgProcessorEl.nativeElement.naturalWidth, this.imgProcessorEl.nativeElement.naturalHeight]).then(() => {
            this.loading = false;
            this.dialogRef.close(this.sign);
        });
    }

    readFromFile() {
        this.loading = true;
        const reader = new FileReader();
        for (let index = 0; index < this.el.nativeElement.files.length; index++) {
            reader.onload = () => {
                this.loading = false;
                // this 'text' is the content of the file
                this.image = reader.result;
            };
            reader.readAsDataURL(this.el.nativeElement.files[index]);
        }
    }
}
