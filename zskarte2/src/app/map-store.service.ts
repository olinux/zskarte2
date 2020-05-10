import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from "ngx-indexed-db";
import GeoJSON from 'ol/format/GeoJSON';
import {SharedStateService} from "./shared-state.service";

@Injectable({
    providedIn: 'root'
})
export class MapStoreService {

    public static STORE_MAP: string = "map";
    public static STORE_HISTORY: string = "history";

    //Flags if there are changes since the last time, the history has been saved.
    private dirtyHistory: boolean = false;

    //Flags if there are cahnges sicnce the last time, the map has been saved;
    private dirtyMap: boolean = false;

    constructor(private dbService: NgxIndexedDBService, private sharedState: SharedStateService) {
        this.startHistoryExtraction();
        this.sharedState.session.subscribe(changedSession => {
            if (changedSession) {
                this.getHistory(changedSession.uuid).then(history => {
                    if (!history.states) {
                        this.dirtyHistory = true;
                        this.extractHistory();
                    }
                })
            }
        });
    }

    private static saveRunnerLock = false;

    private static historyExtractionInterval: number = 10 * 60 * 1000;

    private startHistoryExtraction() {
        if (!MapStoreService.saveRunnerLock) {
            console.log("starting history extraction now...");
            MapStoreService.saveRunnerLock = true;
            setInterval(() => this.extractHistory(), MapStoreService.historyExtractionInterval);
        }
    }

    private ongoingHistoryExtraction = false;

    private extractHistory() {
        if (!this.ongoingHistoryExtraction) {
            this.ongoingHistoryExtraction = true;
            if (this.dirtyHistory && this.mostRecentMap && this.mostRecentSession) {
                console.log("There was a change - I'm extracting history...");
                this.addHistoryEntry().then(() => {
                    console.log("History persisted");
                    this.ongoingHistoryExtraction = false;
                });
            } else {
                this.ongoingHistoryExtraction = false;
            }
        } else {
            console.log("Skipping history extraction because there is already another one running...");
        }
    }

    private mostRecentMap: GeoJSON;
    private mostRecentSession: string;

    public saveMap(sessionId: string, currentMap: GeoJSON): Promise<any> {
        currentMap.timestamp = new Date().toISOString()
        this.mostRecentMap = currentMap;
        this.mostRecentSession = sessionId;
        return new Promise<any>(resolve => {
            let mapUpdate: Promise<any> = this.dbService.update(MapStoreService.STORE_MAP, this.mostRecentMap, this.mostRecentSession);
            mapUpdate.then(() => {
                this.dirtyMap = false;
                console.log("Saved to database");
                this.dirtyHistory = true;
                resolve(null);
            });
        });
    }

    private initHistory(history): any {
        return history ? history : {tags: {}, states: {}};
    }

    public removeTag(sessionId: string, key: string) {
        return new Promise<any>(resolve => {
            this.dbService.getByKey(MapStoreService.STORE_HISTORY, sessionId).then(history => {
                if (history && history.tags) {
                    delete history.tags[key];
                    this.dbService.update(MapStoreService.STORE_HISTORY, history, sessionId).then(() => resolve({}));
                }
            })
        });
    }

    public setTag(tag: string) {
        return new Promise<any>(resolve => {
            const sessionId = this.sharedState.getCurrentSession();
            let historyPromise: Promise<any>;
            if (sessionId.uuid === this.mostRecentSession && this.dirtyHistory) {
                historyPromise = this.addHistoryEntry();
            } else {
                historyPromise = this.dbService.getByKey(MapStoreService.STORE_HISTORY, sessionId.uuid);
            }
            historyPromise.then(history => {
                history = this.initHistory(history);
                if (history.states) {
                    let sortedKeys = Object.keys(history.states).sort();
                    if (sortedKeys.length > 0) {
                        history.tags[sortedKeys[sortedKeys.length - 1]] = tag;
                    }
                    this.dbService.update(MapStoreService.STORE_HISTORY, history, sessionId.uuid).then(() => resolve({}));
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

    private addHistoryEntry(): Promise<any> {
        return new Promise<any>(resolve => {
            this.dirtyHistory = false;
            //Keeping the values constant.
            const sessionId = this.mostRecentSession;
            const map = this.mostRecentMap;
            //We only add history entries, if there is a current active session is available and if we have already received a change in this session.
            if (sessionId && map && this.sharedState.getCurrentSession() && sessionId === this.sharedState.getCurrentSession().uuid) {
                this.dbService.getByKey(MapStoreService.STORE_HISTORY, sessionId).then(history => {
                    history = this.initHistory(history);
                    //TODO reduce history based on size (e.g. increase interval for long ago instances)
                    history.states[map.timestamp] = map;
                    this.dbService.update(MapStoreService.STORE_HISTORY, history, sessionId).then(() => resolve(history));
                })
            } else {
                resolve(null);
            }
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
            if (sessionId && key) {
                this.getHistory(sessionId).then(history => {
                    if (history) {
                        resolve(history.states[key]);
                    } else {
                        resolve(null);
                    }
                });
            } else {
                resolve(null);
            }
        });

    }

    public getHistory(sessionId: string): Promise<any> {
        return new Promise<any>(resolve => {
            this.dbService.getByKey(MapStoreService.STORE_HISTORY, sessionId).then(result => {
                resolve(this.initHistory(result));
            });
        });
    }

    public saveHistory(sessionId: string, payload: any): Promise<any> {
        return this.dbService.update(MapStoreService.STORE_HISTORY, payload, sessionId);
    }

}
