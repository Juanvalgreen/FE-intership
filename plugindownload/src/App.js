import React from 'react';
import getYouTubeID from 'get-youtube-id';
import ReactPlayer from 'react-player';
import './App.css';


const chrome = window.chrome;

function App() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '827a202f84msh2c253b34ef0912ap1982f0jsn92dfbe299bbd',
      'X-RapidAPI-Host': 'youtube-media-downloader.p.rapidapi.com'
    }
  };

  const [currentUrl,setCurrentUrl]=React.useState('');
  const [resultData,setResultData]=React.useState(null);

  


  React.useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      setCurrentUrl(tabs[0].url);
    });
    
  }, []);
  
  
  
  
  React.useEffect(() => {
    const videoId=getYouTubeID(currentUrl);

    if (!videoId) {
      setResultData(null);
      return;
    }
    fetch(`https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${videoId}`, options)
    .then(res => res.json())
    .then(data => setResultData(data))
    .catch(err => console.error(err));
    
    
  }, [currentUrl]);
  


  

  
  
  const urlId=resultData?.videos?.items?.[0]?.url;
  const titleVideo=resultData?.title;




  return (
    <div className="App">
      <header className="app--title">
        <h1 >React Youtube DownLoader</h1>
      </header>
      <div className="app--downloader">
        {currentUrl.includes("youtube") && <p> {titleVideo} </p>}
        
        {currentUrl.includes("youtube") ? <ReactPlayer className="reactPlayer" url={urlId} controls={true}></ReactPlayer> : <p>This is not a youtube Video</p>}
      </div>
    </div>
  );
}

export default App;
 