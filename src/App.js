import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Form from './components/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="textPrimary">React hooks form</Typography>
        </Toolbar>
      </AppBar>
      <Form />
    </div>
  );
}

export default App;
