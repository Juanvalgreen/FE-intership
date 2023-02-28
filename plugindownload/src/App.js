import React from 'react';
import getYouTubeID from 'get-youtube-id';
// import youtube_parser from './utils.js';
import './App.css';


const chrome = window.chrome;

function App() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '827a202f84msh2c253b34ef0912ap1982f0jsn92dfbe299bbd',
      'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
    }
  };

  const [currentUrl,setCurrentUrl]=React.useState('');
  // const [idVideo,setIdVideo]=React.useState('');
  const [resultData,setResultData]=React.useState(null);

  


  React.useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      setCurrentUrl(tabs[0].url);
    });
    
  }, []);
  
  
  
  
  React.useEffect(() => {
    const videoId=getYouTubeID(currentUrl);
    // setIdVideo(videoId);
    fetch(`https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${videoId}`, options)
    .then(res => res.json())
    .then(data => setResultData(data))
    .catch(err => console.error(err));
    
    
  }, [currentUrl]);
  
  console.log(resultData);
  // console.log(idVideo);

  

  
  
  const urlId=resultData?.formats?.[2]?.url;
  const titleVideo=resultData?.title;




  return (
    <div className="App">
      <header className="app--title">
        <h1 >React Youtube DownLoader</h1>
      </header>
      <div className="app--downloader">
        {currentUrl.includes("youtube") && <p> {titleVideo} </p>}
        {currentUrl.includes("youtube") ? <button> <a target='_blank' rel='noreferrer' href={urlId}> Download Video </a></button> : <p>This is not a youtube Video</p>}
      </div>
    </div>
  );
}

export default App;
 