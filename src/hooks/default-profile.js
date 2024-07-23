import avatar1 from '../assets/avatar-01.png';
import avatar2 from '../assets/avatar2.png';


export const defalutProfile = (room) => {

    let avatar;

    if(room === 'general'){
        avatar = avatar1;
    }
    if(room === 'notice'){
        avatar = avatar2;
    }


    return( 
        <div className="text-3xl p-4 bg-cover bg-center mr-2 rounded-full h-12 w-12" style={{backgroundImage: `url(${avatar1})`}}></div> 
    )
    
} 