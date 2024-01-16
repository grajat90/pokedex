import {useState} from "react";
import {api} from "~/utils/api";
import _ from "lodash";
import {Button, CircularProgress, Paper, Table, TextField} from "@mui/material";
import PokemonRow from "~/_components/PokemonRow";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";

export default function SearchByName(){
    const [pokemonSearched, setPokemonSearched] = useState("Bulbasaur")
    const {data: pokemon, isLoading, isError, isLoadingError} = api.pokemons.getPokemonByName.useQuery(pokemonSearched)

    return (
        <>
            <form className="flex flex-row gap-5" onSubmit={(data) => {
                data.preventDefault()
                //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                setPokemonSearched(_.get(data.target, "pokemonName.value", ""))
            }}>
                <TextField size="small" label="Pokemon" id="pokemonName" name="pokemonName"/>
                <Button className="bg-blue-500" size="small" type="submit" variant="contained" >Find</Button>
            </form>
            {isLoading ? <CircularProgress/> : isError || isLoadingError ? (
                <span>Some error occured</span>) : (
                    <Table component={Paper} className="max-w-xl" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <PokemonRow pokemon={pokemon}/>
                    </Table>
            )}
        </>
    )
}