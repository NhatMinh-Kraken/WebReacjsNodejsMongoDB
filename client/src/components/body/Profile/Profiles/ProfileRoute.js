// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Route, Switch } from 'react-router-dom'
// import ProfileAllUser from './ProfileAllUser'
// import ProfileItem from './ProfileItem'

// import EditRoleUser from './EditRoleUser'
// import NotFound from '../../../utils/NotFound/NotFound'

// import Address2 from '../Address/Address2'

// import Address from '../Address/Address'

// import ChangePassword from '../ChangePassword/ChangePassword'
// import CategoryCar from './CategoryCar.js/CategoryCar'
// import CreateProduct from './ProductCarAdmin/CreateProduct'

// function ProfileRoute() {
//     const auth = useSelector(state => state.auth)
//     const { isLogged, isAdmin } = auth
//     return (
//         <Switch>
//             <Route path="/profileuser" component={isLogged ? ProfileItem : NotFound} exact />
//             <Route path="/all-user" component={isAdmin ? ProfileAllUser : NotFound} exact />
//             <Route path="/edit_user/:id" component={isAdmin ? EditRoleUser : NotFound} exact />
//             <Route path="/address" component={isLogged ? Address : NotFound} exact />
//             <Route path="/changePassword" component={isLogged ? ChangePassword : NotFound} exact />
//             <Route path="/all-category" component={isAdmin ? CategoryCar : NotFound} exact />
//             <Route path="/create-product" component={isAdmin ? CreateProduct : NotFound} exact />
//         </Switch>
//     )
// }

// export default ProfileRoute