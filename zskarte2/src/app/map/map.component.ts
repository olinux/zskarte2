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
import OlMap from 'ol/Map';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import OSM from 'ol/source/OSM';

import {fromLonLat} from 'ol/proj';

import {condition} from 'ol/events';
import {transform} from 'ol/proj';
import {proj} from 'ol';
import {getCoordinatesProjection} from '../projections';
import {SharedStateService} from '../shared-state.service';
import {Layer} from "../layers/layer";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

    initialCoordinates = [829038.2228723184, 5933590.521128002];
    map: OlMap = null;
    layer: Layer;
    view: OlView;

    constructor(private sharedState: SharedStateService) {
    }

    ngOnInit() {
        this.map = new OlMap({
            target: 'map',
            view: new OlView({
                center: this.initialCoordinates,
                zoom: 16
            })
        });
        this.sharedState.currentCoordinate.subscribe(coordinate => {
            if (coordinate != null) {
                const c = transform([coordinate.lon, coordinate.lat], getCoordinatesProjection(), this.map.projectionFunction());
                this.map.getView().setCenter(c);
            }
        });
        this.sharedState.currentLayer.subscribe(layer => {
            if(layer!=null) {
                if (this.layer != null) {
                    this.map.removeLayer(this.layer.olLayer);
                }
                this.map.addLayer(layer.olLayer);
                this.layer = layer;
                this.map.projectionFunction = layer.projectionFunction;
                this.sharedState.didChangeLayer();
            }
        })
    }
}


