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
import {Component, Input, OnInit} from '@angular/core';
import Select from 'ol/interaction/Select';
import Modify from 'ol/interaction/Modify';
import Vector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Draw from 'ol/interaction/Draw';
import OlMap from 'ol/Map';
import DrawHole from 'ol-ext/interaction/DrawHole';
import Overlay from 'ol/Overlay'
import {SharedStateService} from '../shared-state.service';
import {DrawStyle} from './draw-style';
import {Sign} from "../entity/sign";
import {I18NService} from "../i18n.service";
import {MapStoreService} from "../map-store.service";
import Circle from "ol/geom/Circle";
import {SessionsService} from "../sessions.service";
import CENTER_LEFT from "ol/OverlayPositioning";

export const DRAW_LAYER_ZINDEX = 100000;

@Component({
    selector: 'app-drawlayer',
    templateUrl: './drawlayer.component.html',
    styleUrls: ['./drawlayer.component.css']
})
export class DrawlayerComponent implements OnInit {

    @Input() inputMap: OlMap;

    map: OlMap;
    currentDrawingSign = null;
    status = "Loading data...";
    currentSessionId: string;
    recordChanges: boolean = false;

    source = new Vector({
        format: new GeoJSON()
    });
    layer = new LayerVector({
        source: this.source,
        style: DrawStyle.styleFunction,
        className: 'drawLayer'
    });
    select = new Select({
        //toggleCondition: never,
        style: DrawStyle.styleFunctionSelect,
        //condition: never
        layers: [this.layer],
        hitTolerance: 10

    });

    lastModificationPointCoordinates = null;

    modify = new Modify({
            features: this.select.getFeatures(),
            condition: (event) => {
                if (this.isModifyPointInteraction()) {
                    this.lastModificationPointCoordinates = this.modify["vertexFeature_"].getGeometry().getCoordinates();
                    this.toggleRemoveButton(true);
                    this.removeButton.setPosition(event.coordinate);
                }
                return true;
            },
            hitTolerance: 10
        }
    );
    removeButton: Overlay = null;

    historyMode = false;
    firstLoad = true;
    drawHole = new DrawHole(
        {
            layers: [this.layer]
        });

    constructor(private sharedState: SharedStateService, private mapStore: MapStoreService, public i18n: I18NService, private sessions: SessionsService) {
    }

    private isModifyPointInteraction() {
        return this.modify["lastPointerEvent_"] && this.modify["vertexFeature_"] && this.select.getFeatures();
    }

    private indexOfPointInCoordinateGroup(coordinateGroup:number[][], compareCoordinate: number[]){
        for(let i=0; i<coordinateGroup.length; i++){
            let coordinate = coordinateGroup[i];
            if(coordinate[0] === compareCoordinate[0] && coordinate[1] === compareCoordinate[1]){
                return i;
            }
        }
        return -1;
    }

    private getCoordinationGroupOfLastPoint(){
        //Since we're working with single select, this should be only one - we iterate it nevertheless for being defensive
        for (let feature of this.select.getFeatures().getArray()) {
            let geometry = feature.getGeometry();
            switch (geometry.getType()) {
                case "Polygon":
                    for (let i=0; i<geometry.getCoordinates().length; i++) {
                        let coordinateGroup = geometry.getCoordinates()[i];
                        if(this.indexOfPointInCoordinateGroup(coordinateGroup, this.lastModificationPointCoordinates)!=-1){
                            return {feature: feature, coordinateGroupIndex: i, otherCoordinationGroupCount: geometry.getCoordinates().length-1, minimalAmountOfPoints: coordinateGroup.length<=4};
                        }
                    }
                    return null;
                case "LineString":
                    return {feature: feature, coordinateGroupIndex: null, otherCoordinationGroupCount: 0, minimalAmountOfPoints: geometry.getCoordinates().length<=2};
            }
        }
        return null;
    }

    private drawingManipulated() {
        this.status = "Save changes";
        this.save().then(this.status = null);
    }

    toggleRemoveButton(show: boolean) {
        this.removeButton.getElement().style.display = show ? "block" : "none";
    }

