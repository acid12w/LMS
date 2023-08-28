import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
    const token = useSelector(state => state.auth.token);
    let isInstructor = false;
    let isStudent = false;

    if(token){
        const decoded = jwtDecode(token);
        const {roles} = decoded;

        isInstructor = roles.includes('Instructor');
        isStudent = roles.includes('student');

        return {roles, isInstructor, isStudent}
    }

    return {roles: [], isStudent, isInstructor};
}

export default useAuth;