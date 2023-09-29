import Header from "./header"

const Layout = (props: any) => (
  <div>
    <Header/>
    {props.children && (

      <div> {props.children}</div>

    )

    }
  </div>
)

export default Layout
