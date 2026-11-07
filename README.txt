# MERCHICH MAP — prototype PWA

## Ce que fait cette version
- Ouvre la carte et tente de se centrer sur la position GPS.
- Permet de sélectionner un point par clic.
- Calcule X/Y en Merchich / Nord Maroc (EPSG:26191) ou Sud Maroc (EPSG:26192).
- Recherche un lieu au Maroc.
- Copie les coordonnées et exporte les points enregistrés en CSV.
- Peut être installée comme application web (PWA) sur téléphone et ordinateur.
- Les points enregistrés sont conservés sur l'appareil (localStorage).

## Onglet « Gisement & implantation »
- Station A (point connu), référence R (orientation, facultative) et une ou plusieurs bornes B à rétablir.
- Calcule pour chaque borne : gisement A→B (Nord grille, sens horaire), distance, ΔX/ΔY.
- Avec R et la lecture faite sur R : V0 = G(A→R) − Lecture(R) et lecture à afficher = G(A→B) − V0.
- Contrôle : saisir la distance mesurée A→R pour voir l'écart en cm.
- Angles en grades, degrés décimaux ou degrés-minutes-secondes.
- Facteur d'échelle Lambert k calculé au droit de la station (Clarke 1880 IGN) + correction d'altitude :
  distance terrain = distance grille ÷ (k × R/(R+H)). Réglage visible « Ta station applique le facteur
  d'échelle ? » : Non (par défaut) = distances terrain, Oui = distances grille. L'effet est affiché en cm/100 m.
- Altitude du chantier : saisie ou bouton GPS (±50 m suffit).
- Zone Nord/Sud choisie automatiquement d'après le GPS (tant qu'elle n'est pas choisie à la main
  et qu'aucune station n'est saisie). Alertes : points hors de la zone choisie (avec suggestion de
  l'autre zone), GPS dans une autre zone que la fiche, point à plus de 2 km de la station.
- Saisie rapide : virgule ou point décimal, coller « X Y » dans un champ, ou coller une liste
  « Nom X Y » (une borne par ligne, copiée depuis Excel) pour créer plusieurs bornes d'un coup.
- 📍 place un point en touchant la carte (repérage seulement, ±7 m).
- Boutons « → Station A » / « → Nouvelle borne » dans l'onglet Repérage.
- Affichage A, R, bornes et visées sur la carte ; fiche copiable en texte ou exportable en CSV.
- Saisies conservées sur l'appareil ; le calcul fonctionne hors ligne une fois l'application chargée.

## Précision et limites importantes
- Le code utilise les définitions de projection EPSG:26191 et EPSG:26192 et l'opération de transformation EPSG:1166 (translations géocentriques +31, +146, +47 m).
- La précision publiée de l'opération EPSG:1166 est 7 m. Cela convient au repérage, pas au bornage, à l'implantation ou à la production cadastrale.
- La précision du point sélectionné dépend aussi de la position GPS, du fond cartographique et de son alignement.
- L'application affiche un avertissement hors de l'emprise publiée de l'opération EPSG:1166.
- Les coordonnées calculées ne constituent pas une validation ANCFCC ni un contrôle topographique.
- Le calcul fonctionne côté navigateur après chargement des bibliothèques. Les cartes et la recherche nécessitent une connexion ; les tuiles déjà consultées peuvent être mises en cache, sans garantie de couverture hors ligne.
- Les fonds Esri et OpenStreetMap restent soumis aux conditions d'utilisation de leurs fournisseurs.
- La recherche utilise Nominatim/OpenStreetMap. Respecter ses limites d'utilisation.

## Références
- EPSG:26191 — Merchich / Nord Maroc : https://epsg.io/26191
- EPSG:26192 — Merchich / Sud Maroc : https://epsg.io/26192
- EPSG:1166 — Merchich to WGS 84 (1), précision publiée 7 m : https://epsg.io/1166

Prototype fourni pour repérage. Vérifier tout résultat important sur des points de contrôle connus avant usage professionnel.
