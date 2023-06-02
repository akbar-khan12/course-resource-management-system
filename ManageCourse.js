import React from 'react'
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { ref, onValue } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import '../styling.css';
import Semester from './Semester';

function ManageCourse() {
    return (
        <div className='HomeContainer'>
            <div className='HomeContainer__container'>

                {/* <img className='HomeContainer__image' src='https://lh3.googleusercontent.com/p/AF1QipPpPzRnxfWMTS5bWZPpvq-bPgS_KgX506SZSVcx=s1360-w1360-h1020'></img> */}

                <div className='HomeContainer__row'>
                    <Link className="linkSem" to="/Sem1_manage">
                        <Semester id='1' name='semester 1' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
                    </Link>

                    <Semester id='2' name='semester 2' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
                </div>

                <div className='HomeContainer__row'>
                    <Semester id='3' name='semester 3' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
                    <Semester id='4' name='semester 4' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
                    <Semester id='5' name='semester 5' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
                </div>

                <div className='HomeContainer__row'>
                    <Semester id='6' name='semester 6' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
                    <Semester id='7' name='semester 7' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
                    <Semester id='8' name='semester 8' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
                </div>
            </div>
        </div>


    )
}

export default ManageCourse