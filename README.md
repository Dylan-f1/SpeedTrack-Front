# SpeedTrack — Frontend

Plateforme gratuite pour découvrir la Formule 1 et son histoire : pilotes, écuries,
circuits, saisons, résultats et règlements, de 1950 à aujourd'hui.

**En ligne** : https://speed-track-front.vercel.app

Ce dépôt contient le frontend Next.js. Les données viennent de l'API SpeedTrack
(Node.js / Express / MongoDB Atlas), à lancer à côté.

## Stack

| Couche | Techno |
|---|---|
| Framework | Next.js 16 (App Router, Server Components) |
| UI | React 19, Tailwind CSS v4 |
| Polices | Geist via `next/font` |
| Drapeaux | `react-country-flag` (SVG, pour un rendu correct sous Windows) |
| Qualité | ESLint (`eslint-config-next`), Prettier |
| Hébergement | Vercel |

## Démarrage

Prérequis : Node.js 20.9+ et l'API SpeedTrack lancée en local (port 5000 par défaut).

```bash
npm install
```

Crée un fichier `.env.local` à la racine du dépôt :

```
API_URL=http://localhost:5000/api
```

Puis lance le serveur de développement :

```bash
npm run dev
```

Le site est ensuite disponible sur http://localhost:3000.

### Variables d'environnement

| Variable | Rôle | Exemple |
|---|---|---|
| `API_URL` | URL de base de l'API SpeedTrack | `http://localhost:5000/api` |

`API_URL` n'est volontairement pas préfixée `NEXT_PUBLIC_` : tous les appels à l'API se
font côté serveur (Server Components), l'URL n'a donc pas à être exposée au navigateur.
Sur Vercel, elle se configure dans les variables d'environnement du projet.

### Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lance le build de production |
| `npm run lint` | ESLint sur tout le projet |
| `npm run format` | Formate le code avec Prettier |
| `npm run format:check` | Vérifie le formatage sans modifier |

`npm run dev` utilise webpack et monte la mémoire allouée à Node à 4 Go : le serveur de
dev par défaut saturait la RAM sur certaines machines.

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil et accès rapide aux sections |
| `/drivers` | Annuaire des pilotes : recherche, filtres (actifs, anciens, champions), pagination |
| `/drivers/[slug]` | Fiche pilote : photo, biographie, parcours, statistiques de carrière, frise des écuries |
| `/teams` | Liste des écuries |
| `/teams/[slug]` | Fiche écurie : histoire, team principals, personnalités, lignée, pilotes par année |
| `/circuits` | Liste des circuits |
| `/circuits/[slug]` | Fiche circuit : caractéristiques et historique des tracés |
| `/seasons` | Liste des saisons |
| `/seasons/[year]` | Saison : classements et calendrier |
| `/races` | Grands Prix de la saison en cours |
| `/races/[year]/[round]` | Résultats d'une course et des qualifications |
| `/regulations` | Grandes ères réglementaires |
| `/regulations/[era]` | Détail d'une ère réglementaire |

## Structure

```
app/            Routes (App Router) : une page par dossier
components/
  layout/       Header, Footer, navigation
  drivers/      Cartes, grille, recherche et filtres pilotes
  teams/        Cartes écuries
  circuits/     Cartes circuits
  ui/           Composants partagés (Flag, Pagination)
lib/
  api.js        Client de l'API SpeedTrack
  utils.js      Formatage (dates, temps au tour), helpers
public/         Fichiers statiques
```

## Conventions

Les conventions de code (nommage, style, lisibilité) sont décrites dans `CLAUDE.md`.
En résumé : composants `.jsx` en PascalCase, pas de point-virgule, single quotes,
2 espaces, `'use client'` uniquement quand c'est nécessaire.

Workflow Git :

```
main          production (déployée sur Vercel)
dev           intégration
feature/xxx   nouvelles fonctionnalités, depuis dev
fix/xxx       corrections, depuis dev
```

Format des commits : `[ADD | UPDATE | FIX | DELETE] partie modifiée`.

## Crédits

Données : [Jolpica F1 API](https://github.com/jolpica/jolpica-f1) (successeur d'Ergast)
et Wikipédia. Photos : Wikimedia Commons, sous licences libres, crédit affiché sur chaque
fiche.

F1® est une marque déposée de Formula One Licensing BV. SpeedTrack est un projet
indépendant, sans lien avec la Formule 1.
