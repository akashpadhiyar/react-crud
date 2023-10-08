import Add from './Add';
import Display from './Display';
 
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Edit from './Edit';
import Show from './Show';

function App(){

  return (
    <div>
      <h1>React CRUD </h1>
      <Router>
        <Link to="/Add">Add</Link> |
        <Link to="/Display">Display</Link> | 
       
        <Routes>
        <Route path="/" element={<Display/>}/>
          <Route path="/Add" element={<Add/>}/>
          <Route path="/Display" element={<Display/>}/>
          <Route path="/Edit/:id" element={<Edit/>}/>
          <Route path="/Show/:id" element={<Show/>}/>
   
        </Routes>
      </Router>
      <h6>AkashSir.com</h6>
    </div>
  );
}
export default App;