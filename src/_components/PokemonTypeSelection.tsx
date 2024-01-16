import {api} from "~/utils/api";
import {Box, CircularProgress, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import _ from "lodash";

type PokemonTypeSelectionProps = {
    selectedType: string | undefined;
    selectType: (type: string | undefined) => void;
}

export default function PokemonTypeSelection({selectedType, selectType}: PokemonTypeSelectionProps){
    const {data: pokemonTypes, isLoading, isLoadingError, isError} = api.pokemons.getPokemonTypes.useQuery()

    if (isError || isLoadingError){
        return <span>Could not load pokemon types</span>
    }

    if(isLoading){
        return <CircularProgress />
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="pokemon-type-label">Pokemon Type</InputLabel>
                <Select
                    size='small'
                    labelId="pokemon-type-label"
                    id="pokemonType"
                    value={selectedType}
                    label="Pokemon Type"
                    onChange={(event)=>{
                        selectType(event.target.value)
                    }}
                >
                    {_.map(pokemonTypes, (pokemonType)=>{
                        return <MenuItem value={pokemonType}>{_.capitalize(pokemonType)}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}