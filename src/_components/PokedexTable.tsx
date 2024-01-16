import type {RouterOutputs} from "~/utils/api";
import _ from "lodash";
import {Paper, Table, TableContainer, TableFooter, TablePagination} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import PokemonRow from "~/_components/PokemonRow";

export default function PokedexTable({pokemonList, page, setPage, pageSize, total}: {
    pokemonList: RouterOutputs["pokemons"]["getPokemonListByNames"]["pokemons"],
    page: number,
    setPage: (pageNum: number | undefined)=>void,
    pageSize: number,
    total: number
}){
    if(_.isEmpty(pokemonList)){
        return <span>
            No pokemon(s) found by this name
        </span>
    }


    return (
        <TableContainer component={Paper} className="max-w-xl">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Types</TableCell>
                    </TableRow>
                </TableHead>
                {_.map(pokemonList, (pokemon)=>(
                    <PokemonRow pokemon={pokemon} />
                ))}
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={total}
                            page={page} rowsPerPage={pageSize}
                            rowsPerPageOptions={[pageSize]}
                            onPageChange={(event, page)=>{
                            setPage(page)
                        }}/>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}