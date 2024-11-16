import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import PageNotFound from './pages/404'




const loader = () =>{
  return <div>laodinng.....</div>
}
function App() {

  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <Auth/>,
      loader: loader,
      children: [
      ],
    },
    {
      path: "/chat",
      element: <Chat />,
      loader: loader,
      children: [
      ],
    },
    {
      path: "/profile",
      element: <Profile />,
      loader: loader,
      children: [
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
      loader: loader,
      children: [
      ],
    },
  ])
  return (
    <RouterProvider router={router} fallbackElement={<div>loaderrrrrrr</div>} />
  )
}

export default App
