import { Outlet } from "react-router-dom"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const LanguaPage = () => {
  return (
    <Box className='flex justify-center items-center bg-green-400 w-[600px] h-[400px]'>
        <Box>
            <Typography variant="h1" color="primary">Language School</Typography>
        </Box>

        <Outlet />
    </Box>
  )
}

export default LanguaPage