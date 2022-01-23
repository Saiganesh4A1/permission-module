import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import store from './redux/store'
import SideNavbar from './components/SideNavbar';
import ListRoles from './pages/roles/ListRoles';
import CreateRole from './pages/roles/CreateRole';
import ViewAsset from './pages/assets/ViewAsset';
import CreateAsset from './pages/assets/CreateAsset';
import UsersList from './pages/users/UsersList'
import AddUserForm from './pages/users/AddUserForm';
import EditUserForm from './pages/users/EditUserForm';
import SuccessSnackbar from './components/SuccessSnackbar'
import EditAsset from './pages/assets/EditAsset';
import UsersRole from './pages/roles/UsersRole';
import EditRole from './pages/roles/EditRole';
import MenuPrivilege from './pages/assets/MenuPrivilege';
import Listpermissions from './pages/permissions/listpermissions';
import Createperm from './pages/permissions/createperm';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <SuccessSnackbar />
          <Routes>
            <Route path="/" element={<><SideNavbar /> </>} />
            <Route path="/roles" element={<><SideNavbar /> <ListRoles /></>} />
            <Route path="/permission" element={<><SideNavbar/><Listpermissions/></>}></Route>
            <Route path='/perm/create' element={<><SideNavbar/><Createperm/></>}></Route>
            <Route exact path="/role/users" element={<><SideNavbar /> <UsersRole /></>} />
            <Route exact path="/roles/create" element={<><SideNavbar /> <CreateRole /></>} />
            <Route path="/role/edit" element={<><SideNavbar /><EditRole /> </>} />
            <Route path="/asset" element={<><SideNavbar /><ViewAsset /></>} />
            <Route exact path="/asset/create" element={<><SideNavbar /><CreateAsset /></>} />
            <Route path="/asset/edit" element={<><SideNavbar /><EditAsset /></>} />
            <Route path="/users" element={<><SideNavbar /><UsersList /> </>} />
            <Route path="/user/create" element={<><SideNavbar /><AddUserForm /> </>} />
            <Route path="/user/edit" element={<><SideNavbar /><EditUserForm /> </>} />
            <Route path="/asset/privileges" element={<><SideNavbar /> <MenuPrivilege /> </>} />
            {/* <Route path="/user" element={<><SideNavbar /><UsersList /> </>} />
              <Route path="/user/create" element={<><SideNavbar /><AddUserForm /> </>} />
              <Route path="/user/edit" element={<><SideNavbar /><EditUserForm /> </>} />
              <Route path="/asset" element={<><SideNavbar /><ViewAsset /></>} />
              <Route exact path="/asset/create" element={<><SideNavbar /><CreateAsset /></>} />
              <Route path="/roles" element={<><SideNavbar /> <ListRoles/></>} />
              <Route exact path="/roles/create" element={<><SideNavbar /> <CreateRole /></>} />
              <Route exact path="/roles/users" element={<><SideNavbar /> <UsersRole /></>} /> */}
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
