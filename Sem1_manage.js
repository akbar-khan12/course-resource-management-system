import React, { useState } from 'react'
import '../styling.css';
import { Data } from './Data';
import SearchIcon from '@mui/icons-material/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursePage from './CoursePage';
import PfManage from './PfManage';


function Sem1_manage() {
    const [search, setSearch] = useState("")

    return (
        // <div>Courses</div>
        // <div className='courses'>

        <div className='courses-container'>
            <div className='courses-header'>
                <div className='courses-search'>
                    <input className='courses-searchInput' type="text" placeholder='Search courses' onChange={(e) => setSearch(e.target.value)} />
                    <SearchIcon className='courses-searchIcon' />
                </div>
            </div>

            <div className='courses-section'>
                <div className='courses-title'>
                    <h2>Courses</h2>
                </div>
            </div>

            <div className='courses-section'>
                <div className='courses-title'>
                    {Data.filter((item) => {
                        return search.toLowerCase() === '' ? item : item.course_name.toLowerCase().includes(search);
                    }).map((item) => (
                        <tr className='courses-info' key={item.id}>
                            <td>
                                <a href={`/Sem1_manage/${item.id}`}>{item.course_name}</a>
                            </td>
                        </tr>
                    ))}
                </div>
            </div>
        </div>

        // {/* </div> */}
    )
}

export default Sem1_manage