    ngOnInit() {
        this.removeButton = new Overlay({
            element: document.getElementById('removePoint'),
            positioning: CENTER_LEFT,
            offset: [10, 0]
        });
        this.modify.addEventListener('modifystart', e => {
            this.toggleRemoveButton(false);
        });
        this.modify.addEventListener('modifyend', e => {
            if (this.isModifyPointInteraction()) {
                this.lastModificationPointCoordinates = this.modify["vertexFeature_"].getGeometry().getCoordinates();
                this.removeButton.setPosition(e.mapBrowserEvent.coordinate);
                this.toggleRemoveButton(true);
            }
        });
        this.removeButton.getElement().addEventListener('click', e => {
            let coordinationGroup = this.getCoordinationGroupOfLastPoint()
            if(coordinationGroup){
                if(!coordinationGroup.minimalAmountOfPoints){
                    this.modify.removePoint();
                }
                else if(coordinationGroup.otherCoordinationGroupCount==0){
                    //It's the last coordination group - we can remove the feature.
                    this.removeFeature(coordinationGroup.feature);
                    this.sharedState.selectFeature(null);
                }
                else if(coordinationGroup.coordinateGroupIndex){
                    //It's not the last coordination group - so we need to get rid of the coordination group inside the feature
                    let oldCoordinates = coordinationGroup.feature.getGeometry().getCoordinates();
                    let newCoordinates = [];
                    for(let i=0; i<oldCoordinates.length; i++){
                        if(i!=coordinationGroup.coordinateGroupIndex){
                            newCoordinates.push(oldCoordinates[i]);
                        }
                    }
                    coordinationGroup.feature.getGeometry().setCoordinates(newCoordinates);
                }
            }
            this.toggleRemoveButton(false);
        });
        this.layer.setZIndex(DRAW_LAYER_ZINDEX);
        this.map = this.inputMap;
        this.map.addOverlay(this.removeButton);
        this.source.drawLayer = this;
        this.select.drawLayer = this;
        this.map.drawLayer = this;
        this.modify.drawLayer = this;
        this.map.addInteraction(this.select);
        this.map.addInteraction(this.modify);
        this.map.addInteraction(this.drawHole);
        this.drawHole.setActive(true);
        this.drawHole.drawLayer = this;
        this.select.addEventListener('select', function (e) {
            this.drawLayer.selectionChanged();
        })
        this.source.addEventListener('addfeature', function (e) {
            this.drawLayer.drawingManipulated();
        });
        this.source.addEventListener('removefeature', function (e) {
            this.drawLayer.drawingManipulated();
        });
        this.source.addEventListener('changefeature', function (e) {
            this.drawLayer.drawingManipulated();
        });
        this.drawHole.addEventListener('drawend', function (e) {
            this.drawLayer.sharedState.updateDrawHoleMode(false);
        });
        this.sharedState.deletedFeature.subscribe(feature => this.removeFeature(feature))
        this.sharedState.currentSign.subscribe(sign => this.startDrawing(sign));
        this.sharedState.drawHoleMode.subscribe(drawHole => this.doDrawHole(drawHole));
        this.sharedState.historyDate.subscribe(historyDate => this.toggleHistory(historyDate));
        this.sharedState.session.subscribe(s => {
            if (s) {
                if (this.currentSessionId !== s.uuid) {
                    this.currentSessionId = s.uuid;
                    //The session has changed - we need to reload
                    this.status = "Now loading the map...";
                    this.load().then(() => {
                        this.status = "Map loaded";
                        this.recordChanges = true;
                        //this.startAutoSave();
                    });
                }
            } else {
                this.currentSessionId = null;
                //this.removeAll();
            }
        })
        // Because of the closure, we end up inside the map -> let's just add an
        // indirection and go back to the drawlayer level again.
        this.sharedState.layerChanged.subscribe(changed => {
                if (changed) {
                    if (!this.firstLoad) {
                        this.map.removeLayer(this.layer);
                    }
                    this.map.addLayer(this.layer);
                }
            }
        );

        this
            .source
            .on(
                'addfeature'
                ,
                function () {
                    this.drawLayer.selectionChanged();
                }
            );
    }

    toggleHistory(date: Date) {
        if (date === null && this.historyMode) {
            this.historyMode = false;
            this.endHistoryMode();
        } else if (date !== null) {
            this.historyMode = true;
            this.loadFromHistory(date);
        }
    }

    endHistoryMode() {
        this.load().then(() => {
            this.select.setActive(true);
            this.select.setActive(true);
        });
    }

    loadFromHistory(date) {
        this.modify.setActive(false);
        this.select.setActive(false);
        this.mapStore.getHistoricalState(this.currentSessionId, date).then(historicalMap => this.loadElements(historicalMap));
    }

