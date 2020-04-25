import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PreferencesService} from "./preferences.service";

export const LOCALES: string[] = ["de", "fr", "en"];
export const DEFAULT_LOCALE: string = LOCALES[0];

@Injectable({
    providedIn: 'root'
})
export class I18NService {
    private _locale: string = DEFAULT_LOCALE;
    private localeSource = new BehaviorSubject<string>(null);
    public currentLocale = this.localeSource.asObservable();

    constructor(private preferences:PreferencesService) {
        this.locale = preferences.getLocale();
    }

    set locale(newLocale: string) {
        this._locale = newLocale ? newLocale : DEFAULT_LOCALE;
        if(this._locale) {
            this.preferences.setLocale(this._locale);
        }
        this.localeSource.next(this._locale);
    }

    get locale(): string {
        return this._locale;
    }

    public get(key: string): string {
        const element = I18NService.TRANSLATIONS[key];
        if (element) {
            const chosenLang = element[this.locale];
            if (chosenLang) {
                return chosenLang;
            } else {
                return element[DEFAULT_LOCALE];
            }
        }
        throw new Error("Was not able to find an entry in translation table for key " + key);
    }

    private static TRANSLATIONS = {
        symbol: {
            de: "Symbol",
            en: "Symbol",
            fr: "Symbole"
        },
        name: {
            de: "Name",
            en: "Name",
            fr: "Nom"
        },
        text: {
            de: "Text",
            en: "Text",
            fr: "Texte"
        },
        draw: {
            de: "Zeichnen",
            fr: "Dessiner",
            en: "Draw"
        },
        createOrLoad: {
            de: "Karte erstellen / laden",
            fr: "Créer / charger une carte",
            en: "Create / load map"
        },
        newMap: {
            de: "Neue Karte erstellen",
            en: "Create new map",
            fr: "Créer une nouvelle carte"
        },
        loadMap: {
            de: "Bestehende Karte laden",
            en: "Load existing map",
            fr: "Charger une carte existante"
        },
        copy: {
            de: "Kopie",
            fr: "Copie",
            en: "Copy"
        },
        importMap: {
            de: "Karte von Datei importieren",
            en: "Load map from file",
            fr: "Importer une carte à partir d'un fichier"
        },
        importMapConflict: {
            de: "Die zu importierende Karte existiert bereits. Möchten Sie sie ersetzen? Ansonsten wird eine Kopie angelegt.",
            fr: "La carte à importer existe déjà. Souhaitez-vous le remplacer ? Sinon, une copie est créée.",
            en: "The map to be imported already exists. Do you want to replace it? If not, a copy will be created."
        },
        deleteMap: {
            de: "Karte löschen",
            en: "Delete map",
            fr: "Supprimer la carte"
        },
        confirmDeleteMap: {
            de: "Wollen Sie diese Karte wirklich unwiederruflich löschen?",
            en: "Do you really want to delete this card irrevocably?",
            fr: "Voulez-vous vraiment supprimer cette carte de façon irrévocable ?"
        },
        editMap: {
            de: "Karteninformationen bearbeiten",
            en: "Edit map information",
            fr: "Modifier les informations de la carte"
        },
        downloadCurrentDrawing: {
            de: "Aktuelle Zeichnung herunterladen",
            fr: "Télécharger le dessin actuel",
            en: "Download the current drawing"
        },
        exportSession: {
            de: "Karte exportieren",
            en: "Export map",
            fr: "Exporter la carte"
        },
        withHistory:{
            de: "Mit History",
            en: "With history",
            fr: "Avec historique"
        },
        withoutHistory:{
            de: "Ohne History",
            en: "Without history",
            fr: "Sans historique"
        },
        cancel: {
            de: "Abbrechen",
            en: "Cancel",
            fr: "Annuler"
        },
        download: {
            de: "Herunterladen",
            en: "Download",
            fr: "Télécharger"
        },
        filter: {
            de: "Filter",
            en: "Filter",
            fr: "Filtre"
        },
        polygon: {
            de: "Polygon",
            en: "Polygon",
            fr: "Polygone"
        },
        circle: {
            de: "Kreis",
            en: "Circle",
            fr: "Cercle"
        },
        line: {
            de: "Linie",
            en: "Line",
            fr: "Ligne"
        },
        noFilter: {
            de: "Kein Filter",
            en: "No filter",
            fr: "Pas de filtre"
        },
        damage: {
            de: "Beschädigung",
            en: "Damage",
            fr: "Dommage"
        },
        danger: {
            de: "Gefahr",
            en: "Danger",
            fr: "Danger"
        },
        resources: {
            de: "Einsatzmittel",
            en: "Resources",
            fr: "Moyens"
        },
        findPlace: {
            de: "Ort finden",
            fr: "Trouver emplacement",
            en: "Find a place"
        },
        endHistoryMode: {
            de: "History-Modus beenden",
            fr: "Quitter le mode historique",
            en: "End history mode"
        },
        loadFromFile: {
            de: "Von Datei laden",
            fr: "Charger à partir du fichier",
            en: "Load from file"
        },
        importDrawing: {
            de: "Mit importierter Zeichnung ersetzen",
            fr: "Remplacer par un dessin importé",
            en: "Replace with imported drawing"
        },
        import:{
            de: "Importieren",
            fr: "Importer",
            en: "Import"
        },
        maps: {
            de: "Karten",
            fr: "Cartes",
            en: "Maps"
        },
        thematicMaps: {
            de: "Thematische Karten",
            fr: "Cartes thématiques",
            en: "Thematic maps"
        },
        rotate: {
            de: "Rotieren",
            fr: "Tourner",
            en: "Rotate"
        },
        opacity: {
            de: "Deckkraft",
            fr: "Opacité",
            en: "Opacity"
        },
        solidLine: {
            de: "Durchgezogen",
            fr: "Continue",
            en: "Solid"
        },
        dashedLine: {
            de: "Gestrichelt",
            en: "Dashed",
            fr: "Pointillée"
        },
        lineWidth: {
            de: "Linien-Dicke",
            en: "Line width",
            fr: "Largeur de ligne"
        },
        delete: {
            de: "Löschen",
            en: "Delete",
            fr: "Effacer"
        },
        ok: {
            de: "OK",
            en: "OK",
            fr: "OK"
        },
        yes: {
            de: "Ja",
            en: "Yes",
            fr: "Oui"
        },
        no: {
            de: "Nein",
            en: "No",
            fr: "Non"
        },
        yourText: {
            de: "Ihr Text",
            fr: "Votre texte",
            en: "Your text"
        },
        currentDrawing: {
            de: "Aktuelle Zeichnung",
            fr: "Dessin actuel",
            en: "Current drawing"
        },
        history: {
            de: "History anzeigen",
            fr: "Voir l'histoire",
            en: "Show history"
        },
        color: {
            de: "Farbe",
            fr: "Couleur",
            en: "Color"
        },
        drawHole: {
            de: "Loch zeichnen",
            fr: "Dessiner un trou",
            en: "Draw a hole"
        }
        ,
        sessionCreatorTitle: {
            de: "Willkommen bei ZSKarte 2!",
            fr: "Bienvenue à ZSKarte 2 !",
            en: "Welcome to ZSKarte 2!"
        },
        sessionCreatorInstructions: {
            de: "Bitte beachten Sie: Die Daten werden nur auf Ihrem Browser gehalten - sie werden nicht mit einem Server geteilt! Falls Sie die Karte mit anderen zusätzlich sichern oder teilen möchten, können Sie diese exportieren (und erneut importieren).<br/><br/> **Wichtig**: Wenn Sie Ihre Browserdaten löschen, so werden auch die gespeicherten Karten entfernt!",
            fr: "Remarque : les données sont uniquement conservées sur votre navigateur - elles ne sont pas partagées avec un serveur ! Si vous souhaitez enregistrer ou partager la carte avec d'autres personnes, vous pouvez exporter (et réimporter) la carte. <br/><br/>**Important**: Si vous supprimez les données de votre navigateur, les cartes enregistrées seront également supprimées.",
            en: "Please note: The data is only kept on your browser - it is not shared with a server! If you would like to additionally save or share the map with others, you can export (and re-import) the map.<br/><br/> **Important**: If you delete your browser data, the saved maps will also be removed"
        },
        zso:{
            de: "ZSO",
            fr: "PCi",
            en: "CPO"
        } ,
        sessionLoaderInstructions: {
            de: "Bitte beachten Sie: Wenn Sie eine Karte laden wird die bestehende nicht gelöscht - Sie können diese jederzeit hier wieder laden.",
            fr: "Remarque : lorsque vous chargez une carte, la carte existante n'est pas supprimée - vous pouvez la recharger ici à tout moment.",
            en: "Please note: When you load a map, the existing map is not deleted - you can reload it here at any time."
        },
        importSessionInstructions: {
            de: "Verwenden Sie eine **.zsjson** Datei um eine vollständige Karte zu importieren.",
            fr: "Utilisez un fichier **.zsjson** pour importer une carte complète.",
            en: "Use a **.zsjson** file to import a complete map."
        },
        confirmClearDrawing: {
            de: "Wollen Sie wirklich alle Elemente der Zeichnung entfernen? Die History der Karte bleibt dabei bestehen!",
            en: "Do you really want to clear all elements of this drawing? The history of the map will remain!",
            fr: "Voulez-vous vraiment supprimer tous les éléments du dessin ? L'histoire de la carte restera !"
        },
        confirmImportDrawing: {
            de: "Wollen Sie die entsprechende Zeichnung wirklich importieren? Die aktuelle Zeichnung wird dabei ersetzt, die History bleibt aber bestehen!",
            en: "Do you really want to import this drawing? The current drawing will be replaced - the history of the map will remain though!",
            fr: "Voulez-vous vraiment importer le dessin correspondant ? Le dessin actuel sera remplacé, mais l'histoire restera !"
        }
    }
    ;
}
