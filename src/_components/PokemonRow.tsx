import TableCell from '@mui/material/TableCell';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import _ from "lodash";
import {RouterOutputs} from "~/utils/api";
import {Chip} from "@mui/material";

export default function PokemonRow({pokemon}: { pokemon: RouterOutputs["pokemons"]["getPokemonByName"] | undefined}) {

    if(!pokemon){
        return <span>No pokemon(s) found by this name</span>
    }

    return (
            <TableRow>
                <TableCell align="center">
                    <Avatar alt={_.get(pokemon, "name", "")} src={_.get(pokemon, "sprite", "")}/>
                </TableCell>
                <TableCell align="center">{_.get(pokemon, "id", "")}</TableCell>
                <TableCell align="left">{_.get(pokemon, "name", "")}</TableCell>
                <TableCell align="left">{_.map(_.get(pokemon, "types", []), (val)=> {
                    if(typeof val === "string")
                    return <Chip className="mr-2" label={_.capitalize(val)} />
                    return <></>
                })}</TableCell>
            </TableRow>
    )
}