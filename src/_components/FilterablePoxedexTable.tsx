import {useState} from "react";
import _ from "lodash";
import {Button, CircularProgress, Paper, Table, TableContainer, TextField} from "@mui/material";
import {api} from "~/utils/api";
import PokemonRow from "~/_components/PokemonRow";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import PokedexTable from "~/_components/PokedexTable";
import PokemonTypeSelection from "~/_components/PokemonTypeSelection";

const PAGE_SIZE = 2
export default function FilterablePoxedexTable() {
    const [pokemonType, setPokemonType] = useState("water")
    const [page, setPage] = useState(0)
    const {
        data,
        isLoading,
        isError,
        isLoadingError
    } = api.pokemons.getPokemonListByType.useQuery({type: pokemonType, page: page, pageSize: PAGE_SIZE})
    const pokemonList = _.get(data, "pokemons", [])
    const total = _.get(data, "total", 0)
    const selectPokemonType = (type: string | undefined)=>{
        if(!!type){
            setPage(0)
            setPokemonType(type.replaceAll(" ", ""))
        }
    }

    const setPageHandler = (pageNum: number | undefined)=>{
        if(pageNum !== undefined)
            setPage(pageNum)
    }

    return (
        <>
            <PokemonTypeSelection selectedType={pokemonType} selectType={selectPokemonType} />
            {isLoading ? <CircularProgress/> : isError || isLoadingError ? (
                <span>Some error occured</span>) : <PokedexTable pokemonList={pokemonList} page={page} setPage={setPageHandler} pageSize={PAGE_SIZE} total={total} />}

        </>
    )
}