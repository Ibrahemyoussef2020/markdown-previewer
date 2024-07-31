import './App.css';
import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {

  const [code, setCode] = useLocalStorage('code', '## Hello');
  const [docsData, setDocsData] = useLocalStorage('docs', []);
  const [tab, setTabPreview] = useState(true);
  const [compiled , setCopiled] = useState(marked.parse(code))


  const handleChange = (e) => {
    setCode(e.target.value);
    setCopiled(marked.parse(e.target.value))
  } 

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => setDocsData(data))
    .catch(()=> alert("Sorry , Can't fetch docs data Now , Try an next time"))
  },[setDocsData])

  return (
    <>
      <h1>Markdown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={()=> setTabPreview('text')} className="btn">Markdown</button>
          <button onClick={()=> setTabPreview('elements')} className="btn">Preview</button>
          <button onClick={()=> setTabPreview('docs')} className="btn">Docs</button>
        </div>
        {tab === 'text' ? 
          <div>
            <textarea onChange={handleChange} value={code} />
          </div> 
          
          : tab === 'elements' ?

          <div>
            <textarea value={compiled} readOnly />
          </div>

          : tab === 'docs' ? 

          <div className='docs'>
            <h3>[Documentation]</h3>
            <ul className='table'>
              {
                docsData?.map((doc)=> {
                  return <li key={doc.title}>{doc.title}</li>
                })
              }
            </ul>
          </div>

          : null
        }
      </div>
    </>
  );
}

export default App;
