import React from 'react';
import getYouTubeID from 'get-youtube-id';
// import youtube_parser from './utils.js';
import './App.css';


const chrome = window.chrome;

function App() {
  let idVideo;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '827a202f84msh2c253b34ef0912ap1982f0jsn92dfbe299bbd',
      'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
    }
  };

  const [currentUrl,setCurrentUrl]=React.useState('');
  const [resultUrl,setResultUrl]=React.useState('')
  


  React.useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      setCurrentUrl(tabs[0].url);
    });
    
  }, []);
  
  
  
  
  React.useEffect((idVideo) => {
    idVideo=getYouTubeID(currentUrl);
    fetch(`https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${idVideo}`, options)
    .then(res => res.json())
    .then(data => setResultUrl(data.formats[2].url))
    .catch(err => console.error(err));
    
    
  }, [idVideo,currentUrl,options]);
  
  console.log(resultUrl);
  console.log(idVideo)

  

  
  





  return (
    <div className="App">
      <header className="app--title">
        <h1 >React Youtube DownLoader</h1>
      </header>
      <div className="app--downloader">
        <p> {currentUrl} </p>
        <button> <a target='_blank' rel='noreferrer' href={resultUrl}> Download Video </a></button>
      </div>
    </div>
  );
}

export default App;
 