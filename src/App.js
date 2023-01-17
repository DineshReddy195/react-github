import React, { useEffect, useState } from 'react'
import './App.css';


const App = () => {

  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("billgates");
  const [repo, setRepo] = useState([])


  useEffect(() => {
    get_git_data();


  }, [query])
  const get_git_data = async () => {
    const response = await fetch
      (`https://api.github.com/users/${query}`);
    // console.log(response);
    const data = await response.json();
    setApiData(data);
    getRepo(query)


  };
  const getRepo = async () => {
    const getRepoData = await fetch(`https://api.github.com/users/${query}/repos`)
    const resData = await getRepoData.json()
    setRepo(resData)
  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  function getSearch(e) {
    e.preventDefault();
    setQuery(search);

    setSearch("");

  }

  return (
    <div className="App">
      <div className='text'>
      <form className="search-form" onSubmit={getSearch} >
        <input className="input-field" type="search" placeholder="Search Name..." aria-label="Search" value={search}
          onChange={updateSearch} />
        <button className="search-button" type="submit" >
          Search
        </button>
      </form>
      </div>

      <div className='container-md my-5 '>
        <div className='row border border-secondary'>
          <div className='col-12  '>
            <div className='d-flex justify-content-around  p-2 '>
              <img src={apiData.avatar_url} width="150px" alt="image" className='image'/>
              <div className='first-under'>
                <h2>{apiData.login}</h2>
                <a href={apiData.html_url}>{apiData.html_url}</a>
                <p>{apiData.id} </p>

              </div>
            </div>
            <div className='d-flex justify-content-around '>
              <div className='p-5'>
                <h1>Follow</h1>
                <h3>{apiData.following}</h3>
              </div>
              <div className='p-5'>
                <h1>Follower</h1>
                <h3>{apiData.followers}</h3>
              </div>
              <div className='p-5'>
                <h1>repo</h1>
                <h3>{apiData.public_repos}</h3>
              </div>
            </div>
          </div>
          <div className='container'>
            <h1>Repository Get here</h1>
            {
               
               repo.map((e)=>{
                return(
                  <div key={e.name}>
                 
                    <a href={e.html_url} target="_blank">{e.name}</a>
                 
                  </div>
                )
               })
             
            }
          
         

          </div>


        </div>

      </div>


    </div>


  )




}

export default App;