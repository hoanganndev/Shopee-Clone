import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { AppContext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import CartLayout from './layouts/CartLayout'
import UserLayout from './pages/User/Layouts/UserLayout'
import path from 'src/constants/path'
// import Login from './pages/Login'
// import ProductList from './pages/ProductList'
// import Register from './pages/Register'
// import ProductDetail from './pages/ProductDetail'
// import Cart from './pages/Cart'
// import ChangePassword from './pages/User/Pages/ChangePassword'
// import Profile from './pages/User/Pages/Profile'
// import HistoryPurchase from './pages/User/Pages/HistoryPurchase'
// import NotFound from './pages/NotFound'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

// prevent user navigate to login when authenticated
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}

const Login = lazy(() => import('./pages/Login'))
const ProductList = lazy(() => import('./pages/ProductList'))
const Profile = lazy(() => import('./pages/User/Pages/Profile'))
const Register = lazy(() => import('./pages/Register'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const ChangePassword = lazy(() => import('./pages/User/Pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('./pages/User/Pages/HistoryPurchase'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense fallback={<div>Loading ...</div>}>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElements
}
