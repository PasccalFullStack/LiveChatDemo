// Author: Pascal Costa
// Licence: free
// Portfolio: www.pascalcosta.fr
import React, {useState} from 'react';
import './App.css';
import LiveChat from './component/livechat/LiveChat';
import UserSimulator from './component/livechat/UserSimulator';

function App() {
  const [userList, setUserList] = useState([])
  const [showActifUser, setShowActifUser] = useState({
    display: false,
    id: 0,
    pseudo: '',
    username: '',
  });
  const [com, setCom] = useState([]);
  const [pseudo, setPseudo] = useState({
    pseudo: '',
    pseudoIsValid: false,
  });
  return (
    <div className="App">
      <header className="App-header">
        <div className="logoContainer">
          <img src={process.env.REACT_APP_IMAGE_URL + '/LIVECHAT-icon.png'} alt="LIVECHAT demo icon" />
        </div>
        <div className="h1Container">
          <h1>LIVE CHAT - demo</h1>
        </div>
        <UserSimulator userList={userList} showActifUser={showActifUser} setShowActifUser={setShowActifUser}/>
      </header>
      <section>
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner" >
            <div className="carousel-item active">
              <img src={process.env.REACT_APP_IMAGE_URL + "image1.png"} className="d-block w-100" alt="..." style={{height: '88vh', overflow: 'hidden'}}/>
            </div>
            <div className="carousel-item">
              <img src={process.env.REACT_APP_IMAGE_URL + "image2.png"} className="d-block w-100" alt="..." style={{height: '88vh', overflow: 'hidden'}}/>
            </div>
            <div className="carousel-item">
              <img src={process.env.REACT_APP_IMAGE_URL + "image3.png"} className="d-block w-100" alt="..." style={{height: '88vh', overflow: 'hidden'}}/>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <section>
        <LiveChat 
          userList={userList}
          setUserList={setUserList}
          showActifUser={showActifUser}
          com={com}
          setCom={setCom}
          pseudo={pseudo}
          setPseudo={setPseudo} />
      </section>
    </div>
  );
}

export default App;
