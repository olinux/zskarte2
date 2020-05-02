import {Component, OnInit} from '@angular/core';
import {SharedStateService} from "../shared-state.service";
import {defineDefaultValuesForSignature, Sign} from "../entity/sign";
import {DrawStyle} from "../drawlayer/draw-style";
import {I18NService} from "../i18n.service";
import {MatDialog} from "@angular/material/dialog";
import {DrawingDialogComponent} from "../drawing-dialog/drawing-dialog.component";

@Component({
    selector: 'app-selected-feature',
    templateUrl: './selected-feature.component.html',
    styleUrls: ['./selected-feature.component.css']
})
export class SelectedFeatureComponent implements OnInit {

    constructor(public drawDialog: MatDialog, private sharedState: SharedStateService, public i18n: I18NService) {
    }

    selectedFeature: any = null;
    selectedSignature: Sign = null;
    rotationPercent: number = 0;
    drawHoleMode: boolean = false;
    mergeMode: boolean = false;


    setRotation(perc) {
        if (this.selectedFeature != null) {
            this.selectedFeature.rotation = perc;
            this.selectedFeature.changed();
        }
    }

    redraw() {
        this.selectedFeature.changed();
    }


    ngOnInit() {
        this.sharedState.currentFeature.subscribe(feature => {
            this.selectedFeature = feature;
            this.selectedSignature = feature != null ? feature.get('sig') : null;
            if (this.selectedSignature) {
                defineDefaultValuesForSignature(this.selectedSignature);
            }
        });
        this.sharedState.drawHoleMode.subscribe(drawHoleMode => this.drawHoleMode = drawHoleMode);
        this.sharedState.mergeMode.subscribe(m => {
            this.mergeMode = m;
        });
    }

    chooseSymbol() {
        const dialogRef = this.drawDialog.open(DrawingDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.selectedSignature.src = result.src;
                this.selectedSignature.de = result.de;
                this.selectedSignature.fr = result.fr;
                this.selectedSignature.en = result.en;
                this.redraw();
            }
        });
    }

    removeSymbol(){
        this.selectedSignature.src = null;
        this.selectedSignature.de = null;
        this.selectedSignature.fr = null;
        this.selectedSignature.en = null;
        this.redraw();
    }

    delete() {
        this.sharedState.deleteFeature(this.selectedFeature);
    }

    getImageUrl(file: string) {
        return DrawStyle.getImageUrl(file);
    }

    drawHole() {
        this.sharedState.updateDrawHoleMode(!this.drawHoleMode);
    }

    merge(merge: boolean) {
        this.sharedState.setMergeMode(merge);
    }

    get canSplit(): boolean {
        return this.selectedFeature != null && this.selectedFeature.getGeometry().getCoordinates().length > 1;
    }

    split() {
        this.sharedState.setSplitMode(true);
    }

    bringToFront() {
        this.sharedState.reorderFeature(true);
    }

    sendToBack() {
        this.sharedState.reorderFeature(false);
    }

}
