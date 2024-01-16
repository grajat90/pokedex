# Pokédex

### Search & filter through all pokemons by
-  Single pokemon search
-  Multiple pokemon search
-  Search by pokemon type

## Made using

- Next.js + Typescript
- Prisma
- Tailwind CSS
- tRPC + React Query
- Material UI
- PlanetscaleDB

Pagination present

## Routes

- ### `getPokemonByName`
Input - `string` - name of the pokemon to search(case insensitive), e.g. bulbasaur

Returns a single pokemon and its details `id`, `name`, `type(s)`, `sprite (image)`

- ### `getPokemonListByNames`
Input: - `string[]` - Array of strings of pokemon names (case insensitive), pagination props

Returns a list of pokemons matching the names provided in the array with the same details as in `getPokemonByName` along with total pokemons with this filter

- ### `getPokemonListByType`
Input: - `string` - type of the pokemon to filter (case insensitive), pagination props

Returns a filtered list of pokemons of given type with the same details as in `getPokemonByName` along with total pokemons with this filter

- ###  `getPokemonTypes`
Helper route to find all types of pokemons in the DB for easy selection from the selector component


## Frontend features

- Easily switch between 3 modes using switcher
  - Search single pokemon
  - Search many pokemons
  - Filter by type
- Pagination
- Responsive design