import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from "ngx-indexed-db";
import GeoJSON from 'ol/format/GeoJSON';
import {Md5} from "ts-md5";
import {unwrapResolvedMetadata} from "@angular/compiler";

@Injectable({
    providedIn: 'root'
})
export class MapStoreService {

    static STORE_MAP: string = "map";
    static STORE_HISTORY: string = "history";

    constructor(private dbService: NgxIndexedDBService) {
    }

    public saveMap(sessionId: string, currentMap: GeoJSON): Promise<any> {
        return new Promise<any>(resolve => {
            this.getMap(sessionId).then(previousMap => {
                //if (MapStoreService.hasChanged(currentMap, previousMap)) {
                    let mapUpdate: Promise<any> = this.dbService.update(MapStoreService.STORE_MAP, currentMap, sessionId);
                    let historyUpdate: Promise<any> = this.addToHistory(sessionId, currentMap);
                    Promise.all([mapUpdate, historyUpdate]).then(() => resolve("Successfully updated"));
                //} else {
                //    resolve("No changes");
                //}
            })
        });
    }

    public getFirstDateInHistory(sessionId:string): Promise<Date> {
        return new Promise<Date>(resolve => {this.dbService.getByKey(MapStoreService.STORE_HISTORY, sessionId).then(history => {
            //TODO because of the insertion order, the first element should also be the smallest. We could ensure this though by finding the minimal value
            resolve(Object.keys(history).length==0 ? null : new Date(JSON.parse(Object.keys(history)[0])));
        })});
    }

    private static hasChanged(currentMap: GeoJSON, previousMap: GeoJSON): boolean {
        //TODO optimize change detection
        return JSON.stringify(previousMap) !== JSON.stringify(currentMap);
    }

    private addToHistory(sessionId: string, map: GeoJSON): Promise<any> {
        return new Promise<any>(resolve => {
            this.dbService.getByKey(MapStoreService.STORE_HISTORY, sessionId).then(history => {
                if (!history) {
                    history = {};
                }
                history[JSON.stringify(new Date())] = map;
                this.dbService.update(MapStoreService.STORE_HISTORY, history, sessionId).then(() => resolve({}));
            })
        });
    }

    public removeMap(sessionId: string, removeHistory:boolean): Promise<any> {
        const mapDelete: Promise<any> = this.dbService.delete(MapStoreService.STORE_MAP, sessionId);
        if(removeHistory) {
            const historyDelete: Promise<any> = this.dbService.delete(MapStoreService.STORE_HISTORY, sessionId);
            return Promise.all([mapDelete, historyDelete]);
        }
        else{
            return mapDelete;
        }
    }

    public getMap(sessionId: string): Promise<GeoJSON> {
        return this.dbService.getByKey(MapStoreService.STORE_MAP, sessionId);
    }

    public getHistoricalState(sessionId: string, date: Date): Promise<GeoJSON> {
        return new Promise<GeoJSON>(resolve => {
            this.getHistory(sessionId).then(history => {
                if (history) {
                    let dates = Object.keys(history).sort();
                    if(dates.length>0) {
                        const lookupDateString: string = JSON.stringify(date);
                        //TODO: B-Tree search instead...
                        for (let i = 0; i < dates.length; i++) {
                            let d = dates[i];
                            if (d > lookupDateString) {
                                if (i > 0) {
                                    resolve(<GeoJSON>history[dates[i - 1]]);
                                    return;
                                } else {
                                    break;
                                }
                            }
                        }
                        //Since we didn't find one, it's the most recent...
                        resolve(<GeoJSON>history[dates[dates.length-1]]);
                        return;
                    }
                }
                resolve(null);
            });
        });
    }

    public getHistory(sessionId: string): Promise<any> {
        return this.dbService.getByKey(MapStoreService.STORE_HISTORY, sessionId);
    }

}
