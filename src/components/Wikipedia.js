import React from 'react';
import { useState } from 'react';

export default function Wikipedia() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

    const handleSearch = async e => {
      e.preventDefault();
      if(search === "") return;

      const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${search}&utf8=&format=json&origin=*&srlimit=20`;

      const response = await fetch(url);

      if (!response.ok){
        throw Error(response.statusText);
      }

      const json = await response.json();
      console.log(json.query.searchinfo)
      setResult(json.query.search);
      setSearchInfo(json.query.searchinfo);
    }


  return (
    <div>
      <header>
        <h1 className='heading'>Wiki Search</h1>
        {result.totalhits}
        <form onSubmit={handleSearch}>
          <input className='input-inset' type="search" placeholder='Enter your search here' value={search} onChange={e => setSearch(e.target.value)} />
          {/* <button type='button' className='btn btn-success' onClick={() => handleClick()}>Search</button> */}
        </form>
        {(searchInfo.totalhits) ?<p> Search Result: {searchInfo.totalhits}</p> : ''} 
      </header>
      <div className="results">

        {result.map((results, i) =>{
          const pageUrl = `https://en.wikipedia.org/?cureid=${results.pageid}`; 
          return <div className='result-render' key={i}>
            <h2>{results.title}</h2>
            <p dangerouslySetInnerHTML={{__html: results.snippet}}></p>
            <button><a href={pageUrl} target="_blank" rel='nofollow'>Read More</a></button>
          </div>
        })}
      </div>
    </div>
  )
}
