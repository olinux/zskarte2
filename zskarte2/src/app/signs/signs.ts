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


import {Sign} from "../entity/sign";

export class Signs {

    public static SIGNS: Sign[] = [
        {
            type: "Point",
            color: "#0000FF",
            src: "ABC Dekontaminationsstelle.png",
            de: "ABC Dekontaminationsstelle",
            en: "ABC Dekontaminationsstelle",
            fr: "Place de décontamination"
        },
        {
            type: "Polygon",
            color: "#0000FF",
            src: "Absperrung Einsatzraum.png",
            de: "Absperrung Einsatzraum",
            en: "Absperrung Einsatzraum",
            fr: "Barrage du secteur d’engagement"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Absperrung Verkehrswege.png",
            de: "Absperrung Verkehrswege",
            en: "Absperrung Verkehrswege",
            fr: "Fermeture de la route"
        },
        {
            type: "LineString",
            color: "#0000FF",
            src: "Achse fuer Ei, Rttg, Vsg.png",
            de: "Achse für Ei, Rttg, Vsg",
            en: "Achse für Ei, Rttg, Vsg",
            fr: "Axe d’engagement pour le sauvetage, l’approvisionnement, etc.",
            style: "dash"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Angehoerigensammelstelle.png",
            de: "Angehörigensammelstelle",
            en: "Angehörigensammelstelle",
            fr: "Poste collecteur pour les proches"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Atomunfall.png",
            de: "Atomunfall",
            en: "Atomunfall",
            fr: "Accident nucléaire"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Autounfall_2.png",
            de: "Autounfall",
            en: "Autounfall",
            fr: "Accident de circulation automobile"
        },
        {
            type: "LineString",
            color: "#0000FF",
            src: "Beabsichtigte Erkundung.png",
            de: "Beabsichtigte Erkundung",
            en: "Beabsichtigte Erkundung",
            fr: "Exploration / Reconnaissances prévues"
        },
        {
            type: "LineString",
            color: "#0000FF",
            src: "Beabsichtigter Einsatz.png",
            de: "Beabsichtigter Einsatz",
            en: "Beabsichtigter Einsatz",
            fr: "Engagements prévus",
            style: "dash",
        },
        {
            type: "LineString",
            color: "#0000FF",
            src: "Beabsichtigte Verschiebung.png",
            de: "Beabsichtigte Verschiebung",
            en: "Beabsichtigte Verschiebung",
            fr: "Mouvements prévus",
            style: "dash"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Beobachtung.png",
            de: "Beobachtung",
            en: "Beobachtung",
            fr: "Observation"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Beschaedigung.png",
            de: "Beschädigung",
            en: "Beschädigung",
            fr: "Dégât"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Betreuungsstelle.png",
            de: "Betreuungsstelle",
            en: "Betreuungsstelle",
            fr: "Poste d’assistance"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Betriebsstoffabgabestelle.png",
            de: "Betriebsstoffabgabestelle",
            en: "Betriebsstoffabgabestelle",
            fr: "Station de carburant"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Bezirksfuehrungsorgan.png",
            de: "Bezirksführungsorgan",
            en: "Bezirksführungsorgan",
            fr: "Organe de conduite de district"
        },
        {
            type: "Polygon",
            color: "#948B68",
            src: "Biologisch verseuchtes Gebiet.png",
            de: "Biologisch verseuchtes Gebiet",
            en: "Biologisch verseuchtes Gebiet",
            fr: "Zone biologiquement contaminée"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Biounfall.png",
            de: "Biounfall",
            en: "Biounfall",
            fr: "Accident biologique"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "B Laboratorium.png",
            de: "B Laboratorium",
            en: "B Laboratorium",
            fr: "Laboratoire B"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Bombenanschlag.png",
            de: "Bombenanschlag",
            en: "Bombenanschlag",
            fr: "Attentat à la bombe"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Bombendrohung.png",
            de: "Bombendrohung",
            en: "Bombendrohung",
            fr: "Menace à la bombe"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Brandanschlag.png",
            de: "Brandanschlag",
            en: "Brandanschlag",
            fr: "Incendie criminel"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Brand einzelnes Gebaeude Flamme.png",
            de: "Brand einzelnes Gebäude Flamme",
            en: "Brand einzelnes Gebäude Flamme",
            fr: "Incendie isolé"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Brand.png",
            de: "Brand",
            en: "Brand",
            fr: "Incendie"
        },
        {
            type: "LineString",
            color: "#FF0000",
            src: "Branduebergriff erfolgt - Signatur.png",
            de: "Brandübergriff erfolgt",
            en: "Brandübergriff erfolgt",
            fr: "Extension du feu",
            example: "Branduebergriff erfolgt - Beispiel.png"
        },
        {
            type: "LineString",
            color: "#FF0000",
            src: "Branduebergriffsgefahr - Signatur.png",
            de: "Brandübergriffsgefahr",
            en: "Brandübergriffsgefahr",
            fr: "Danger d'extension",
            example: "Branduebergriffsgefahr - Beispiel.png",
            style: "dash"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Brandzone Flaechenbrand.png",
            de: "Brandzone Flächenbrand",
            en: "Brandzone Flächenbrand",
            fr: "Zone en feu",
            hideIcon: true,
            fillStyle: {
                name: "hatch",
                size: 1,
                spacing: 8
            },
            fillOpacity: 1
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Chemieunfall.png",
            de: "Chemieunfall",
            en: "Chemieunfall",
            fr: "Accident chimique"
        },
        {
            type: "Polygon",
            color: "#948B68",
            src: "Chemievergiftetes Gebiet gasfoermig - fluechtig.png",
            de: "Chemievergiftetes Gebiet gasförmig - flüchtig",
            en: "Chemievergiftetes Gebiet gasförmig - flüchtig",
            fr: "Zone chimiquement contaminée gazeux - volatil"
        },
        {
            type: "Polygon",
            color: "#948B68",
            src: "Chemievergiftete Zone fluessig - sesshaft.png",
            de: "Chemievergiftete Zone flüssig - sesshaft",
            en: "Chemievergiftete Zone flüssig - sesshaft",
            fr: "Zone chimiquement contaminée liquide"
        },
        {
            type: "Point",
            color: "#FF9100",
            src: "Chemikalien.png",
            de: "Chemikalien",
            en: "Chemikalien",
            fr: "Chimique"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Debriefingstelle.png",
            de: "Debriefingstelle",
            en: "Debriefingstelle",
            fr: "Poste de débriefing"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Demo gewaltlos.png",
            de: "Demo gewaltlos",
            en: "Demo gewaltlos",
            fr: "Manifestation"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Demo gewaltsam.png",
            de: "Demo gewaltsam",
            en: "Demo gewaltsam",
            fr: "Manifestation avec exactions"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Drohung.png",
            de: "Drohung",
            en: "Drohung",
            fr: "Menace"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Duerre.png",
            de: "Dürre",
            en: "Dürre",
            fr: "Sécheresse"
        },
        {
            type: "LineString",
            color: "#0000FF",
            src: "Durchgefuehrte Erkundung.png",
            de: "Durchgeführte Erkundung",
            en: "Durchgeführte Erkundung",
            fr: "Exploration / Reconnaissances exécutées"
        },
        {
            type: "LineString",
            color: "#0000FF",
            src: "Durchgefuehrter Einsatz.png",
            de: "Durchgeführter Einsatz",
            en: "Durchgeführter Einsatz",
            fr: "Engagements exécutés"
        },
        {
            type: "LineString",
            color: "#0000FF",
            src: "Durchgefuehrte Verschiebung.png",
            de: "Durchgeführte Verschiebung",
            en: "Durchgeführte Verschiebung",
            fr: "Mouvements exécutés"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Eingesperrte - Abgeschnittene.png",
            de: "Eingesperrte - Abgeschnittene",
            en: "Eingesperrte - Abgeschnittene",
            fr: "Personnes enfermées ou retranchées"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Einsatzleiter.png",
            de: "Einsatzleiter",
            en: "Einsatzleiter",
            fr: "Chef d’intervention"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Einsatzleitung.png",
            de: "Einsatzleitung",
            en: "Einsatzleitung",
            fr: "Direction d’intervention"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Einsatzzentrale.png",
            de: "Einsatzzentrale",
            en: "Einsatzzentrale",
            fr: "Centrale d‘engagement"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Eisenbahnunglueck.png",
            de: "Eisenbahnunglück",
            en: "Eisenbahnunglück",
            fr: "Accident ferroviaire"
        },
        {
            type: "Point",
            color: "#FF9100",
            src: "Elektrizitaet.png",
            de: "Elektrizität",
            en: "Elektrizität",
            fr: "Electricité"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Energieausfall.png",
            de: "Energieausfall",
            en: "Energieausfall",
            fr: "Panne énergétique"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Epidemie.png",
            de: "Epidemie",
            en: "Epidemie",
            fr: "Epidemie"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Erdbeben.png",
            de: "Erdbeben",
            en: "Erdbeben",
            fr: "Tremblement de terre"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Erdrutsch.png",
            de: "Erdrutsch",
            en: "Erdrutsch",
            fr: "Glissement de terrain"
        },
        {
            type: "Point",
            color: "#FF9100",
            src: "Explosion.png",
            de: "Explosion",
            en: "Explosion",
            fr: "Explosion"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Explosionsherd - Signatur.png",
            de: "Explosionsherd",
            en: "Explosionsherd",
            fr: "Foyer d’explosion",
            example: "Explosionsherd - Beispiel.png"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Fahrzeugplatz.png",
            de: "Fahrzeugplatz",
            en: "Fahrzeugplatz",
            fr: "Place pour véhicules"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Fluechtlinge.png",
            de: "Flüchtlinge",
            en: "Flüchtlinge",
            fr: "Réfugiés"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Flugzeugabsturz.png",
            de: "Flugzeugabsturz",
            en: "Flugzeugabsturz",
            fr: "Catastrophe aérienne"
        },
        {
            type: "Point",
            color: "#FF9100",
            src: "Gas.png",
            de: "Gas",
            en: "Gas",
            fr: "Gaz"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Gebaeudeeinsturz.png",
            de: "Gebäudeeinsturz",
            en: "Gebäudeeinsturz",
            fr: "Immeuble effondré"
        },
        {
            type: "Point",
            color: "#FF9100",
            src: "Gefahr durch Loeschen mit Wasser.png",
            de: "Gefahr durch Löschen mit Wasser",
            en: "Gefahr durch Löschen mit Wasser",
            fr: "Danger en cas d'extinction avec de l'eau"
        },
        {
            type: "Point",
            color: "#FF9100",
            src: "Gefahrentafel mit UN-Nummer.png",
            de: "Gefahrentafel mit UN-Nummer",
            en: "Gefahrentafel mit UN-Nummer",
            fr: "Plaque de danger avec numéro ONU"
        },
        {
            type: "Point",
            color: "#FF9100",
            src: "Gefahr fuer Grundwasser.png",
            de: "Gefahr für Grundwasser",
            en: "Gefahr für Grundwasser",
            fr: "Danger pour les eaux de surface et/ou nappes souterraines"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Gemeindefuehrungsorgan.png",
            de: "Gemeindeführungsorgan",
            en: "Gemeindeführungsorgan",
            fr: "Organe de conduite communal"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Gruppenfuehrer.png",
            de: "Gruppenführer",
            en: "Gruppenführer",
            fr: "Chef de groupe"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Gruppe.png",
            de: "Gruppe",
            en: "Gruppe",
            fr: "Groupe"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Helikopterlandeplatz.png",
            de: "Helikopterlandeplatz",
            en: "Helikopterlandeplatz",
            fr: "Place d’atterrissage pour hélicoptère"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Informationsstelle.png",
            de: "Informationsstelle",
            en: "Informationsstelle",
            fr: "Point d’information"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Informationszentrum.png",
            de: "Informationszentrum",
            en: "Informationszentrum",
            fr: "Centre de presse"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Infrastrukturschaden.png",
            de: "Infrastrukturschaden",
            en: "Infrastrukturschaden",
            fr: "Dommages aux infrastructures"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Kadaversammelstelle.png",
            de: "Kadaversammelstelle",
            en: "Kadaversammelstelle",
            fr: "Poste collecteur de cadavres d’animaux"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Kanalisationsausfall.png",
            de: "Kanalisationsausfall",
            en: "Kanalisationsausfall",
            fr: "Egoûts défectueux"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Kantonales Fuehrungsorgan.png",
            de: "Kantonales Führungsorgan",
            en: "Kantonales Führungsorgan",
            fr: "Organe de conduite cantonal"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "KGS Sammelpunkt.png",
            de: "KGS Sammelpunkt",
            en: "KGS Sammelpunkt",
            fr: "Point de collecte PBC"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "KGS Notdepot.png",
            de: "KGS Notdepot",
            en: "KGS Notdepot",
            fr: "Dépôt d’urgence PBC"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "KGS Notlager.png",
            de: "KGS Notlager",
            en: "KGS Notlager",
            fr: "Entrepôt d’urgence PBC"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Kommandoposten Front.png",
            de: "Kommandoposten Front",
            en: "Kommandoposten Front",
            fr: "PC engagement"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Kommandoposten Rueckwaertiges.png",
            de: "Kommandoposten Rückwärtiges",
            en: "Kommandoposten Rückwärtiges",
            fr: "PC opérations"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Kommunikationsstoerung.png",
            de: "Kommunikationsstörung",
            en: "Kommunikationsstörung",
            fr: "Perturbation de la communication"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Kompanie.png",
            de: "Kompanie",
            en: "Kompanie",
            fr: "Compagnie"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Kontrollstelle.png",
            de: "Kontrollstelle",
            en: "Kontrollstelle",
            fr: "Point de contrôle"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Kontrollzentrum.png",
            de: "Kontrollzentrum",
            en: "Kontrollzentrum",
            fr: "Centre de contrôle"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Lawine.png",
            de: "Lawine",
            en: "Lawine",
            fr: "Avalanche"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Massenpanik.png",
            de: "Massenpanik",
            en: "Massenpanik",
            fr: "Effets de panique"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Materialdepot.png",
            de: "Materialdepot",
            en: "Materialdepot",
            fr: "Dépôt de matériel"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Mobile Einsatzzentrale.png",
            de: "Mobile Einsatzzentrale",
            en: "Mobile Einsatzzentrale",
            fr: "Centrale d’engagement mobile"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Obdachlose.png",
            de: "Obdachlose",
            en: "Obdachlose",
            fr: "Sans-abri"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Oelverschmutzung.png",
            de: "Ölverschmutzung",
            en: "Ölverschmutzung",
            fr: "Pollution aux hydrocarbures"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Offizier - Zugfuehrer.png",
            de: "Offizier - Zugführer",
            en: "Offizier - Zugführer",
            fr: "Officier"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Patientensammelstelle.png",
            de: "Patientensammelstelle",
            en: "Patientensammelstelle",
            fr: "Poste collecteur de patients"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Pforte.png",
            de: "Pforte",
            en: "Pforte",
            fr: "Porte"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Pluenderung.png",
            de: "Plünderung",
            en: "Plünderung",
            fr: "Pillage"
        },
        {
            type: "Polygon",
            color: "#948B68",
            src: "Radioaktives Gebiet.png",
            de: "Radioaktives Gebiet",
            en: "Radioaktives Gebiet",
            fr: "Zone radioactive"
        },
        {
            type: "Point",
            color: "#FF9100",
            src: "Radioaktive Stoffe.png",
            de: "Radioaktive Stoffe",
            en: "Radioaktive Stoffe",
            fr: "Substances radioactives"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Regionales Fuehrungsorgan.png",
            de: "Regionales Führungsorgan",
            en: "Regionales Führungsorgan",
            fr: "Organe de conduite régional"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Rutschgebiet.png",
            de: "Rutschgebiet",
            en: "Rutschgebiet",
            fr: "Glissement de terrain"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Sabotage.png",
            de: "Sabotage",
            en: "Sabotage",
            fr: "Sabotage"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Sammelstelle.png",
            de: "Sammelstelle",
            en: "Sammelstelle",
            fr: "Poste collecteur"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Sanitaetshilfsstelle.png",
            de: "Sanitätshilfsstelle",
            en: "Sanitätshilfsstelle",
            fr: "Poste médical avancé"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Sanitaetsumladestelle.png",
            de: "Sanitätsumladestelle",
            en: "Sanitätsumladestelle",
            fr: "Poste sanitaire de transfert"
        },
        {
            type: "LineString",
            color: "#0000FF",
            src: "Sperre.png",
            de: "Sperre",
            en: "Sperre",
            fr: "Barrage"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Standort mobile Fuehrungsstelle.png",
            de: "Standort mobile Führungsstelle",
            en: "Standort mobile Führungsstelle",
            fr: "Poste de conduite"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Starkniederschlag.png",
            de: "Starkniederschlag",
            en: "Starkniederschlag",
            fr: "Fortes précipitations"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Stau.png",
            de: "Stau",
            en: "Stau",
            fr: "Embouteillage"
        },
        {
            type: "LineString",
            color: "#FF0000",
            src: "Str erschwert befahrbar - begehbar.png",
            de: "Strasse erschwert befahrbar - begehbar",
            en: "Strasse erschwert befahrbar - begehbar",
            fr: "Route difficilement praticable pour les vhc, possible pour les piétons",
            style: "dash"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Streugutsammelstelle.png",
            de: "Streugutsammelstelle",
            en: "Streugutsammelstelle",
            fr: "Poste collecteur des objets trouvés"
        },
        {
            type: "LineString",
            color: "#FF0000",
            src: "Str nicht befahrbar - schwer begehbar.png",
            de: "Strasse nicht befahrbar - schwer begehbar",
            en: "Strasse nicht befahrbar - schwer begehbar",
            fr: "Route impraticable pour les vhc et difficile pour les piétons"
        },
        {
            type: "LineString",
            color: "#FF0000",
            src: "Str unpassierbar - gesperrt.png",
            de: "Strasse unpassierbar - gesperrt",
            en: "Strasse unpassierbar - gesperrt",
            fr: "Route impraticable / barrée"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Stuetzpunkt.png",
            de: "Stützpunkt",
            en: "Stützpunkt",
            fr: "Point de sécurité"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Sturm.png",
            de: "Sturm",
            en: "Sturm",
            fr: "Tempête"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Tankloeschfahrzeug.png",
            de: "Tanklöschfahrzeug",
            en: "Tanklöschfahrzeug",
            fr: "Tonne-pompe"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Teilzerstoerung.png",
            de: "Teilzerstörung",
            en: "Teilzerstörung",
            fr: "Destruction partielle"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Terroranschlag.png",
            de: "Terroranschlag",
            en: "Terroranschlag",
            fr: "Acte de terrorisme"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Tierseuche.png",
            de: "Tierseuche",
            en: "Tierseuche",
            fr: "Epizootie"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Totalzerstoerung.png",
            de: "Totalzerstörung",
            en: "Totalzerstörung",
            fr: "Destruction totale"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Totensammelstelle.png",
            de: "Totensammelstelle",
            en: "Totensammelstelle",
            fr: "Poste collecteur de cadavres"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Tote.png",
            de: "Tote",
            en: "Tote",
            fr: "Morts"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Trinkwasserabgabestelle.png",
            de: "Trinkwasserabgabestelle",
            en: "Trinkwasserabgabestelle",
            fr: "Poste de distribution d’eau potable"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Trupp.png",
            de: "Trupp",
            en: "Trupp",
            fr: "Patrouille"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Ueberschwemmtes Gebiet.png",
            de: "Überschwemmtes Gebiet",
            en: "Überschwemmtes Gebiet",
            fr: "Zone inondée ou submergée"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Ueberschwemmung.png",
            de: "Überschwemmung",
            en: "Überschwemmung",
            fr: "Inondation"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Ueberwachung.png",
            de: "Überwachung",
            en: "Überwachung",
            fr: "Surveillance"
        },
        {
            type: "LineString",
            color: "#0000FF",
            src: "Umleitung.png",
            de: "Umleitung",
            en: "Umleitung",
            fr: "Déviations"
        },
        {
            type: "Point",
            color: "#FF9100",
            src: "Unfall.png",
            de: "Unfall",
            en: "Unfall",
            fr: "Accident"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Verkehrsposten.png",
            de: "Verkehrsposten",
            en: "Verkehrsposten",
            fr: "Poste de circulation"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Verletztennest.png",
            de: "Verletztennest",
            en: "Verletztennest",
            fr: "Nid de blessés"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Verletzte.png",
            de: "Verletzte",
            en: "Verletzte",
            fr: "Patients (blessés)"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Vermisste.png",
            de: "Vermisste",
            en: "Vermisste",
            fr: "Disparus"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Verpflegungsabgabestelle.png",
            de: "Verpflegungsabgabestelle",
            en: "Verpflegungsabgabestelle",
            fr: "Poste de distribution de subsistance"
        },
        {
            type: "Point",
            color: "#FF0000",
            src: "Wasservsgausfall.png",
            de: "Wasserversorgungsausfall",
            en: "Wasserversorgungsausfall",
            fr: "Interruption de l’approvisionnement en eau"
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Wasserwerfer.png",
            de: "Wasserwerfer",
            en: "Wasserwerfer",
            fr: "Canon à eau"
        },
        {
            type: "Polygon",
            color: "#FF0000",
            src: "Zerstoerte Zone einer Ortschaft.png",
            de: "Zerstörte Zone einer Ortschaft",
            en: "Zerstörte Zone einer Ortschaft",
            fr: "Zone sinistrée, impraticable à l’intérieur d’une localité",
            hideIcon: true,
            fillStyle: {
                name: "cross",
                size: 1,
                spacing: 8
            },
            fillOpacity: 1
        },
        {
            type: "Point",
            color: "#0000FF",
            src: "Zug.png",
            de: "Zug",
            en: "Zug",
            fr: "Section"
        }
    ]
}