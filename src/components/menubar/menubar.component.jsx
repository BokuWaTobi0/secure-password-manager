import { Fragment, useState } from 'react';
import './menubar.styles.scss';
import { Outlet } from 'react-router-dom';
import HomeSvg from '../../assets/password-svgrepo-com.svg'
import { RiAiGenerate,RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineAssessment,MdBarChart  } from "react-icons/md";
import { CgDatabase } from "react-icons/cg";
import { FaUserAstronaut } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { BiHealth } from "react-icons/bi";

const navIcons=[MdBarChart,BiHealth,RiAiGenerate,MdOutlineAssessment,RiLockPasswordLine,CgDatabase];
const nameArray=['Overview','Password Health','Generate passwords','Check password strength','Access Methods','Add passwords'];


const Menubar = () => {
    const [page,setPage]=useState('');
    const router = useNavigate();

    const handleNavIconClick=(name)=>{
        const route = name.replace(/\s/g,'-').toLowerCase();
        router(route)
        setPage(name)
    }

    return ( 
        <Fragment>
            <div className='menubar-div'>
            <div className='m-logo' onClick={()=>router('dashboard')}>
                    <img src={HomeSvg} />
                    SPM
                </div>
                <div className='navs'>
                    {navIcons.map((Icon,index)=>{
                        return <div className='icon' key={`menubar-icons-${index}`} onClick={()=>handleNavIconClick(nameArray[index])} style={{backgroundColor:page === nameArray[index] ? 'ghostwhite' :'',color:page === nameArray[index] ? 'black' :''}}>
                            <Icon title={nameArray[index]} />
                        </div>
                    })}
                </div>
                <div className='user-pic' >
                    <FaUserAstronaut/>
                </div>
            </div>
            <div className='container'>
            <Outlet/>
            </div>
        </Fragment>
     );
}
 
export default Menubar;