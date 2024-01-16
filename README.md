# Pokédex

### Search & filter through all Pokémon by
-  Single Pokémon search
-  Multiple Pokémon search
-  Search by Pokémon type

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
Input - `string` - name of the Pokémon to search(case-insensitive), e.g. bulbasaur

Returns a single Pokémon and its details `id`, `name`, `type(s)`, `sprite (image)`

- ### `getPokemonListByNames`
Input: - `string[]` - Array of strings of Pokémon names (case-insensitive), pagination props

Returns a list of Pokémon matching the names provided in the array with the same details as in `getPokemonByName` along with total pokemons with this filter

- ### `getPokemonListByType`
Input: - `string` - type of the Pokémon to filter (case-insensitive), pagination props

Returns a filtered list of Pokémon of given type with the same details as in `getPokemonByName` along with total pokemons with this filter

- ###  `getPokemonTypes`
Helper route to find all types of Pokémon in the DB for easy selection from the selector component


## Frontend features

- Easily switch between 3 modes using switcher
  - Search single Pokémon
  - Search many Pokémon
  - Filter by type
- Pagination
- Responsive design