    selectionChanged() {
        this.toggleRemoveButton(false);
        if (this.select.getFeatures().getLength() === 1) {
            this.sharedState.selectFeature(this.select.getFeatures().item(0));
        } else if (this.select.getFeatures().getLength() === 0) {
            this.sharedState.selectFeature(null);
        } else {
            window.alert('too many items selected at once!');
        }
    }

    private handleFeatureBeforeSaving(feature) {
        switch (feature.type) {
            case "Circle":
                console.log("The feature " + JSON.stringify(feature) + " is a circle!!!");
        }

    }

    writeFeatures(): GeoJSON {
        return JSON.parse(new GeoJSON({defaultDataProjection: 'EPSG:3857'}).writeFeatures(this.source.getFeatures()));
    }

    toDataUrl(withSession: boolean, withHistory: boolean) {
        let result = this.writeFeatures();
        if (withSession) {
            result.session = this.sharedState.getCurrentSession()
        }
        return 'data:text/json;charset=UTF-8,' + encodeURIComponent(JSON.stringify(result));
    }

    handleCustomSignatures(features: object[], signatureHandler) {
        for (let f of features) {
            // @ts-ignore
            let properties = f.properties;
            if (properties !== null) {
                let signature = (properties.sig as Sign);
                if (signature !== null && signature.dataUrl !== null) {
                    signatureHandler(signature)
                }
            }
        }
    }

    removeAll() {
        if (!this.historyMode) {
            this.mapStore.removeMap(this.currentSessionId, false).then(() => {
            });
            this.recordChanges = false;
            this.source.clear();
            this.select.getFeatures().clear();
            this.save();
            this.recordChanges = true;
        }
    }

    save(): Promise<any> {
        if (!this.historyMode) {
            let features = this.writeFeatures();
            return this.mapStore.saveMap(this.currentSessionId, features);
        }
        return Promise.resolve({});
    }

    loadElements(elements: GeoJSON) {
        this.recordChanges = false;
        this.source.clear();
        this.select.getFeatures().clear();
        if (elements) {
            if (elements.session) {
                this.sessions.saveSession(elements.session);
                this.sharedState.loadSession(elements.session);
                return;
            }
            if (elements.features) {
                this.handleCustomSignatures(elements.features, () => {
                    //TODO load dataUrls
                });
                this.source.addFeatures(new GeoJSON({defaultDataProjection: 'EPSG:3857'}).readFeatures(elements));
            }
        }
        this.save();
        this.recordChanges = true;
    }

    load(): Promise<any> {
        return new Promise<any>(resolve => {
            this.mapStore.getMap(this.currentSessionId).then(map => {
                this.loadElements(map)
                resolve("Elements loaded");
            });
        })
    }

    loadFromString(text) {
        this.loadElements(JSON.parse(text));
    }

    private drawers: { [key: string]: Draw; } = {}

    startDrawing(sign) {
        this.currentDrawingSign = sign;
        if (sign) {
            let drawer = this.drawers[sign.type];
            if (!drawer) {
                drawer = this.drawers[sign.type] = new Draw({
                    source: this.source,
                    type: this.currentDrawingSign.type
                });
                drawer.drawLayer = this;
                drawer.addEventListener('drawend', function (event) {
                    this.drawLayer.endDrawing(event);
                });
                this.map.addInteraction(drawer);
            }
            drawer.setActive(true);
        }
    }

    endDrawing(event) {
        event.feature.set('sig', this.currentDrawingSign);
        Object.values(this.drawers).forEach(drawer => drawer.setActive(false));
        //this.drawingManipulated();
    }

    addFeatures(features) {
        this.source.addFeatures(features);
    }

    removeFeature(feature) {
        if (feature != null) {
            this.toggleRemoveButton(false);
            this.source.removeFeature(feature);
            this.select.getFeatures().clear();
        }
    }


    private doDrawHole(drawHole: boolean) {
        if (drawHole) {
            Object.values(this.drawers).forEach(drawer => drawer.setActive(false));
            this.drawHole.setActive(true);
        } else {
            this.drawHole.setActive(false)
        }
    }

    // startAutoSave() {
    //     const saveInterval: number = 10000;
    //     setTimeout(() => {
    //         this.status = 'auto save...';
    //         this.save().then(() => {
    //             setTimeout(() => {
    //                 this.status = null;
    //             }, 1000);
    //             this.startAutoSave();
    //         });
    //     }, saveInterval);
    // }

}

