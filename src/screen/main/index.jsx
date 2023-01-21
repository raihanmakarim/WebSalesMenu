import React from 'react'
import { Menu, Bill } from '../../component'
import s from "../../App.module.scss";


const Main = () => {
  return (
    <div className={s.container}>
      <Menu />
      <Bill />
    </div>
  )
}

export default Main