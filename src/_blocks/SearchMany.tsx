import {useState} from "react";
import _ from "lodash";
import {Button, CircularProgress, TextField} from "@mui/material";
import {api} from "~/utils/api";
import PokedexTable from "~/_components/PokedexTable";

const PAGE_SIZE = 2
export default function SearchMany() {
    const [pokemonsSearched, setPokemonsSearched] = useState(["Bulbasaur"])
    const [page, setPage] = useState(0)
    const {
        data,
        isLoading,
        isError,
        isLoadingError
    } = api.pokemons.getPokemonListByNames.useQuery({names: pokemonsSearched, page: page, pageSize: PAGE_SIZE})
    const pokemonList = _.get(data, "pokemons", [])
    const total = _.get(data, "total", 0)
    const handleSubmit = (value: string) => {
        const pokemons = value.replaceAll(" ", "").split(",")
        setPage(0)
        setPokemonsSearched(pokemons)
    }

    const setPageHandler = (pageNum: number | undefined)=>{
        if(pageNum !== undefined)
            setPage(pageNum)
    }

    return (
        <>
            <form className="flex flex-row gap-5" onSubmit={(data) => {
                data.preventDefault()
                //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                handleSubmit(_.get(data.target, "pokemonName.value", ""))
            }}>
                <TextField size="small" label="Pokemons (comma separated)" id="pokemonName" name="pokemonName"/>
                <Button variant="contained" size="small" className="bg-blue-500" type="submit">Find</Button>
            </form>
            {isLoading ? <CircularProgress/> : isError || isLoadingError ? (
                <span>Some error occured</span>) : <PokedexTable pokemonList={pokemonList} page={page} setPage={setPageHandler} pageSize={PAGE_SIZE} total={total} />}

        </>
    )
}