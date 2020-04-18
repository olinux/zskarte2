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
import OlView from 'ol/View';
import {transform} from 'ol/proj';
import {SharedStateService} from '../shared-state.service';
import {Layer} from "../layers/layer";
import {coordinatesProjection, mercatorProjection} from "../projections";
import Feature from 'ol/Feature';
import {I18NService} from "../i18n.service";
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Point from 'ol/geom/Point';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

    initialCoordinates = [776217.9563903547,  5900111.880627786];
    map: OlMap = null;
    layer: Layer;
    view: OlView;

    positionFlagLocation:Point = new Point([0, 0]);
    positionFlag:Feature = new Feature({
        geometry: this.positionFlagLocation
    });
    navigationSource = new VectorSource({
        features: [this.positionFlag]
    });
    navigationLayer = new VectorLayer({
        source: this.navigationSource
    })

    constructor(private sharedState: SharedStateService, public i18n:I18NService) {
        this.positionFlag.setStyle(new Style({
            image: new Icon({
                anchor: [0.5, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                src: 'assets/img/place.png'
            })
        }));
    }

    ngOnInit() {
        let previousPosition: any = localStorage.getItem('viewport');
        if(previousPosition!=null){
            previousPosition = JSON.parse(previousPosition);
        }

        // let mousePositionControl = new MousePosition({
        //     coordinateFormat: createStringXY(4),
        //     projection: 'EPSG:3857',
        //     // comment the following two lines to have the mouse position
        //     // be placed within the map.
        //     className: 'custom-mouse-position',
        //     target: document.getElementById('mouse-position'),
        //     undefinedHTML: '&nbsp;'
        // });

        window.addEventListener('beforeunload', (event) => {
            //Save zoom level and position before leaving (to recover when re-entering)
            localStorage.setItem('viewport', JSON.stringify({"center": this.map.getView().getCenter(), "zoom": this.map.getView().getZoom()}));
        });
        this.map = new OlMap({
            target: 'map',
            view: new OlView({
                center: previousPosition!=null && previousPosition.center != null ? previousPosition.center : this.initialCoordinates,
                zoom: previousPosition!=null && previousPosition.zoom!=null ? previousPosition.zoom : 12
            }),
            controls: []
            //controls: [mousePositionControl]
        });
        this.map.addLayer(this.navigationLayer);
        this.sharedState.currentCoordinate.subscribe(coordinate => {
            if (coordinate != null) {
                const c = transform([coordinate.lon, coordinate.lat], coordinatesProjection, mercatorProjection);
                this.positionFlagLocation.setCoordinates(c);
                this.positionFlag.changed();
                this.map.getView().setCenter(c);
            }
        });
        this.sharedState.addAdditionalLayer.subscribe(layer => {
            if(layer!=null){
                this.map.removeLayer(this.navigationLayer);
                this.map.addLayer(layer);
                this.map.addLayer(this.navigationLayer);
                this.sharedState.didChangeLayer();
            }
        });
        this.sharedState.removeAdditionalLayer.subscribe(layer => {
            if(layer!=null){
                this.map.removeLayer(layer);
                this.sharedState.didChangeLayer();
            }
        });

        this.sharedState.currentLayer.subscribe(layer => {
            if(layer!=null) {
                if (this.layer != null) {
                    this.map.removeLayer(this.layer.olLayer);
                }
                this.map.getLayers().insertAt(0, layer.olLayer);
                this.layer = layer;

                this.sharedState.didChangeLayer();
            }
        });

    }

}


