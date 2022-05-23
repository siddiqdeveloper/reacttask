import logo from './logo.svg';
import './App.css';
import Header from  './components/header';
import ProductList from  './components/productList';
import MainSection from  './components/mainSection';
import React, {useEffect,useState} from 'react';

function App() {
   const [state, setState] = useState([]);
     const [loading, setLoading] = useState(false);

    useEffect(() => {
             fetchData();
    },[])

    const fetchData = () => {
    setLoading(true);
        fetch("http://localhost:3000/devices")
          .then((response) => response.json())
          .then((data) => {
            setState(data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
    };

  return (
      <>                
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th>System Name</th>
            <th>Type</th>
            <th>Hdd Capacity</th>
          </tr>
        </thead>
        <tbody>
     {  state.map( d =>

          <tr key={d.id}>
            <td>{d.system_name}</td>
            <td>{d.type}</td>
            <td>{d.hdd_capacity}</td>
          </tr>
        

         )}
        </tbody>
      </table>
      
      </>

  );
}

export default App;
