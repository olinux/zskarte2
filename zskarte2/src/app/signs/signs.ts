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
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "blue",
            src: "Absperrung Einsatzraum.png",
            de: "Absperrung Einsatzraum",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Absperrung Verkehrswege.png",
            de: "Absperrung Verkehrswege",
            text: null,
            style: null,
            example: null
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Achse fuer Ei, Rttg, Vsg.png",
            de: "Achse fuer Ei, Rttg, Vsg",
            style: "dash",
            text: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Angehoerigensammelstelle.png",
            de: "Angehoerigensammelstelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Atomunfall.png",
            de: "Atomunfall",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Autounfall_2.png",
            de: "Autounfall_2",
            text: null,
            style: null,
            example: null
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Beabsichtigte Erkundung.png",
            de: "Beabsichtigte Erkundung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Beabsichtigter Einsatz.png",
            de: "Beabsichtigter Einsatz",
            style: "dash",
            text: null,
            example: null
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Beabsichtigte Verschiebung.png",
            de: "Beabsichtigte Verschiebung",
            style: "dash",
            text: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Beobachtung.png",
            de: "Beobachtung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Beschaedigung.png",
            de: "Beschaedigung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Betreuungsstelle.png",
            de: "Betreuungsstelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Betriebsstoffabgabestelle.png",
            de: "Betriebsstoffabgabestelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Bezirksfuehrungsorgan.png",
            de: "Bezirksfuehrungsorgan",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "other",
            src: "Biologisch verseuchtes Gebiet.png",
            de: "Biologisch verseuchtes Gebiet",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Biounfall.png",
            de: "Biounfall",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "B Laboratorium.png",
            de: "B Laboratorium",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Bombenanschlag.png",
            de: "Bombenanschlag",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Bombendrohung.png",
            de: "Bombendrohung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Brandanschlag.png",
            de: "Brandanschlag",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Brand einzelnes Gebaeude Flamme.png",
            de: "Brand einzelnes Gebaeude Flamme",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Brand einzelnes Gebaeude - Signatur.png",
            de: "Brand einzelnes Gebaeude - Signatur",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Brand mehrerer Gebaeude - Signatur.png",
            de: "Brand mehrerer Gebaeude - Signatur",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Brand.png",
            de: "Brand",
            text: null,
            style: null,
            example: null
        },
        {
            type: "LineString",
            kat: "red",
            src: "Branduebergriff erfolgt - Signatur.png",
            de: "Branduebergriff erfolgt",
            example: "Branduebergriff erfolgt - Beispiel.png",
            text: null,
            style: null
        },
        {
            type: "LineString",
            kat: "red",
            src: "Branduebergriffsgefahr - Signatur.png",
            de: "Branduebergriffsgefahr - Signatur",
            example: "Branduebergriffsgefahr - Beispiel.png",
            style: "dash",
            text: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Brandzone Flaechenbrand.png",
            de: "Brandzone Flaechenbrand",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Chemieunfall.png",
            de: "Chemieunfall",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "other",
            src: "Chemievergiftetes Gebiet gasfoermig - fluechtig.png",
            de: "Chemievergiftetes Gebiet gasfoermig - fluechtig",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "other",
            src: "Chemievergiftete Zone fluessig - sesshaft.png",
            de: "Chemievergiftete Zone fluessig - sesshaft",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "orange",
            src: "Chemikalien.png",
            de: "Chemikalien",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Debriefingstelle.png",
            de: "Debriefingstelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Demo gewaltlos.png",
            de: "Demo gewaltlos",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Demo gewaltsam.png",
            de: "Demo gewaltsam",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Drohung.png",
            de: "Drohung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Duerre.png",
            de: "Duerre",
            text: null,
            style: null,
            example: null
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Durchgefuehrte Erkundung.png",
            de: "Durchgefuehrte Erkundung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Durchgefuehrter Einsatz.png",
            de: "Durchgefuehrter Einsatz",
            text: null,
            style: null,
            example: null
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Durchgefuehrte Verschiebung.png",
            de: "Durchgefuehrte Verschiebung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Eingesperrte - Abgeschnittene.png",
            de: "Eingesperrte - Abgeschnittene",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Einsatzleiter.png",
            de: "Einsatzleiter",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Einsatzleitung.png",
            de: "Einsatzleitung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Einsatzzentrale.png",
            de: "Einsatzzentrale",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Eisenbahnunglueck.png",
            de: "Eisenbahnunglueck",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "orange",
            src: "Elektrizitaet.png",
            de: "Elektrizitaet",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Energieausfall.png",
            de: "Energieausfall",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Epidemie.png",
            de: "Epidemie",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Erdbeben.png",
            de: "Erdbeben",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Erdrutsch.png",
            de: "Erdrutsch",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "orange",
            src: "Explosion.png",
            de: "Explosion",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Explosionsherd - Signatur.png",
            de: "Explosionsherd - Signatur",
            example: "Explosionsherd - Beispiel.png",
            text: null,
            style: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Fahrzeugplatz.png",
            de: "Fahrzeugplatz",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Fluechtlinge.png",
            de: "Fluechtlinge",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Flugzeugabsturz.png",
            de: "Flugzeugabsturz",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "orange",
            src: "Gas.png",
            de: "Gas",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Gebaeudeeinsturz.png",
            de: "Gebaeudeeinsturz",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "orange",
            src: "Gefahr durch Loeschen mit Wasser.png",
            de: "Gefahr durch Loeschen mit Wasser",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "orange",
            src: "Gefahrentafel mit UN-Nummer.png",
            de: "Gefahrentafel mit UN-Nummer",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "orange",
            src: "Gefahr fuer Grundwasser.png",
            de: "Gefahr fuer Grundwasser",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Gemeindefuehrungsorgan.png",
            de: "Gemeindefuehrungsorgan",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Gruppenfuehrer.png",
            de: "Gruppenfuehrer",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Gruppe.png",
            de: "Gruppe",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Helikopterlandeplatz.png",
            de: "Helikopterlandeplatz",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Informationsstelle.png",
            de: "Informationsstelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Informationszentrum.png",
            de: "Informationszentrum",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Infrastrukturschaden.png",
            de: "Infrastrukturschaden",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kadaversammelstelle.png",
            de: "Kadaversammelstelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Kanalisationsausfall.png",
            de: "Kanalisationsausfall",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kantonales Fuehrungsorgan.png",
            de: "Kantonales Fuehrungsorgan",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "KGS Sammelpunkt.png",
            de: "KGS Sammelpunkt",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kommandoposten Front.png",
            de: "Kommandoposten Front",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kommandoposten Rueckwaertiges.png",
            de: "Kommandoposten Rueckwaertiges",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Kommunikationsstoerung.png",
            de: "Kommunikationsstoerung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kompanie.png",
            de: "Kompanie",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kontrollstelle.png",
            de: "Kontrollstelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Kontrollzentrum.png",
            de: "Kontrollzentrum",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Lawine.png",
            de: "Lawine",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Massenpanik.png",
            de: "Massenpanik",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Materialdepot.png",
            de: "Materialdepot",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Mobile Einsatzzentrale.png",
            de: "Mobile Einsatzzentrale",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Obdachlose.png",
            de: "Obdachlose",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Oelverschmutzung.png",
            de: "Oelverschmutzung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Offizier - Zugfuehrer.png",
            de: "Offizier - Zugfuehrer",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Patientensammelstelle.png",
            de: "Patientensammelstelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: null,
            src: "Personenbergungsuebersicht - Leerraster.png",
            de: "Personenbergungsuebersicht - Leerraster",
            example: "Personenbergungsuebersicht - Beispiel.png",
            text: null,
            style: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Pforte.png",
            de: "Pforte",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Pluenderung.png",
            de: "Pluenderung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "other",
            src: "Radioaktives Gebiet.png",
            de: "Radioaktives Gebiet",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "orange",
            src: "Radioaktive Stoffe.png",
            de: "Radioaktive Stoffe",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Regionales Fuehrungsorgan.png",
            de: "Regionales Fuehrungsorgan",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Rutschgebiet.png",
            de: "Rutschgebiet",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Sabotage.png",
            de: "Sabotage",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Sammelstelle.png",
            de: "Sammelstelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Sanitaetshilfsstelle.png",
            de: "Sanitaetshilfsstelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Sanitaetsumladestelle.png",
            de: "Sanitaetsumladestelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Schadengebiet - Schadenraum.png",
            de: "Schadengebiet - Schadenraum",
            text: null,
            style: null,
            example: null
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Sperre.png",
            de: "Sperre",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Standort mobile Fuehrungsstelle.png",
            de: "Standort mobile Fuehrungsstelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Starkniederschlag.png",
            de: "Starkniederschlag",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Stau.png",
            de: "Stau",
            text: null,
            style: null,
            example: null
        },
        {
            type: "LineString",
            kat: "red",
            src: "Str erschwert befahrbar - begehbar.png",
            de: "Str erschwert befahrbar - begehbar",
            style: "dash",
            text: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Streugutsammelstelle.png",
            de: "Streugutsammelstelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "LineString",
            kat: "red",
            src: "Str nicht befahrbar - schwer begehbar.png",
            de: "Str nicht befahrbar - schwer begehbar",
            text: null,
            style: null,
            example: null
        },
        {
            type: "LineString",
            kat: "red",
            src: "Str unpassierbar - gesperrt.png",
            de: "Str unpassierbar - gesperrt",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Stuetzpunkt.png",
            de: "Stuetzpunkt",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Sturm.png",
            de: "Sturm",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Tankloeschfahrzeug.png",
            de: "Tankloeschfahrzeug",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Teilzerstoerung.png",
            de: "Teilzerstoerung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Terroranschlag.png",
            de: "Terroranschlag",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Tierseuche.png",
            de: "Tierseuche",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Totalzerstoerung.png",
            de: "Totalzerstoerung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Totensammelstelle.png",
            de: "Totensammelstelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Tote.png",
            de: "Tote",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Trinkwasserabgabestelle.png",
            de: "Trinkwasserabgabestelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Truemmerbereich - Signatur.png",
            de: "Truemmerbereich - Signatur",
            example: "Truemmerbereich - Beispiel.png",
            text: null,
            style: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Trupp.png",
            de: "Trupp",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Ueberschwemmtes Gebiet.png",
            de: "Ueberschwemmtes Gebiet",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Ueberschwemmung.png",
            de: "Ueberschwemmung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Ueberwachung.png",
            de: "Ueberwachung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "LineString",
            kat: "blue",
            src: "Umleitung.png",
            de: "Umleitung",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "orange",
            src: "Unfall.png",
            de: "Unfall",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Verkehrsposten.png",
            de: "Verkehrsposten",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Verletztennest.png",
            de: "Verletztennest",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Verletzte.png",
            de: "Verletzte",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Vermisste.png",
            de: "Vermisste",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Verpflegungsabgabestelle.png",
            de: "Verpflegungsabgabestelle",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "red",
            src: "Wasservsgausfall.png",
            de: "Wasserversorgungsausfall",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Wasserwerfer.png",
            de: "Wasserwerfer",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Polygon",
            kat: "red",
            src: "Zerstoerte Zone einer Ortschaft.png",
            de: "Zerstoerte Zone einer Ortschaft",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Ziviles Fuehrungsorgan.png",
            de: "Ziviles Fuehrungsorgan",
            text: null,
            style: null,
            example: null
        },
        {
            type: "Point",
            kat: "blue",
            src: "Zug.png",
            de: "Zug",
            text: null,
            style: null,
            example: null
        }
    ]
}