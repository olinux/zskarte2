import { Component, OnInit } from '@angular/core';
import {SharedStateService} from "../shared-state.service";
import {Sign} from "../entity/sign";
import {DrawStyle} from "../drawlayer/draw-style";

@Component({
  selector: 'app-selected-feature',
  templateUrl: './selected-feature.component.html',
  styleUrls: ['./selected-feature.component.css']
})
export class SelectedFeatureComponent implements OnInit {

  constructor(private sharedState: SharedStateService) { }

  selectedFeature:any = null;
  selectedSignature:Sign = null;

  ngOnInit() {
      this.sharedState.currentFeature.subscribe(feature => {
        this.selectedFeature = feature;
        this.selectedSignature = feature!=null ? feature.get('sig') : null;
      });
  }

  delete(){
    this.sharedState.deleteFeature(this.selectedFeature);
  }

  getImageUrl(file:string){
    return DrawStyle.getImageUrl(file);
  }
}
