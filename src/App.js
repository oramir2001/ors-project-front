import { Routes, Route,Link} from 'react-router-dom'
import WelcomePage from './Pages/WelcomePage'
import MainPage from './Pages/MainPage'
import ShowDish from './Pages/ShowDish'
import { AppBar, Toolbar, Box, Typography,Button} from '@mui/material'
import React from 'react'
import axios from 'axios'
import { API_URL } from './config';

function App() {
  const [categories,setCategories] = React.useState([])
  React.useEffect(()=>{
    axios.get(`${API_URL}/categories`).then(response=>{
      setCategories(response.data)
    })
  },[])
  return (
    <div>
      <Box>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow:1}}>
              <Link style={{textDecoration:'none',color:'white'}} to="/">Teloy Restaurant</Link>
            </Typography>
            <Button variant="">
              <Link style={{textDecoration:'none',color:'white'}} to="/menu">Menu</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <br/><br/><br/>
      <Routes>
        <Route path="/" element={ <WelcomePage/> } />
        <Route path="/menu" element={<MainPage categories={categories}/>}/>
        <Route path="/category/:id" element={<MainPage categories={categories}/>}/>
        <Route path="/show/:id" element={<ShowDish/>}/>
      </Routes>
    </div>
  );
}

export default App;
