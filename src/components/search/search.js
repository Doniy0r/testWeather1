import {AsyncPaginate, LoadOptions} from "react-select-async-paginate";
import React, {useState} from "react";
import {geoApiOptions,GEO_API_URL} from '../../api'


const Search=({onSearchChange})=>{
    const [search,setSearch]=useState(null)


    const handleOnChange=(searchData)=>(
        setSearch(searchData),
        onSearchChange(searchData)
    )

    const LoadOptions=(inputValue)=>{
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response=>response.json())
            .then(response=>{
                return {
                    options: response.data.map((city)=>{
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name} ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err=>console.log(err))
    }

    return (
       <AsyncPaginate
           pleceholder='Search for city'
           debounceTimeout={600}
           value={search}
           onChange={handleOnChange}
          loadOptions={LoadOptions}/>
    );
}

export default Search;