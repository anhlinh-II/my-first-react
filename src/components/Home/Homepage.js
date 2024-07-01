import videoHomepage from '../../assets/video-homepage.mp4';

const Homepage = (props) => {
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
                    <button>Get's started. It's free</button>
                </div>
            </div>
        </div>
    )
}

export default Homepage;