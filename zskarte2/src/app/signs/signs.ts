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
            kat: "blue",
            src: "ABC Dekontaminationsstelle.png",
            de: "ABC Dekontaminationsstelle",
            en: "ABC Dekontaminationsstelle",
            fr: "Place de décontamination"
        },
        {
            type: "Polygon",
            kat: "blue",
            src: "Absperrung Einsatzraum.png",
            de: "Absperrung Einsatzraum",
            en: "Absperrung Einsatzraum",
            fr: "Barrage du secteur d’engagement"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Absperrung Verkehrswege.png",
            de: "Absperrung Verkehrswege",
            en: "Absperrung Verkehrswege",
            fr: "Fermeture de la route"
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Achse fuer Ei, Rttg, Vsg.png",
            de: "Achse fuer Ei, Rttg, Vsg",
            en: "Achse fuer Ei, Rttg, Vsg",
            fr: "Axe d’engagement pour le sauvetage, l’approvisionnement, etc.",
            style: "dash"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Angehoerigensammelstelle.png",
            de: "Angehoerigensammelstelle",
            en: "Angehoerigensammelstelle",
            fr: "Poste collecteur pour les proches"
        },
        {
            type: "Point",
            kat: "red",
            src: "Atomunfall.png",
            de: "Atomunfall",
            en: "Atomunfall",
            fr: "Accident nucléaire"
        },
        {
            type: "Point",
            kat: "red",
            src: "Autounfall_2.png",
            de: "Autounfall",
            en: "Autounfall",
            fr: "Accident de circulation automobile"
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Beabsichtigte Erkundung.png",
            de: "Beabsichtigte Erkundung",
            en: "Beabsichtigte Erkundung",
            fr: "Exploration / Reconnaissances prévues"
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Beabsichtigter Einsatz.png",
            de: "Beabsichtigter Einsatz",
            en: "Beabsichtigter Einsatz",
            fr: "Engagements prévus",
            style: "dash",
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Beabsichtigte Verschiebung.png",
            de: "Beabsichtigte Verschiebung",
            en: "Beabsichtigte Verschiebung",
            fr: "Mouvements prévus",
            style: "dash"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Beobachtung.png",
            de: "Beobachtung",
            en: "Beobachtung",
            fr: "Observation"
        },
        {
            type: "Point",
            kat: "red",
            src: "Beschaedigung.png",
            de: "Beschädigung",
            en: "Beschädigung",
            fr: "Dégât"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Betreuungsstelle.png",
            de: "Betreuungsstelle",
            en: "Betreuungsstelle",
            fr: "Poste d’assistance"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Betriebsstoffabgabestelle.png",
            de: "Betriebsstoffabgabestelle",
            en: "Betriebsstoffabgabestelle",
            fr: "Station de carburant"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Bezirksfuehrungsorgan.png",
            de: "Bezirksfuehrungsorgan",
            en: "Bezirksfuehrungsorgan",
            fr: "Organe de conduite de district"
        },
        {
            type: "Polygon",
            kat: "other",
            src: "Biologisch verseuchtes Gebiet.png",
            de: "Biologisch verseuchtes Gebiet",
            en: "Biologisch verseuchtes Gebiet",
            fr: "Zone biologiquement contaminée"
        },
        {
            type: "Point",
            kat: "red",
            src: "Biounfall.png",
            de: "Biounfall",
            en: "Biounfall",
            fr: "Accident biologique"
        },
        {
            type: "Point",
            kat: "blue",
            src: "B Laboratorium.png",
            de: "B Laboratorium",
            en: "B Laboratorium",
            fr: "Laboratoire B"
        },
        {
            type: "Point",
            kat: "red",
            src: "Bombenanschlag.png",
            de: "Bombenanschlag",
            en: "Bombenanschlag",
            fr: "Attentat à la bombe"
        },
        {
            type: "Point",
            kat: "red",
            src: "Bombendrohung.png",
            de: "Bombendrohung",
            en: "Bombendrohung",
            fr: "Menace à la bombe"
        },
        {
            type: "Point",
            kat: "red",
            src: "Brandanschlag.png",
            de: "Brandanschlag",
            en: "Brandanschlag",
            fr: "Incendie criminel"
        },
        {
            type: "Point",
            kat: "red",
            src: "Brand einzelnes Gebaeude Flamme.png",
            de: "Brand einzelnes Gebaeude Flamme",
            en: "Brand einzelnes Gebaeude Flamme",
            fr: "Incendie isolé"
        },
        {
            type: "Point",
            kat: "red",
            src: "Brand.png",
            de: "Brand",
            en: "Brand",
            fr: "Incendie"
        },
        {
            type: "LineString",
            kat: "red",
            src: "Branduebergriff erfolgt - Signatur.png",
            de: "Brandübergriff erfolgt",
            en: "Brandübergriff erfolgt",
            fr: "Extension du feu",
            example: "Branduebergriff erfolgt - Beispiel.png"
        },
        {
            type: "LineString",
            kat: "red",
            src: "Branduebergriffsgefahr - Signatur.png",
            de: "Brandübergriffsgefahr",
            en: "Brandübergriffsgefahr",
            fr: "Danger d'extension",
            example: "Branduebergriffsgefahr - Beispiel.png",
            style: "dash"
        },
        {
            type: "Polygon",
            kat: "red",
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
            kat: "red",
            src: "Chemieunfall.png",
            de: "Chemieunfall",
            en: "Chemieunfall",
            fr: "Accident chimique"
        },
        {
            type: "Polygon",
            kat: "other",
            src: "Chemievergiftetes Gebiet gasfoermig - fluechtig.png",
            de: "Chemievergiftetes Gebiet gasförmig - flüchtig",
            en: "Chemievergiftetes Gebiet gasförmig - flüchtig",
            fr: "Zone chimiquement contaminée gazeux - volatil"
        },
        {
            type: "Polygon",
            kat: "other",
            src: "Chemievergiftete Zone fluessig - sesshaft.png",
            de: "Chemievergiftete Zone flüssig - sesshaft",
            en: "Chemievergiftete Zone flüssig - sesshaft",
            fr: "Zone chimiquement contaminée liquide"
        },
        {
            type: "Point",
            kat: "orange",
            src: "Chemikalien.png",
            de: "Chemikalien",
            en: "Chemikalien",
            fr: "Chimique"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Debriefingstelle.png",
            de: "Debriefingstelle",
            en: "Debriefingstelle",
            fr: "Poste de débriefing"
        },
        {
            type: "Point",
            kat: "red",
            src: "Demo gewaltlos.png",
            de: "Demo gewaltlos",
            en: "Demo gewaltlos",
            fr: "Manifestation"
        },
        {
            type: "Point",
            kat: "red",
            src: "Demo gewaltsam.png",
            de: "Demo gewaltsam",
            en: "Demo gewaltsam",
            fr: "Manifestation avec exactions"
        },
        {
            type: "Point",
            kat: "red",
            src: "Drohung.png",
            de: "Drohung",
            en: "Drohung",
            fr: "Menace"
        },
        {
            type: "Point",
            kat: "red",
            src: "Duerre.png",
            de: "Dürre",
            en: "Dürre",
            fr: "Sécheresse"
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Durchgefuehrte Erkundung.png",
            de: "Durchgeführte Erkundung",
            en: "Durchgeführte Erkundung",
            fr: "Exploration / Reconnaissances exécutées"
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Durchgefuehrter Einsatz.png",
            de: "Durchgeführter Einsatz",
            en: "Durchgeführter Einsatz",
            fr: "Engagements exécutés"
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Durchgefuehrte Verschiebung.png",
            de: "Durchgeführte Verschiebung",
            en: "Durchgeführte Verschiebung",
            fr: "Mouvements exécutés"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Eingesperrte - Abgeschnittene.png",
            de: "Eingesperrte - Abgeschnittene",
            en: "Eingesperrte - Abgeschnittene",
            fr: "Personnes enfermées ou retranchées"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Einsatzleiter.png",
            de: "Einsatzleiter",
            en: "Einsatzleiter",
            fr: "Chef d’intervention"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Einsatzleitung.png",
            de: "Einsatzleitung",
            en: "Einsatzleitung",
            fr: "Direction d’intervention"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Einsatzzentrale.png",
            de: "Einsatzzentrale",
            en: "Einsatzzentrale",
            fr: "Centrale d‘engagement"
        },
        {
            type: "Point",
            kat: "red",
            src: "Eisenbahnunglueck.png",
            de: "Eisenbahnunglück",
            en: "Eisenbahnunglück",
            fr: "Accident ferroviaire"
        },
        {
            type: "Point",
            kat: "orange",
            src: "Elektrizitaet.png",
            de: "Elektrizität",
            en: "Elektrizität",
            fr: "Electricité"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Energieausfall.png",
            de: "Energieausfall",
            en: "Energieausfall",
            fr: "Panne énergétique"
        },
        {
            type: "Point",
            kat: "red",
            src: "Epidemie.png",
            de: "Epidemie",
            en: "Epidemie",
            fr: "Epidemie"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Erdbeben.png",
            de: "Erdbeben",
            en: "Erdbeben",
            fr: "Tremblement de terre"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Erdrutsch.png",
            de: "Erdrutsch",
            en: "Erdrutsch",
            fr: "Glissement de terrain"
        },
        {
            type: "Point",
            kat: "orange",
            src: "Explosion.png",
            de: "Explosion",
            en: "Explosion",
            fr: "Explosion"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Explosionsherd - Signatur.png",
            de: "Explosionsherd",
            en: "Explosionsherd",
            fr: "Foyer d’explosion",
            example: "Explosionsherd - Beispiel.png"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Fahrzeugplatz.png",
            de: "Fahrzeugplatz",
            en: "Fahrzeugplatz",
            fr: "Place pour véhicules"
        },
        {
            type: "Point",
            kat: "red",
            src: "Fluechtlinge.png",
            de: "Flüchtlinge",
            en: "Flüchtlinge",
            fr: "Réfugiés"
        },
        {
            type: "Point",
            kat: "red",
            src: "Flugzeugabsturz.png",
            de: "Flugzeugabsturz",
            en: "Flugzeugabsturz",
            fr: "Catastrophe aérienne"
        },
        {
            type: "Point",
            kat: "orange",
            src: "Gas.png",
            de: "Gas",
            en: "Gas",
            fr: "Gaz"
        },
        {
            type: "Point",
            kat: "red",
            src: "Gebaeudeeinsturz.png",
            de: "Gebäudeeinsturz",
            en: "Gebäudeeinsturz",
            fr: "Immeuble effondré"
        },
        {
            type: "Point",
            kat: "orange",
            src: "Gefahr durch Loeschen mit Wasser.png",
            de: "Gefahr durch Löschen mit Wasser",
            en: "Gefahr durch Löschen mit Wasser",
            fr: "Danger en cas d'extinction avec de l'eau"
        },
        {
            type: "Point",
            kat: "orange",
            src: "Gefahrentafel mit UN-Nummer.png",
            de: "Gefahrentafel mit UN-Nummer",
            en: "Gefahrentafel mit UN-Nummer",
            fr: "Plaque de danger avec numéro ONU"
        },
        {
            type: "Point",
            kat: "orange",
            src: "Gefahr fuer Grundwasser.png",
            de: "Gefahr fuer Grundwasser",
            en: "Gefahr fuer Grundwasser",
            fr: "Danger pour les eaux de surface et/ou nappes souterraines"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Gemeindefuehrungsorgan.png",
            de: "Gemeindeführungsorgan",
            en: "Gemeindeführungsorgan",
            fr: "Organe de conduite communal"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Gruppenfuehrer.png",
            de: "Gruppenführer",
            en: "Gruppenführer",
            fr: "Chef de groupe"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Gruppe.png",
            de: "Gruppe",
            en: "Gruppe",
            fr: "Groupe"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Helikopterlandeplatz.png",
            de: "Helikopterlandeplatz",
            en: "Helikopterlandeplatz",
            fr: "Place d’atterrissage pour hélicoptère"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Informationsstelle.png",
            de: "Informationsstelle",
            en: "Informationsstelle",
            fr: "Point d’information"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Informationszentrum.png",
            de: "Informationszentrum",
            en: "Informationszentrum",
            fr: "Centre de presse"
        },
        {
            type: "Point",
            kat: "red",
            src: "Infrastrukturschaden.png",
            de: "Infrastrukturschaden",
            en: "Infrastrukturschaden",
            fr: "Dommages aux infrastructures"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kadaversammelstelle.png",
            de: "Kadaversammelstelle",
            en: "Kadaversammelstelle",
            fr: "Poste collecteur de cadavres d’animaux"
        },
        {
            type: "Point",
            kat: "red",
            src: "Kanalisationsausfall.png",
            de: "Kanalisationsausfall",
            en: "Kanalisationsausfall",
            fr: "Egoûts défectueux"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kantonales Fuehrungsorgan.png",
            de: "Kantonales Führungsorgan",
            en: "Kantonales Führungsorgan",
            fr: "Organe de conduite cantonal"
        },
        {
            type: "Point",
            kat: "blue",
            src: "KGS Sammelpunkt.png",
            de: "KGS Sammelpunkt",
            en: "KGS Sammelpunkt",
            fr: "Point de collecte PBC"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kommandoposten Front.png",
            de: "Kommandoposten Front",
            en: "Kommandoposten Front",
            fr: "PC engagement"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kommandoposten Rueckwaertiges.png",
            de: "Kommandoposten Rückwärtiges",
            en: "Kommandoposten Rückwärtiges",
            fr: "PC opérations"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Kommunikationsstoerung.png",
            de: "Kommunikationsstörung",
            en: "Kommunikationsstörung",
            fr: "Perturbation de la communication"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kompanie.png",
            de: "Kompanie",
            en: "Kompanie",
            fr: "Compagnie"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kontrollstelle.png",
            de: "Kontrollstelle",
            en: "Kontrollstelle",
            fr: "Point de contrôle"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kontrollzentrum.png",
            de: "Kontrollzentrum",
            en: "Kontrollzentrum",
            fr: "Centre de contrôle"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Lawine.png",
            de: "Lawine",
            en: "Lawine",
            fr: "Avalanche"
        },
        {
            type: "Point",
            kat: "red",
            src: "Massenpanik.png",
            de: "Massenpanik",
            en: "Massenpanik",
            fr: "Effets de panique"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Materialdepot.png",
            de: "Materialdepot",
            en: "Materialdepot",
            fr: "Dépôt de matériel"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Mobile Einsatzzentrale.png",
            de: "Mobile Einsatzzentrale",
            en: "Mobile Einsatzzentrale",
            fr: "Centrale d’engagement mobile"
        },
        {
            type: "Point",
            kat: "red",
            src: "Obdachlose.png",
            de: "Obdachlose",
            en: "Obdachlose",
            fr: "Sans-abri"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Oelverschmutzung.png",
            de: "Ölverschmutzung",
            en: "Ölverschmutzung",
            fr: "Pollution aux hydrocarbures"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Offizier - Zugfuehrer.png",
            de: "Offizier - Zugführer",
            en: "Offizier - Zugführer",
            fr: "Officier"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Patientensammelstelle.png",
            de: "Patientensammelstelle",
            en: "Patientensammelstelle",
            fr: "Poste collecteur de patients"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Pforte.png",
            de: "Pforte",
            en: "Pforte",
            fr: "Porte"
        },
        {
            type: "Point",
            kat: "red",
            src: "Pluenderung.png",
            de: "Plünderung",
            en: "Plünderung",
            fr: "Pillage"
        },
        {
            type: "Polygon",
            kat: "other",
            src: "Radioaktives Gebiet.png",
            de: "Radioaktives Gebiet",
            en: "Radioaktives Gebiet",
            fr: "Zone radioactive"
        },
        {
            type: "Point",
            kat: "orange",
            src: "Radioaktive Stoffe.png",
            de: "Radioaktive Stoffe",
            en: "Radioaktive Stoffe",
            fr: "Substances radioactives"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Regionales Fuehrungsorgan.png",
            de: "Regionales Führungsorgan",
            en: "Regionales Führungsorgan",
            fr: "Organe de conduite régional"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Rutschgebiet.png",
            de: "Rutschgebiet",
            en: "Rutschgebiet",
            fr: "Glissement de terrain"
        },
        {
            type: "Point",
            kat: "red",
            src: "Sabotage.png",
            de: "Sabotage",
            en: "Sabotage",
            fr: "Sabotage"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Sammelstelle.png",
            de: "Sammelstelle",
            en: "Sammelstelle",
            fr: "Poste collecteur"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Sanitaetshilfsstelle.png",
            de: "Sanitätshilfsstelle",
            en: "Sanitätshilfsstelle",
            fr: "Poste médical avancé"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Sanitaetsumladestelle.png",
            de: "Sanitätsumladestelle",
            en: "Sanitätsumladestelle",
            fr: "Poste sanitaire de transfert"
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Sperre.png",
            de: "Sperre",
            en: "Sperre",
            fr: "Barrage"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Standort mobile Fuehrungsstelle.png",
            de: "Standort mobile Führungsstelle",
            en: "Standort mobile Führungsstelle",
            fr: "Poste de conduite"
        },
        {
            type: "Point",
            kat: "red",
            src: "Starkniederschlag.png",
            de: "Starkniederschlag",
            en: "Starkniederschlag",
            fr: "Fortes précipitations"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Stau.png",
            de: "Stau",
            en: "Stau",
            fr: "Embouteillage"
        },
        {
            type: "LineString",
            kat: "red",
            src: "Str erschwert befahrbar - begehbar.png",
            de: "Strasse erschwert befahrbar - begehbar",
            en: "Strasse erschwert befahrbar - begehbar",
            fr: "Route difficilement praticable pour les vhc, possible pour les piétons",
            style: "dash"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Streugutsammelstelle.png",
            de: "Streugutsammelstelle",
            en: "Streugutsammelstelle",
            fr: "Poste collecteur des objets trouvés"
        },
        {
            type: "LineString",
            kat: "red",
            src: "Str nicht befahrbar - schwer begehbar.png",
            de: "Strasse nicht befahrbar - schwer begehbar",
            en: "Strasse nicht befahrbar - schwer begehbar",
            fr: "Route impraticable pour les vhc et difficile pour les piétons"
        },
        {
            type: "LineString",
            kat: "red",
            src: "Str unpassierbar - gesperrt.png",
            de: "Strasse unpassierbar - gesperrt",
            en: "Strasse unpassierbar - gesperrt",
            fr: "Route impraticable / barrée"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Stuetzpunkt.png",
            de: "Stützpunkt",
            en: "Stützpunkt",
            fr: "Point de sécurité"
        },
        {
            type: "Point",
            kat: "red",
            src: "Sturm.png",
            de: "Sturm",
            en: "Sturm",
            fr: "Tempête"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Tankloeschfahrzeug.png",
            de: "Tanklöschfahrzeug",
            en: "Tanklöschfahrzeug",
            fr: "Tonne-pompe"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Teilzerstoerung.png",
            de: "Teilzerstörung",
            en: "Teilzerstörung",
            fr: "Destruction partielle"
        },
        {
            type: "Point",
            kat: "red",
            src: "Terroranschlag.png",
            de: "Terroranschlag",
            en: "Terroranschlag",
            fr: "Acte de terrorisme"
        },
        {
            type: "Point",
            kat: "red",
            src: "Tierseuche.png",
            de: "Tierseuche",
            en: "Tierseuche",
            fr: "Epizootie"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Totalzerstoerung.png",
            de: "Totalzerstörung",
            en: "Totalzerstörung",
            fr: "Destruction totale"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Totensammelstelle.png",
            de: "Totensammelstelle",
            en: "Totensammelstelle",
            fr: "Poste collecteur de cadavres"
        },
        {
            type: "Point",
            kat: "red",
            src: "Tote.png",
            de: "Tote",
            en: "Tote",
            fr: "Morts"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Trinkwasserabgabestelle.png",
            de: "Trinkwasserabgabestelle",
            en: "Trinkwasserabgabestelle",
            fr: "Poste de distribution d’eau potable"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Trupp.png",
            de: "Trupp",
            en: "Trupp",
            fr: "Patrouille"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Ueberschwemmtes Gebiet.png",
            de: "Überschwemmtes Gebiet",
            en: "Überschwemmtes Gebiet",
            fr: "Zone inondée ou submergée"
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Ueberschwemmung.png",
            de: "Überschwemmung",
            en: "Überschwemmung",
            fr: "Inondation"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Ueberwachung.png",
            de: "Überwachung",
            en: "Überwachung",
            fr: "Surveillance"
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Umleitung.png",
            de: "Umleitung",
            en: "Umleitung",
            fr: "Déviations"
        },
        {
            type: "Point",
            kat: "orange",
            src: "Unfall.png",
            de: "Unfall",
            en: "Unfall",
            fr: "Accident"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Verkehrsposten.png",
            de: "Verkehrsposten",
            en: "Verkehrsposten",
            fr: "Poste de circulation"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Verletztennest.png",
            de: "Verletztennest",
            en: "Verletztennest",
            fr: "Nid de blessés"
        },
        {
            type: "Point",
            kat: "red",
            src: "Verletzte.png",
            de: "Verletzte",
            en: "Verletzte",
            fr: "Patients (blessés)"
        },
        {
            type: "Point",
            kat: "red",
            src: "Vermisste.png",
            de: "Vermisste",
            en: "Vermisste",
            fr: "Disparus"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Verpflegungsabgabestelle.png",
            de: "Verpflegungsabgabestelle",
            en: "Verpflegungsabgabestelle",
            fr: "Poste de distribution de subsistance"
        },
        {
            type: "Point",
            kat: "red",
            src: "Wasservsgausfall.png",
            de: "Wasserversorgungsausfall",
            en: "Wasserversorgungsausfall",
            fr: "Interruption de l’approvisionnement en eau"
        },
        {
            type: "Point",
            kat: "blue",
            src: "Wasserwerfer.png",
            de: "Wasserwerfer",
            en: "Wasserwerfer",
            fr: "Canon à eau"
        },
        {
            type: "Polygon",
            kat: "red",
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
            kat: "blue",
            src: "Zug.png",
            de: "Zug",
            en: "Zug",
            fr: "Section"
        }
    ]
}