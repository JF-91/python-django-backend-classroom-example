import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import {ThemePalette} from '../../config/ThemeConfig'
import Menu from '@mui/material/Menu'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem'


function NavbarApp() {

const [open, setOpen] = useState(false);
const [anchorEl, setAnchorEl] = useState(null);

const openMenuLanguage = Boolean(anchorEl);

const handleclickMenuLanguage = (event) => {
  setAnchorEl(event.currentTarget);
}

const handleCloseMenuLanguage = () => {
  setAnchorEl(null);
}




const backgroundColor = {
  backgroundColor: ThemePalette.BG
}

const handleDrawerOpen = () => {
  console.log(open);
  setOpen(true);
}

  return (
    <Box>
      <AppBar position="relative"
      style={backgroundColor} 
      className='mb-[60px]'>
        <Toolbar className='flex justify-between items-center'>
          <IconButton aria-label="menu" onClick={handleDrawerOpen}>
            <Button variant='text'
              id='basic-button'
              aria-controls={openMenuLanguage ? 'true' : undefined}
              aria-haspopup='true'
              aria-expanded={openMenuLanguage ? 'true' : undefined}
              onClick={handleclickMenuLanguage}>
              Language
            </Button>
            <Menu 
            id='basic'
            anchorEl={anchorEl}
            open={openMenuLanguage}
            onClose={handleCloseMenuLanguage}
            MenuListProps={{
              'ara-labelledby': 'basic-button',
            }}>
              <MenuItem className='flex-col gap-3 bg-slate-400'>
                <Link to='/languages/french'>
                  <Typography variant="link" color="primary">Francais</Typography>
                </Link>

                <Link to='/languages/german'>
                  <Typography variant="link" color="primary">Deutsch</Typography>
                </Link>

                <Link to='/languages/english'>
                  <Typography variant="link" color="primary">English</Typography>
                </Link>

                <Link to='/languages/spain'>
                  <Typography variant="link" color="primary">Español</Typography>
                </Link>

                <Link to='/languages/sweden'>
                  <Typography variant="link" color="primary">Gaelic</Typography>
                </Link>

                <Link to='/languages'>
                  <Typography variant="link" color="primary">ours languages</Typography>
                </Link>
              </MenuItem>

            </Menu>
          </IconButton>
          <Box className="flex justify-between items-center gap-16">
            <Link to='/'>
              <Typography variant="link" component="div">
                home
              </Typography>
            </Link>

            <Link to='/about'>
              <Typography variant="link" component="div">
                about
              </Typography>
            </Link>

            <Link to='/languages'>
              <Typography variant="link" component="div">
                courses
              </Typography>
            </Link>
          </Box>

          <Button>
            <Link to='/contact'>
              <Typography variant="link" component="div">
                contact
              </Typography>
            </Link>
          </Button>
        
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavbarApp