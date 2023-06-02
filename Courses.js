import React, { useState } from 'react'
import '../styling.css';
import { Data } from './Data';
import SearchIcon from '@mui/icons-material/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursePage from './CoursePage';


function Courses() {
    const [search, setSearch] = useState("")

    return (
        // <div>Courses</div>
        // <div className='courses'>

        <div className='courses'>
            <div className='Header'>

                <div className='Header__search' >
                    <input className='Header__searchInput' type="Text" placeholder='Search courses' onChange={(e) => setSearch(e.target.value)} />

                    <SearchIcon className='header__searchIcon' />
                </div>

            </div>
            <div className='courses__Container'>
                <div className='courses__Section'>
                    <div className='courses__title'>

                        <h2 >Courses</h2>

                    </div>
                </div>

                <div className='courses__Section'>
                    <div className='courses__title'>
                        {Data.filter((item) => {
                            return search.toLowerCase() === '' ? item : item.course_name.toLowerCase().includes(search);
                        }).map((item) => (
                            <tr className='courses__info' key={item.id}>
                                <td>
                                    <a href={`/courses/${item.id}`}>{item.course_name}</a>
                                </td>
                            </tr>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        // {/* </div> */}
    )
}

export default Courses