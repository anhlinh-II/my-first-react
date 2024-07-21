import 'react-pro-sidebar/dist/css/styles.css';
// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import {
     ProSidebar,
     Menu,
     MenuItem,
     SubMenu,
     SidebarHeader,
     SidebarFooter,
     SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';

import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md';
import './Sidebar.scss';
import { Link, useNavigate } from 'react-router-dom';

import sidebarBg from '../../assets/bg2.jpg';


const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {

     const naviage = useNavigate();

     return (
          <>
               <ProSidebar
                    image={image ? sidebarBg : false}
                    collapsed={collapsed}
                    toggled={toggled}
                    breakPoint="md"
                    onToggle={handleToggleSidebar}
               >
                    <SidebarHeader>
                         <div
                              style={{
                                   padding: '24px',
                                   textTransform: 'uppercase',
                                   fontWeight: 'bold',
                                   fontSize: 14,
                                   letterSpacing: '1px',
                                   overflow: 'hidden',
                                   textOverflow: 'ellipsis',
                                   whiteSpace: 'nowrap',
                              }}
                         >
                              <DiReact size={'3em'} color='00bfff' />
                              <span onClick={() => naviage('/')}>
                                   HOI THUY VAN
                              </span>
                         </div>
                    </SidebarHeader>

                    <SidebarContent>
                         <Menu iconShape="circle">
                              <MenuItem
                                   icon={<FaTachometerAlt />}
                              >
                                   dashboard
                                   <Link to="/admins" />
                              </MenuItem>
                         </Menu>
                         <Menu iconShape="circle">
                              <SubMenu
                                   icon={<FaGem />}
                                   title="Features"
                              >
                                   <MenuItem>
                                        Quản Lý User
                                        <Link to="/admins/manage-users" />
                                   </MenuItem>
                                   <MenuItem>
                                        Quản Lý Bài Quiz
                                        <Link to="/admins/manage-quizzes" />
                                   </MenuItem>
                                   <MenuItem>
                                        Quản Lý Câu Hỏi
                                        <Link to="/admins/manage-questions" />
                                   </MenuItem>
                              </SubMenu>

                         </Menu>
                    </SidebarContent>

                    <SidebarFooter style={{ textAlign: 'center' }}>
                         <div
                              className="sidebar-btn-wrapper"
                              style={{
                                   padding: '20px 24px',
                              }}
                         >
                              <a
                                   href="https://github.com/azouaoui-med/react-pro-sidebar"
                                   target="_blank"
                                   className="sidebar-btn"
                                   rel="noopener noreferrer"
                              >
                                   <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                        &#169; Hoi ThuyVan Ne
                                   </span>
                              </a>
                         </div>
                    </SidebarFooter>
               </ProSidebar>

          </>
     )
}

export default SideBar