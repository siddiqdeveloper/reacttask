import logo from './logo.svg';
import './App.css';
import Header from  './components/header';
import ProductList from  './components/productList';
import MainSection from  './components/mainSection';
import React, {useEffect,useState} from 'react';

function App() {
    const [state, setState] = useState([]);
    const [form, setForm] = useState({system_name:''});
    const [ogstate, ogsetState] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formmode,setFormmode] = useState('save');
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
        event.preventDefault();
        console.log(form);

        if(formmode == 'save'){

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(form)
          };
          fetch('http://localhost:3000/devices', requestOptions)
          .then(response => response.json())
          .then(data => {
             fetchData();
          });
            
          }else{
            const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body:JSON.stringify(form)
            };
            fetch('http://localhost:3000/devices/'+form.id, requestOptions)
            .then(response => response.json())
            .then(data => {
               fetchData();
            });


          }

    }


  


    const filterFn = event => {
      let filterdata = ogstate;
      let list =  filterdata.filter(obj => Object.values(obj).some(val => val.includes(event.target.value)));
      //console.log(d);
      setState(list)
    }


    const systemNameHandle = event =>{
      console.log(event.target.value);
    
      setForm({...form,system_name:event.target.value});
      console.log(form);
    }

    const systemTypeHandle = event =>{
      setForm({...form,type:event.target.value});
    }

    const hddCapacityHandle = event =>{
      setForm({...form,hdd_capacity:event.target.value});
    }

    const deleteFn = id  =>{
        const requestOptions = {
            method: 'DELETE'
        };
        fetch('http://localhost:3000/devices/'+id, requestOptions)
        .then(response => response.json())
        .then(data => {
            fetchData();
        });
    }


    const updateFn = item =>{
        setFormmode('update')
        setForm( {system_name:item.system_name,
        type:item.type,
        hdd_capacity:item.hdd_capacity,
        id:item.id
        });
     
    }

  return (
      <>                
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                  <input type="text"className="form-control" placeholder="Search"  onChange={filterFn} />
                   </div>
                </div>

                <div className="col-md-2">
                    <button className="btn btn-primary">Add</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <form className=" m-15" action="/action_page.php">
                        <div className="form-group">
                          <label >System Name </label>
                          <input type="system_name" value={form.system_name} className="form-control" id="email" onChange={systemNameHandle} />
                        </div>
                        <div className="form-group">
                          <label >Type:</label>
                          <input type="text" className="form-control" value={form.type} id="systemType" onChange={systemTypeHandle} />
                        </div>   
                         <div className="form-group">
                          <label >Hdd Capacity:</label>
                          <input type="text" className="form-control" value={form.hdd_capacity} id="hdd_capacity" onChange={hddCapacityHandle} />
                        </div>   

                        <button type="submit" onClick={saveDate} className="btn btn-primary">{formmode}</button>
                    </form>
                </div>
             
                <div className="col-md-12">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>System Name</th>
                            <th>Type</th>
                            <th>Hdd Capacity</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                     {  state.map( item =>

                          <tr key={item.id}>
                            <td>{item.system_name}</td>
                            <td>{item.type}</td>
                            <td>{item.hdd_capacity}</td>
                            <td> <button className="btn-warning btn-sm" onClick={ () => deleteFn(item.id)}>Delete</button> </td>
                            <td> <button className="btn-warning btn-sm" onClick={ () => updateFn(item)}>Edit</button> </td>
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
