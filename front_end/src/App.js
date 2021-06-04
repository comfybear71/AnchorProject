import Axios from 'axios';

function App() {

  Axios ({
    methods: "GET",
    url: "http://localhost:5000/",
    headers: { 
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data.message);
  })
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
