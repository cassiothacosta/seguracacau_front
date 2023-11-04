import { useState } from "react"
import Header from "./header"

export default function Layout(props: any) {

  return (
  <>
    <Header />
    {props.children && (
      <div className="flex lg:items-center justify-center h-screen"> {props.children}</div>
    )
    }
  </>
  )
}

