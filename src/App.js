import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [dogbread, setDogBread] = useState("affenpinscher")
  const [dogbreadimag, setDogBreadimg] = useState("")
  const [error, setError] = useState(false)
  const [errormessage, setErrorMessage] = useState('')
  
  function newFun() {
    setError(false)
    axios.get(`https://dog.ceo/api/breed/${dogbread.toLocaleLowerCase()}/images/random`)
    .then(function (response) {
      // handle success
      setDogBreadimg(response.data.message)
    })
    .catch(function (error) {
      // handle error
      if (error.response.data.code === 404) {
        setError(true)
        setErrorMessage(error.response.data.message)
      }
    })
  }

  useEffect(() => {

    newFun();

  }, [])
 
  
  return (
    <div className="App">
      <img style={{width:"400px", height:"400px"}} src={dogbreadimag} alt="" />
      <div className='text'>
        <input value={dogbread} onChange={(event) => setDogBread(event.target.value)}  className='input-text' type="text" placeholder='Enter Your Bread Name'/>
        <button onClick={() => newFun()}  className='sub-btn'>Change</button>
       {error === true ? <h3>{errormessage}</h3> : null }
      </div>
    </div>
         
  );
}

export default App;
