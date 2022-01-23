// import 

import { combineReducers } from "redux";
import toogleReducer from './reducers/reducer'
import  loginReducer  from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer"
import roleReducer from "./reducers/roleReducers";
import assetReducer from "./reducers/assetReducer"
import snackbarReducer from "./reducers/snackbarReducer";
import usersroleReducer from "./reducers/UsersRoleReducers";
import PermissionReducer from "./reducers/permissionreducer";

const rootReducer = combineReducers({
    toogle:toogleReducer,
    user:loginReducer,
    users: userReducer,
    role:roleReducer,
    snackbar:snackbarReducer,
    asset:assetReducer,
    usersrole:usersroleReducer,
    permissionroot:PermissionReducer
})

export default rootReducer;