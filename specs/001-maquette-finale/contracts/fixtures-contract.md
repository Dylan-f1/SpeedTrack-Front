# Contract: nouvelles fixtures front (casques, favoris, compte)

**Feature**: [../spec.md](../spec.md) | **Plan**: [../plan.md](../plan.md) |
**Data model**: [../data-model.md](../data-model.md)

Cette feature n'ajoute aucun endpoint au backend Express (`speedtrack-backend`) — le
"contrat" documenté ici est celui que les nouvelles fixtures frontend doivent
respecter, pour que le jour où `helmets`, `favorites` et `account` deviennent de vrais
endpoints REST (feature ultérieure, hors périmètre), les composants qui consomment ces
modules n'aient pas besoin d'être réécrits — seul `lib/api.js` gagnerait de nouveaux
clients suivant le même pattern que `driversAPI`/`teamsAPI`/etc.

## `lib/fixtures/helmets.js`

```text
getHelmetsByDriver(driverSlug: string) -> Array<{
  driverSlug: string,
  season: number,
  imageUrl: string,
  label: string | null,
}>
```

- Retourne la liste triée par `season` décroissante (le plus récent en premier).
- Retourne un tableau à un seul élément pour un pilote n'ayant qu'un design connu
  (edge case du spec) — jamais un tableau vide pour un pilote existant.
- Futur équivalent backend attendu : `GET /api/drivers/:slug/helmets`.

## `lib/fixtures/favorites.js`

```text
getFavoritesByUser(userId: string) -> Array<{
  userId: string,
  entityType: 'driver' | 'team' | 'circuit',
  entitySlug: string,
  addedAt: string (ISO date),
}>

isFavorite(userId: string, entityType, entitySlug) -> boolean

toggleFavorite(userId: string, entityType, entitySlug) -> boolean
// retourne le nouvel état (true = ajouté, false = retiré)
```

- `toggleFavorite` doit être idempotent dans son effet (deux clics rapides = un seul
  changement d'état net), pour éviter l'incohérence visuelle décrite dans les
  Acceptance Scenarios US2.1/US2.2.
- Futur équivalent backend attendu : `GET /api/favorites`, `POST /api/favorites`,
  `DELETE /api/favorites/:entityType/:entitySlug` (routes kebab-case pluriel, cf.
  convention `CLAUDE.md`).

## `lib/fixtures/account.js`

```text
getCurrentUser() -> {
  displayName: string,
  avatarUrl: string | null,
} | null
// null = visiteur non connecté (état par défaut pour cette maquette)
```

- Le parcours de connexion réel n'est pas construit dans cette feature : ce contrat
  sert uniquement à alimenter l'état visuel du point d'entrée compte dans le header
  (FR-011), pas une vraie session.
- Futur équivalent backend attendu : hors périmètre de cette spec — à définir dans une
  feature "compte utilisateur" dédiée (mentionnée dans les Edge Cases du spec).
