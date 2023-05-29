import { Card } from "@mui/material";
import "./styles/home.css";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Card className="card">
        <Home />
      </Card>
    </div>
  );
}

export default App;
