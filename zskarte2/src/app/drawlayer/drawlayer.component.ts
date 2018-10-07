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

import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import Select from 'ol/interaction/Select';
import Modify from 'ol/interaction/Modify';
import Vector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Draw from 'ol/interaction/Draw';
import GeometryCollection from 'ol/geom/GeometryCollection';
import OlMap from 'ol/Map';
import {fromLonLat} from 'ol/proj';
import {never} from 'ol/events/condition';
import {SharedStateService} from '../shared-state.service';
import {DrawStyle} from './draw-style';
import {getMercatorProjection} from '../projections';
import {Sign} from "../entity/sign";

@Component({
    selector: 'app-drawlayer',
    templateUrl: './drawlayer.component.html',
    styleUrls: ['./drawlayer.component.css']
})
export class DrawlayerComponent implements OnInit {

    @Input() inputMap: OlMap;

    map: OlMap;
    currentDrawingSign = null;
    status = null;

    select = new Select({
        toggleCondition: never,
        style: DrawStyle.styleFunctionSelect,
        condition: never
    });

    modify = new Modify({
        features: this.select.getFeatures()
    });

    source = new Vector({
        format: new GeoJSON()
    });
    layer = new LayerVector({
        source: this.source,
        style: DrawStyle.styleFunction
    });
    drawer = null;
    historyMode = false;
    firstLoad = true;

    constructor(private sharedState: SharedStateService) {
    }


