import React from 'react'
import {useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import Courses from './Courses';
import { Data } from './Data';


function Sem1() {
    const [search, setSearch]= useState("")

    return (
        <div className='Header'>

            <div className='Header__search' >
                <input className='Header__searchInput' type="Text" placeholder='Search courses' onChange={(e) => setSearch(e.target.value)} />
                
                <SearchIcon className='header__searchIcon' />
            </div>

        </div>

        //  <Courses> </Courses>
    )
}

export default Sem1