import logo from './logo.svg';
import './App.css';
import Header from  './components/header';
import ProductList from  './components/productList';
import MainSection from  './components/mainSection';
import React, {useEffect,useState} from 'react';

function App() {
    const [state, setState] = useState([]);
    const [ogstate, ogsetState] = useState([]);
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
            ogsetState(data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
    };

    const saveDate = event =>{
        
    }

    const filterFn = event => {
      let filterdata = ogstate;
      let list =  filterdata.filter(obj => Object.values(obj).some(val => val.includes(event.target.value)));
      //console.log(d);
      setState(list)
    }

  return (
      <>                
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                  <div class="form-group">
                  <input type="text"className="form-control" placeholder="Search"  onChange={filterFn} />
                   </div>
                </div>

                <div className="col-md-2">
                    <button className="btn btn-primary">Add</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <form class=" m-15" action="/action_page.php">
                        <div class="form-group">
                          <label for="system_name">System Name </label>
                          <input type="system_name" class="form-control" id="email" />
                        </div>
                        <div class="form-group">
                          <label for="Type">Type:</label>
                          <input type="text" class="form-control" id="type" />
                        </div>   
                         <div class="form-group">
                          <label for="Type">Hdd Capacity:</label>
                          <input type="text" class="form-control" id="hddcapacity" />
                        </div>   

                        <button type="submit" onClick={saveDate} class="btn btn-default">Add</button>
                    </form>
                </div>
             
                <div className="col-md-12">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>System Name</th>
                            <th>Type</th>
                            <th>Hdd Capacity</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                     {  state.map( d =>

                          <tr key={d.id}>
                            <td>{d.system_name}</td>
                            <td>{d.type}</td>
                            <td>{d.hdd_capacity}</td>
                            <td> <span className="btn btn-sm">Delete</span> </td>
                          </tr>
                        

                         )}
                        </tbody>
                      </table>
                </div>
            </div>
        </div>
      </>

  );
}

export default App;