    ngOnInit() {
        this.map = this.inputMap;
        this.source.drawLayer = this;
        this.map.drawLayer = this;
        this.map.addInteraction(this.select);
        this.map.addInteraction(this.modify);
        this.sharedState.deletedFeature.subscribe(feature => this.removeFeature(feature))
        this.sharedState.currentSign.subscribe(sign => this.startDrawing(sign));
        this.sharedState.historyDate.subscribe(historyDate => this.toggleHistory(historyDate));
        // Because of the closure, we end up inside the map -> let's just add an
        // indirection and go back to the drawlayer level again.
        this.sharedState.layerChanged.subscribe(changed => {
                if (changed) {
                    if (!this.firstLoad) {
                        this.map.removeLayer(this.layer);
                    }
                    this.map.addLayer(this.layer);
                    if (this.firstLoad) {
                        this.load();
                        this.startAutoSave();
                        this.firstLoad = false;
                    }
                }
            }
        );


        this
            .map
            .on(
                'click'
                ,

                function (event) {
                    this.drawLayer.selectHandler(event);
                }
            );
        this
            .source
            .on(
                'addfeature'
                ,

                function (event) {
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
        this.load();
        this.map.addInteraction(this.select);
        this.map.addInteraction(this.modify);
    }

    loadFromHistory(date) {
        let history: any = localStorage.getItem('mapold');
        if (history !== null) {
            this.map.removeInteraction(this.select);
            this.map.removeInteraction(this.modify);
            history = JSON.parse(history);
            for (let i = history.elements.length; i > 0; i--) {
                const element = history.elements[i - 1];
                if (date > new Date(element.time)) {
                    this.loadElements(JSON.parse(element.content));
                    break;
                }
            }
        }
    }

    selectHandler(event): void {
        if (!
                this.historyMode
        ) {
            this.select.getFeatures().clear();
            const f = this.source.getClosestFeatureToCoordinate(event.coordinate);
            let select = false;
            if (f != null) {
                const threshold = 40;
                const ext = f.getGeometry().getExtent();
                const vmax = Math.max(ext[1], ext[3]);
                const vmin = Math.min(ext[1], ext[3]);
                const hmax = Math.max(ext[0], ext[2]);
                const hmin = Math.min(ext[0], ext[2]);

                // Is inside?
                const vdist = vmax - event.coordinate[1];
                const hdist = hmax - event.coordinate[0];

                if (vdist > 0 && hdist > 0 && vdist < vmax - vmin && hdist < hmax - hmin) {
                    select = true;
                } else {
                    const vdiff = Math.min(Math.abs(vmax - event.coordinate[1]), Math.abs(vmin - event.coordinate[1]));
                    const hdiff = Math.min(Math.abs(hmax - event.coordinate[0]), Math.abs(hmin - event.coordinate[0]));
                    if (hdiff < threshold && vdiff < threshold) {
                        select = true;
                    }
                }

            }
            if (select) {
                this.select.getFeatures().push(f);
            } else {
                this.select.getFeatures().clear();
            }
            this.selectionChanged();
        }
    }


    selectionChanged() {
        if (this.select.getFeatures().getLength() === 1) {
            this.sharedState.selectFeature(this.select.getFeatures().item(0));
        } else if (this.select.getFeatures().getLength() === 0) {
            this.sharedState.selectFeature(null);
        } else {
            window.alert('too many items selected at once!');
        }
    }

    filterFeatures(filter): void {
        // this.style.filter = filter;
        this.layer.changed();
    }


    writeFeatures() {
        const features = this.source.getFeatures();
        let feature;
        let geometry;
        let i;
        for (i = 0; i < features.length; i++) {
            feature = features[i];
            geometry = feature.getGeometry().transform(this.map.projectionFunction(), getMercatorProjection());
            feature.setGeometry(geometry);
        }
        const json = JSON.stringify(new GeoJSON({defaultDataProjection: 'EPSG:3857'}).writeFeatures(features));
        for (i = 0; i < features.length; i++) {
            feature = features[i];
            geometry = feature.getGeometry().transform(getMercatorProjection(), this.map.projectionFunction());
            feature.setGeometry(geometry);
        }
        return json;
    }

    toDataUrl() {
        return 'data:text/json;charset=UTF-8,' + encodeURIComponent(this.writeFeatures());
    }

    removeAll() {
        if (!this.historyMode) {
            localStorage.removeItem('map');
            localStorage.removeItem('mapold');
            this.source.clear();
            this.select.getFeatures().clear();
        }
    }

    save() {
        if (!this.historyMode) {
            const previouslyStored = localStorage.getItem('map');
            const now = this.writeFeatures();
            if (now !== previouslyStored) {
                localStorage.setItem('map', now);
                let history: any = localStorage.getItem('mapold');
                if (history === null) {
                    history = {'elements': []};
                } else {
                    history = JSON.parse(history);
                }
                history.elements.push({'time': new Date(), 'content': now});
                localStorage.setItem('mapold', JSON.stringify(history));
            }
        }
    }

    loadElements(elements) {
        this.source.clear();
        this.select.getFeatures().clear();
        if (elements !== null) {
            const features = new GeoJSON().readFeatures(elements);
            for (let i = 0; i < features.length; i++) {
                const feature = features[i];
                const geometry = feature.getGeometry().transform(getMercatorProjection(), this.map.projectionFunction());
                feature.setGeometry(geometry);
            }
            this.source.addFeatures(features);
        }
    }

    load() {
        let items = null;
        items = localStorage.getItem('map');
        if (items !== null) {
            this.loadFromString(items);
        }
    }

    loadFromString(text) {
        this.loadElements(JSON.parse(text));
    }

    startDrawing(sign) {
        this.currentDrawingSign = sign;
        if (this.drawer !== null) {
            this.map.removeInteraction(this.drawer);
        }
        if (this.currentDrawingSign != null) {
            this.drawer = new Draw({
                source: this.source,
                type: this.currentDrawingSign.type
            });
            this.drawer.drawLayer = this;
            this.drawer.once('drawend', function (event) {
                this.drawLayer.endDrawing(event);
            });
            this.map.addInteraction(this.drawer);
        }
    }

    endDrawing(event) {
        event.feature.set('sig', this.currentDrawingSign);
        if (event.feature.getGeometry().getType() === 'Polygon') {
            const point = new Point(event.feature.getGeometry().getFirstCoordinate());
            const coll = new GeometryCollection();
            coll.setGeometries([event.feature.getGeometry(), point]);
            event.feature.setGeometry(coll);
        }
        this.map.removeInteraction(this.drawer);
        this.currentDrawingSign = null;
    }

    addFeatures(features) {
        this.source.addFeatures(features);
    }

    removeFeature(feature) {
        if (feature != null) {
            this.source.removeFeature(feature);
            this.select.getFeatures().clear();
        }
    }

    clearSelection() {
        this.select.getFeatures().clear();
    }

    startAutoSave() {
        const t = setTimeout(() => {
            this.status = 'auto save...';
            this.save();
            setTimeout(() => {
                this.status = null;
            }, 1000);
            this.startAutoSave();
        }, 10000);
    }

}

