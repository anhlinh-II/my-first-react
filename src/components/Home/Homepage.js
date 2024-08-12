import videoHomepage from '../../assets/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const Homepage = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const {t} = useTranslation();

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
                <div className='title-1'>{t('homepage.title1')}</div>
                <div className='title-2'>{t('homepage.title2')}</div>
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