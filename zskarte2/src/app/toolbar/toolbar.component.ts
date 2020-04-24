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

import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DrawlayerComponent} from '../drawlayer/drawlayer.component';
import {HistoryComponent} from "../history/history.component";
import {SharedStateService} from "../shared-state.service";
import {I18NService} from "../i18n.service";
import {Session} from "../entity/session";
import {SessionCreatorComponent} from "../session-creator/session-creator.component";
import {MatDialog} from "@angular/material/dialog";
import {PreferencesService} from "../preferences.service";
import {SessionsService} from "../sessions.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ImportDialogComponent} from "../import-dialog/import-dialog.component";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {MapStoreService} from "../map-store.service";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    @Input() drawLayer: DrawlayerComponent;
    @Input() history: HistoryComponent;
    session: Session;
    downloadData = null;
    downloadTime:string = new Date().toISOString();

    constructor(private sanitizer: DomSanitizer, public i18n: I18NService, private cdr: ChangeDetectorRef, private sharedState: SharedStateService, public dialog: MatDialog, private preferences: PreferencesService, private sessions: SessionsService, private mapStore: MapStoreService) {
    }

    getDownloadFileName(){
        return "zskarte_"+this.sharedState.getCurrentSession().uuid+"_"+this.downloadTime+".zsjson";
    }

    ngOnInit() {
        this.sharedState.session.subscribe(s => {
            this.session = s;
            if (s) {
                this.preferences.setLastSessionId(s.uuid);
            }
        })
        let lastSession = this.preferences.getLastSessionId();
        if (lastSession) {
            let session = this.sessions.getSession(lastSession)
            if (session) {
                this.sharedState.loadSession(JSON.parse(session));
                return;
            }
        }
        this.createInitialSession();
    }

    private createInitialSession(){
        this.dialog.open(SessionCreatorComponent, {
            disableClose: true,
            width: '80vw',
            maxWidth: '80vw'
        })
    }

    createOrLoadSession() {
        this.dialog.open(SessionCreatorComponent,{
            data: {
                session: this.session,
                edit: false
            },
            width: '80vw',
            maxWidth: '80vw'
        });
    }


    editSession() {
        this.dialog.open(SessionCreatorComponent, {
            data: {
                session: this.session,
                edit: true
            },
            width: '80vw',
            maxWidth: '80vw'
        })
    }

    deleteSession():void{
        if(this.session) {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                data: this.i18n.get('confirmDeleteMap')
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.mapStore.removeMap(this.session.uuid, true);
                    this.sessions.removeSession(this.session.uuid);
                    this.preferences.removeSessionSpecificPreferences(this.session.uuid);
                    this.sharedState.loadSession(null);
                    this.createInitialSession();
                }
            })
        }
    }

    importSession(): void {
        const dialogRef = this.dialog.open(ImportDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.drawLayer.loadFromString(result);
        });
    }

    exportSession(withHistory:boolean): void {
        this.downloadTime = new Date().toISOString()
        this.downloadData = this.sanitizer.bypassSecurityTrustUrl(this.drawLayer.toDataUrl(true, withHistory));
    }

    toggleHistory(): void {
        this.drawLayer.save();
        this.history.toggleHistoryMode();
    }
}
