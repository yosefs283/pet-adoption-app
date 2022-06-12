import React from 'react'
import main from '../styles/images/main.svg'
import Wrapper from '../styles/wrappers/HomePage'
import { Logo } from '../components'
import {Link} from 'react-router-dom'


function Home() {
    return (
        <Wrapper>
            <nav>
                <Logo/>
            </nav>

            <div className='container page' >
                <div className='info' >
                    <h1>Pet <span>adoption</span> app</h1>
                    <p>Welcome to the pet adoption app!
                        Here you will be able to adopt,foster and view our wonderful pets.
                        so what are you waiting for? start right now!
                    </p>
                    <Link to='/register' className='btn btn-hero' >Login/Register</Link>
                </div>
                <img src={main} alt='pet adopt' className='img main-img' />
            </div>
        </Wrapper>
    )
}


export default Home