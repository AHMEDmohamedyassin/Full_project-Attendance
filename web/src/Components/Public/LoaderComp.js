import React from 'react'
import { ScaleLoader } from 'react-spinners'

export const SmallLoaderComp = () => {
  return (
    <ScaleLoader color='gray' size={50} />
  )
}

export const LargeLoaderComp = () => {
  return (
    <ScaleLoader color='gray' size={100} />
  )
}
