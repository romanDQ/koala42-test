import "./App.css";
import Table from "./components/Table";
import data from "./data/data.json";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p></p>
        <Table data={data}></Table>
      </header>
    </div>
  );
}

export default App;
