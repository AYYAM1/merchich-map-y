# MERCHICH MAP — prototype PWA

## Ce que fait cette version
- Ouvre la carte et tente de se centrer sur la position GPS.
- Permet de sélectionner un point par clic.
- Calcule X/Y en Merchich / Nord Maroc (EPSG:26191) ou Sud Maroc (EPSG:26192).
- Recherche un lieu au Maroc.
- Copie les coordonnées et exporte les points enregistrés en CSV.
- Peut être installée comme application web (PWA) sur téléphone et ordinateur.
-

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
