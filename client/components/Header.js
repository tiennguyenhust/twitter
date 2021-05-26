import React from 'react'
import Link from "next/link"

import { Center } from "./Layout"

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Center>
          <h1>Twitter Clone</h1>
        </Center>
        <style jsx>{`
          header {
            background-color: #FFFFFF;
            box-shadow: 0 1px 3px 0 rgba(0,0,0,0.14);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
          }
        `}</style>
      </header>
    )
  }
}