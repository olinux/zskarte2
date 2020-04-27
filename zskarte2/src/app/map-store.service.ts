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
            let mapUpdate: Promise<any> = this.dbService.update(MapStoreService.STORE_MAP, currentMap, sessionId);
            let historyUpdate: Promise<any> = this.addToHistory(sessionId, currentMap);
            Promise.all([mapUpdate, historyUpdate]).then(() => resolve("Successfully updated"));
        });
    }

    private initHistory(history): any {
        return history ? history : {tags: {}, states: {}};
    }

    public removeTag(sessionId: string, key:string){
        return new Promise<any>(resolve => {
            this.dbService.getByKey(MapStoreService.STORE_HISTORY, sessionId).then(history => {
                if(history && history.tags){
                    delete history.tags[key];
                    this.dbService.update(MapStoreService.STORE_HISTORY, history, sessionId).then(() => resolve({}));
                }
            })
        });
    }

    public setTag(sessionId: string, tag: string) {
        return new Promise<any>(resolve => {
            this.dbService.getByKey(MapStoreService.STORE_HISTORY, sessionId).then(history => {
                history = this.initHistory(history);
                if (history.states) {
                    let sortedKeys = Object.keys(history.states).sort();
                    if (sortedKeys.length > 0) {
                        history.tags[sortedKeys[sortedKeys.length - 1]] = tag;
                    }
                    this.dbService.update(MapStoreService.STORE_HISTORY, history, sessionId).then(() => resolve({}));
                }
            })
        });
    }

    public getFirstDateInHistory(sessionId: string): Promise<Date> {
        return new Promise<Date>(resolve => {
            this.dbService.getByKey(MapStoreService.STORE_HISTORY, sessionId).then(history => {
                //TODO because of the insertion order, the first element should also be the smallest. We could ensure this though by finding the minimal value
                resolve(Object.keys(history).length == 0 ? null : new Date(JSON.parse(Object.keys(history)[0])));
            })
        });
    }

    private addToHistory(sessionId: string, map: GeoJSON): Promise<any> {
        return new Promise<any>(resolve => {
            this.dbService.getByKey(MapStoreService.STORE_HISTORY, sessionId).then(history => {
                history = this.initHistory(history);
                history.states[JSON.stringify(new Date())] = map;
                this.dbService.update(MapStoreService.STORE_HISTORY, history, sessionId).then(() => resolve({}));
            })
        });
    }

    public removeMap(sessionId: string, removeHistory: boolean): Promise<any> {
        const mapDelete: Promise<any> = this.dbService.delete(MapStoreService.STORE_MAP, sessionId);
        if (removeHistory) {
            const historyDelete: Promise<any> = this.dbService.delete(MapStoreService.STORE_HISTORY, sessionId);
            return Promise.all([mapDelete, historyDelete]);
        } else {
            return mapDelete;
        }
    }

    public getMap(sessionId: string): Promise<GeoJSON> {
        return this.dbService.getByKey(MapStoreService.STORE_MAP, sessionId);
    }


    public getHistoricalStateByKey(sessionId: string, key: string): Promise<GeoJSON> {
        return new Promise<GeoJSON>(resolve => {
            this.getHistory(sessionId).then(history => {
                if (history) {
                    resolve(history.states[key]);
                } else {
                    resolve(null);
                }
            });
        });
    }

    public getHistory(sessionId: string): Promise<any> {
        return this.dbService.getByKey(MapStoreService.STORE_HISTORY, sessionId);
    }

    public saveHistory(sessionId: string, payload: any): Promise<any> {
        return this.dbService.update(MapStoreService.STORE_HISTORY, payload, sessionId);
    }

}
