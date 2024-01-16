import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import _ from "lodash";

export const pokemonRouter = createTRPCRouter({

    getPokemonByName: publicProcedure.input(z.string()).query(async ({ctx, input}) => {
        const pokemon: ({ types: { type: string }[] | string[] } & {
            id: number,
            name: string,
            sprite: string
        }) | null = await ctx.db.pokemon.findFirst({
            where: {
                name: input
            },
            include: {
                types: true
            }
        });

        if (!!pokemon && !!pokemon.types) {
            pokemon.types = _.flatMap(pokemon.types, (val) => _.get(val, "type", ""))
        }

        return pokemon
    }),

    getPokemonListByNames: publicProcedure.input(z.object({names: z.array(z.string()), page: z.number(), pageSize: z.number()})).query(async ({ctx, input}) => {
        const offset = input.page * input.pageSize
        const pokemonList = await ctx.db.pokemon.findMany({
            where: {
                name: {
                    in: input.names
                }
            },
            skip: offset,
            take: input.pageSize,
            include: {
                types: true
            }
        });
        const totalPokemons = await ctx.db.pokemon.count({
            where: {
                name: {
                    in: input.names
                }
            }
        })
        return {
            pokemons: _.map(pokemonList, (pokemon) => {
                return {
                    ...pokemon,
                    types: _.flatMap(pokemon.types, (val) => _.get(val, "type", ""))
                }
            }),
            total: totalPokemons
        }
    }),
    getPokemonListByType: publicProcedure.input(z.object({type: z.string(), page: z.number(), pageSize: z.number()})).query(async ({ctx, input}) => {
        const offset = input.page * input.pageSize
        const typedPokemons = await ctx.db.pokemonType.findFirst({
            where: {
                type: input.type
            },
            include: {
                pokemons: {
                    include: {
                        types: true
                    },
                    skip: offset,
                    take: input.pageSize
                }
            }
        });
        const totalPokemons = await ctx.db.pokemon.count({
            where: {
                types: {
                    some: {
                        type: input.type
                    }
                }
            }
        })
        const pokemonList = _.get(typedPokemons, "pokemons", [])
        return {
            pokemons: _.map(pokemonList, (pokemon) => {
                return {
                    ...pokemon,
                    types: _.flatMap(pokemon.types, (val) => _.get(val, "type", ""))
                }
            }),
            total: totalPokemons
        }
    }),
    getPokemonTypes: publicProcedure.query(async ({ctx}) => {
        const pokemonTypes = await ctx.db.pokemonType.findMany()
        return _.flatMap(pokemonTypes, (pokemonType) => {
            const type = _.get(pokemonType, "type", "")
            return type
        })
    })
});
