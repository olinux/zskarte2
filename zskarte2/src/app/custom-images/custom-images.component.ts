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
    loading = false;
    tooBig = false;

    @ViewChild('importSymbol', {static: false}) el: ElementRef;
    @ViewChild('imageLoader', {static: false}) imgEl: ElementRef
    @ViewChild('imageProcessor', {static: false}) imgProcessorEl: ElementRef

    constructor(@Inject(MAT_DIALOG_DATA) public data: Sign, public dialogRef: MatDialogRef<CustomImagesComponent>, public i18n: I18NService, private customImage: CustomImageStoreService, private sharedState: SharedStateService) {
        this.load(data);
    }

    private load(sign: Sign) {
        this.sign = sign ? sign : {type: "Polygon", src: null}
        this.shareWithOthers = !this.sign.onlyForSessionId;
        this.processedImage = this.sign.src ? CustomImageStoreService.getImageDataUrl(this.sign.src) : null
    }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close(null);
    }

    processImage(){
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
        this.processedImage = canvas.toDataURL();
        let hash = Md5.hashStr(this.image).toString();
        if (CustomImageStoreService.isCustomImage(hash)) {
           this.load(CustomImageStoreService.getSign(hash));
        }
    }

    add(): void {
        this.loading = true;
        this.sign.onlyForSessionId = this.shareWithOthers ? null : this.sharedState.getCurrentSession().uuid;
        this.customImage.saveSign(this.sign, this.processedImage, [this.imgProcessorEl.nativeElement.naturalWidth, this.imgProcessorEl.nativeElement.naturalHeight]).then(() => {
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
