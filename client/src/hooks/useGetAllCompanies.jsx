import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const token = Cookies.get("token")
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(res);
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                toast.error(error?.response?.data?.message);
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies