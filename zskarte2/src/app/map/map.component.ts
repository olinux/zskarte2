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
import {PreferencesService} from "../preferences.service";
import {DRAW_LAYER_ZINDEX} from "../drawlayer/drawlayer.component";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

    map: OlMap = null;
    layer: Layer;
    view: OlView;
    currentSessionId: string;

    positionFlagLocation:Point = new Point([0, 0]);
    positionFlag:Feature = new Feature({
        geometry: this.positionFlagLocation
    });
    navigationSource = new VectorSource({
        features: [this.positionFlag]
    });
    navigationLayer = new VectorLayer({
        source: this.navigationSource
    });

    constructor(private sharedState: SharedStateService, private preferences: PreferencesService,  public i18n:I18NService) {
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
        this.navigationLayer.setZIndex(DRAW_LAYER_ZINDEX+1);
        const viewPort = this.preferences.getViewPortForSession(this.currentSessionId);
        window.addEventListener('beforeunload', (event) => {
            //Save zoom level and position before leaving (to recover when re-entering)
            if(this.currentSessionId) {
                this.preferences.setViewPortForSession(this.currentSessionId, {
                    coordinates: this.map.getView().getCenter(),
                    zoomLevel: this.map.getView().getZoom()
                });
            }
        });
        this.map = new OlMap({
            target: 'map',
            view: new OlView({
                center: viewPort.coordinates,
                zoom: viewPort.zoomLevel
            }),
            controls: []
            //controls: [mousePositionControl]
        });
        this.map.addLayer(this.navigationLayer);
        this.sharedState.session.subscribe(s => {
            if(s && s.uuid !== this.currentSessionId){
                this.currentSessionId = s.uuid;
                const viewPort = this.preferences.getViewPortForSession(this.currentSessionId);
                this.map.getView().setCenter(viewPort.coordinates);
                this.map.getView().setZoom(viewPort.zoomLevel);
            }
        })
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
                this.map.addLayer(layer);
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


