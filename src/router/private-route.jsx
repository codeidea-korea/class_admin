import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import { Lucide } from "@/base-components";

export function PrivateRoute({ element, role }) {
	const user = useRecoilValue(userState);
	const userRole = user.authority
    const navigate = useNavigate();

    if (!role.includes(userRole)) {
        return (
            <>
                <div className="p-5 text-center">
                    <Lucide icon="XCircle" className="w-16 h-16 text-danger mx-auto mt-3"/>
                    <div className="text-3xl mt-5">Are you sure?</div>
                    <div className="text-slate-500 mt-2">
                        접근 권한이 없습니다.
                    </div>
                </div>
                <div className="px-5 pb-8 text-center">
                    <button type="button" className="btn btn-danger" onClick={() => navigate(-1)}>
                        이전 페이지로
                    </button>
                </div>
            </>
        );
    }

    return element;
}
