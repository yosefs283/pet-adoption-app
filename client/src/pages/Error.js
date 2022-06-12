import {Link} from 'react-router-dom'
import img from '../styles/images/not-found.svg'
import Wrapper from '../styles/wrappers/ErrorPage'

function Error() {
  return (
    <Wrapper className='full-page' >
        <div>
            <img src={img} alt='not found' className='img main-img' />
            <h3>Error</h3>
            <p>Seems like this page does not exist.</p>
            <Link to='/' >back home</Link>
        </div>
    </Wrapper>
  )
}

export default Error