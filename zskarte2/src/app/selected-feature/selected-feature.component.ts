import {Component, OnInit} from '@angular/core';
import {SharedStateService} from "../shared-state.service";
import {Sign} from "../entity/sign";
import {DrawStyle} from "../drawlayer/draw-style";
import {HistoryComponent} from "../history/history.component";
import {GeoadminService} from "../geoadmin.service";
import {I18NService} from "../i18n.service";

@Component({
    selector: 'app-selected-feature',
    templateUrl: './selected-feature.component.html',
    styleUrls: ['./selected-feature.component.css']
})
export class SelectedFeatureComponent implements OnInit {

    constructor(private sharedState: SharedStateService, public i18n:I18NService) {
    }

    selectedFeature: any = null;
    selectedSignature: Sign = null;

    rotationPercent: number = 0;

    setRotation(perc) {
        if(this.selectedFeature!=null){
            this.selectedFeature.rotation = perc;
            this.selectedFeature.changed();
        }
    }

    redraw(){
        this.selectedFeature.changed();
    }


    ngOnInit() {
        this.sharedState.currentFeature.subscribe(feature => {
            this.selectedFeature = feature;
            this.selectedSignature = feature != null ? feature.get('sig') : null;
        });
    }

    delete() {
        this.sharedState.deleteFeature(this.selectedFeature);
    }

    getImageUrl(file: string) {
        return DrawStyle.getImageUrl(file);
    }
}
