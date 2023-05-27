import { motion } from 'framer-motion'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
// import { Children } from 'react'

const MotionSection = ({ children, delayTime }) => {
  return (
    <Box
      component={motion.span}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: delayTime }}>
      {children}
    </Box>
  )
}
export default MotionSection