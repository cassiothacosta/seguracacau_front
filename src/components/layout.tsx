import Header from "./header"

export default function Layout(props: any) {
  return (
  <>
    <Header />
    {props.children && (
      <div className="flex items-center justify-center h-screen"> {props.children}</div>
    )
    }
  </>
  )
}

