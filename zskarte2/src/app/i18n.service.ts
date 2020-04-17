import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Layer} from "./layers/layer";

@Injectable({
  providedIn: 'root'
})
export class I18NService {

  public LOCALES:string[] = ["de", "fr", "en"];
  private _locale:string = this.LOCALES[0];
  private localeSource = new BehaviorSubject<string>(null);
  public currentLocale = this.localeSource.asObservable();


  constructor() {
    let storedLocale = localStorage.getItem("locale");
    if(storedLocale!==undefined && storedLocale!==null){
      this.locale = storedLocale;
    }
  }

  set locale(newLocale:string){
    this._locale = newLocale;
    localStorage.setItem("locale", newLocale)
    this.localeSource.next(newLocale);
  }

  get locale(): string{
    return this._locale;
  }

  public get(key:string):string{
    const element = I18NService.TRANSLATIONS[key];
    if(element!==null){
      const chosenLang = element[this.locale];
      if(chosenLang!==null){
        return chosenLang;
      }
      else{
        return element[this.LOCALES[0]];
      }
    }
    throw new Error("Was not able to find an entry in translation table for key "+key);
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
    zsoBernPlus: {
      de: "ZSO Bern Plus",
      fr: "ZSO Bern Plus",
      en: "ZSO Bern Plus"
    },
    downloadCurrentState:{
      de: "Aktuellen Stand herunterladen",
      fr: "Télécharger le statut actuel",
      en: "Download the current state"
    },
    withHistory: {
      de: "Mit History",
      en: "With history",
      fr: "Avec histoire"
    },
    withoutHistory: {
      de: "Ohne History",
      en: "Without history",
      fr: "Sans histoire"
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
    filter:{
      de: "Filter",
      en: "Filter",
      fr: "Filtre"
    },
    polygon:{
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
    thematicMaps:{
      de: "Thematische Karten",
      fr: "Cartes thématiques",
      en: "Thematic maps"
    },
    rotate:{
      de: "Rotieren",
      fr: "Tourner",
      en: "Rotate"
    },
    opacity:{
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
    ok:{
      de: "OK",
      en: "OK",
      fr: "OK"
    },
    yourText:{
      de: "Ihr Text",
      fr: "Votre texte",
      en: "Your text"
    },
    tools: {
      de: "Tools",
      fr: "Outils",
      en: "Tools"
    },
    history: {
      de: "History",
      fr: "Histoire",
      en: "History"
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

  }
  ;
}
