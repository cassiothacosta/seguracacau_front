import { useUser } from '../lib/hooks'
import Layout from '../components/layout'


const apiLink = process.env.BACKEND_API

const Profile = () => {
  const user = useUser({ redirectTo: apiLink + '/login' })

  return (
    <Layout>
      <h1>Profile</h1>
      {user && (
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </Layout>
  )
}

export default Profile
