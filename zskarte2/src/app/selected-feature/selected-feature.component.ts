import {Component, OnInit} from '@angular/core';
import {SharedStateService} from "../shared-state.service";
import {defineDefaultValuesForSignature, Sign} from "../entity/sign";
import {DrawStyle} from "../drawlayer/draw-style";
import {I18NService} from "../i18n.service";
import {MatDialog} from "@angular/material/dialog";
import {DrawingDialogComponent} from "../drawing-dialog/drawing-dialog.component";
import {CustomImageStoreService} from "../custom-image-store.service";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {DisplayMode} from "../entity/displayMode";

@Component({
    selector: 'app-selected-feature',
    templateUrl: './selected-feature.component.html',
    styleUrls: ['./selected-feature.component.css']
})
export class SelectedFeatureComponent implements OnInit {

    constructor(public dialog: MatDialog, private sharedState: SharedStateService, public i18n: I18NService) {
        this.sharedState.currentFeature.subscribe(feature => {

            if (feature && feature.get("features")) {
                if(feature.get("features").length===1){
                    this.groupedFeatures = null;
                    this.activeFeatureSelect(feature.get("features")[0]);
                }
                else {
                    this.groupedFeatures = this.extractFeatureGroups(feature.get("features"));
                }
            } else {
                this.groupedFeatures = null;
                this.activeFeatureSelect(feature);
            }
        });
        this.sharedState.drawHoleMode.subscribe(drawHoleMode => this.drawHoleMode = drawHoleMode);
        this.sharedState.mergeMode.subscribe(m => {
            this.mergeMode = m;
        });
        this.sharedState.displayMode.subscribe(displayMode => this.editMode = displayMode !== DisplayMode.HISTORY)
        this.editMode = this.sharedState.displayMode.getValue() !== DisplayMode.HISTORY;
    }

    groupedFeatures = null;
    editMode: boolean;
    selectedFeature: any = null;
    selectedSignature: Sign = null;
    rotationPercent: number = 0;
    drawHoleMode: boolean = false;
    mergeMode: boolean = false;

    private extractFeatureGroups(allFeatures: any[]): any {
        let result = {}
        allFeatures.forEach(f => {
            let sig = f.get("sig");
            let label = this.i18n.getLabelForSign(sig)
            let group = result[label];
            if (!group) {
                group = result[label] = {
                    label: label
                }
            }
            if (!group.src && sig.src) {
                group.src = sig.src;
            }
            if (!group.features) {
                group.features = []
            }
            group.features.push(f)
        });
        return result
    }

    private showFeature(feature) {
        if (feature && feature.getGeometry()) {
            this.sharedState.gotoCoordinate({lon: feature.getGeometry().getCoordinates()[0], lat: feature.getGeometry().getCoordinates()[1], mercator: true, center:false});
        }
    }

    private hideFeature(){
        this.sharedState.gotoCoordinate(null);
    }


    get featureGroups() {
        // @ts-ignore
        return this.groupedFeatures ? Object.values(this.groupedFeatures).sort((a, b) => a.label.localeCompare(b.label)) : null;
    }


    private activeFeatureSelect(feature: any) {
        this.selectedFeature = feature;
        this.selectedSignature = feature ? feature.get('sig') : null;
        if (this.selectedSignature) {
            defineDefaultValuesForSignature(this.selectedSignature);
        }
    }

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
    }

    chooseSymbol() {
        const dialogRef = this.dialog.open(DrawingDialogComponent);
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

    removeSymbol() {
        this.selectedSignature.src = null;
        this.selectedSignature.de = null;
        this.selectedSignature.fr = null;
        this.selectedSignature.en = null;
        this.redraw();
    }

    editCoordinates() {
        this.sharedState.defineCoordinates.next(true);
    }

    delete() {
        let confirm = this.dialog.open(ConfirmationDialogComponent, {
            data: this.i18n.get('removeFeatureFromMapConfirm')
        });
        confirm.afterClosed().subscribe(r => {
            if (r) {
                this.sharedState.deleteFeature(this.selectedFeature);
            }
        });

    }

    getImageUrl(file: string) {
        let imageFromStore = CustomImageStoreService.getImageDataUrl(file)
        if (imageFromStore) {
            return imageFromStore;
        }
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
