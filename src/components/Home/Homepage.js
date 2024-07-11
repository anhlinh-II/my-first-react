import videoHomepage from '../../assets/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Homepage = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)

    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src={videoHomepage}
                    type="video/mp4"
                ></source>
            </video>
            <div className='homepage-content'>
                <div className='title-1'>There's a better way to ask</div>
                <div className='title-2'>You don't want to make a boring form.
                    And your audience won't answer one.
                    Create an typeform instead - and make everyone happy.</div>
                <div className='title-3'>
                    {isAuthenticated 
                        ? <button onClick={() => navigate('/users')}>Doing Quiz Now</button>
                        : <button onClick={() => navigate('/login')}>Get's started. It's free</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Homepage;