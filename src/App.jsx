import React from 'react';
import MainPage from './Pages/MainPage/MainPage';
import style from "./global.module.scss"
import Playbar from './components/PlayBar/PlayBar';
import UpLoader from './components/UpLoader/UpLoader';
const App = () => {
  return (
    <div className={style.wrapper}>
      <UpLoader/>
      <MainPage/>
      <Playbar/>
    </div>
  );
};

export default App;
