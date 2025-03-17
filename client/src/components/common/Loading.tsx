import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const BoxLoading = ({loading, children}: {loading: boolean, children: React.ReactNode}) => {
  return (
    <Box
    width="100%"
    height="100%"

    bgcolor="rgba(255, 255, 255, 0.6)"
  >
    {loading ?     <Box     display="flex"
    alignItems="center"
    justifyContent="center" >
            <CircularProgress />
    </Box>
    : children
}


  </Box>
  )
}

export default BoxLoading
