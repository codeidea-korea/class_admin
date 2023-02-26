import $ from "jquery";
import React, { useState, useEffect } from "react";
import { Lucide } from "@/base-components";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";

function ClType(props) {
    const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);

    const [selField, setSelField] = useState({id:0, ord:0});
    const [selSchool, setSelSchool] = useState({id:0, ord:0});
    const [selType, setSelType] = useState({id:0, ord:0});
    const [statementList, setStatementList] = useState();
    const [schoolStatementList, setSchoolStatementList] = useState([]);
    const [typeStatementList, setTypeStatementList] = useState([]);
    const [fieldStatementParams, setFieldStatememtParams] = useState({name: ''})
    const [schoolStatementParams, setSchoolStatememtParams] = useState({fieldId: 0, name: ''})
    const [typeStatementParams, setTypeStatememtParams] = useState({schoolId: 0, name: ''})

    /** 지원영역, 지원학교, 지원전형 전체목록 */
    const personalStatement = async () => {
        await api.get(`/admin/personal-statement`, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			console.log('personalStatement', res)
			if (res.status === 200) {
				setStatementList(res.data);
                if (selField.id > 0){
                    setSchoolStatementList(res.data[selField.ord].schoolList);
                }
                if (selSchool.id > 0){
                    setTypeStatementList(res.data[selField.ord].schoolList[selSchool.ord].typeList);
                }
			}
		})
		.catch((err) => {
			console.log('error', err);
			if (err.response.status === 403){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
    }

    /** 지원 영역, 학교, 전형 추가 요청 */
    const addStatement = async (rtype) => {
        if (rtype === "field"){
            if (fieldStatementParams.name === "") { alert('추가할 지원영역을 입력해주세요.'); return false; }
            await api.post(`/admin/personal-statement/${rtype}`, fieldStatementParams,  
                {headers: {Authorization: `Bearer ${user.token}`}})
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setFieldStatememtParams({ ...fieldStatementParams, name: '' });
                    personalStatement();
                }
            }).catch((err) => {
                console.log(err.response.data.msg);
            });
        }else if (rtype === "school"){
            if (schoolStatementParams.name === "") { alert('추가할 지원학교를 입력해주세요.'); return false; }
            if (selField.id === 0) { alert('지원영역을 선택해주세요.'); return false; }
            await api.post(`/admin/personal-statement/${rtype}`, schoolStatementParams,  
                {headers: {Authorization: `Bearer ${user.token}`}})
            .then((res) => {
                console.log('addStatement.school', res)
                if (res.status === 200) {
                    setSchoolStatememtParams({ ...schoolStatementParams, name: '' })
                    personalStatement();
                }
            }).catch((err) => {
                console.log(err.response.data.msg);
            });
        }else if (rtype === "type"){
            if (typeStatementParams.name === "") { alert('추가할 지원전형을 입력해주세요.'); return false; }
            if (selField.id === 0) { alert('지원영역을 선택해주세요.'); return false; }
            if (selSchool.id === 0) { alert('지원학교를 선택해주세요.'); return false; }
            await api.post(`/admin/personal-statement/${rtype}`, typeStatementParams,  
                {headers: {Authorization: `Bearer ${user.token}`}})
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setTypeStatememtParams({ ...typeStatementParams, name: '' })
                    personalStatement();
                }
            }).catch((err) => {
                console.log(err.response.data.msg);
            });
        }
    }

    /** 지원 영역, 학교, 전형 삭제 요청 */
    const removeStatement = async (pkid, rtype) => {
        await api.delete(`/admin/personal-statement/${rtype}/${pkid}`,  
            {headers: {Authorization: `Bearer ${user.token}`}})
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                if (rtype === "field"){
                    $('.fieldList').removeClass('on'); 
                }else if (rtype === "school"){
                    $('.schoolList').removeClass('on'); 
                }else if (rtype === "type"){
                    $('.typeList').removeClass('on'); 
                }
                personalStatement();
            }
        }).catch((err) => {
            console.log(err.response.data.msg);
        });
    }

    /** 지원영역 선택시 */
    const handleFieldList = async (idx) => {
        $('.fieldList').removeClass('on');
        $(`.fieldList:eq(${idx})`).addClass('on');
        $('.schoolList').removeClass('on');
        setSelField({ ...selField, id: statementList[idx].id, ord: idx });
        setSchoolStatememtParams({ ...schoolStatementParams, fieldId: statementList[idx].id })
        setSelSchool({ ...selField, id: 0, ord: 0 });
        setSelType({ ...selField, id: 0, ord: 0 });
        setSchoolStatementList(statementList[idx].schoolList);
        setTypeStatementList([]);
        props.setPsnStat({ ...props.psnStat, 
            fieldId: statementList[idx].id, fieldOrd: idx, 
            schoolId: 0, schoolOrd: 0, 
            typeId: 0, typeOrd: 0, 
        });
    }

    /** 지원학교 선택시 */
    const handleSchoolList = async (idx) => {
        $('.schoolList').removeClass('on');
        $(`.schoolList:eq(${idx})`).addClass('on');
        setSelSchool({ ...selSchool, id: schoolStatementList[idx].id, ord: idx });
        setTypeStatememtParams({ ...typeStatementParams, schoolId: schoolStatementList[idx].id });
        setSelType({ ...selType, id: 0, ord: 0 });
        setTypeStatementList(schoolStatementList[idx].typeList);
        props.setPsnStat({ ...props.psnStat, 
            fieldId: selField.id, fieldOrd: selField.ord, 
            schoolId: schoolStatementList[idx].id, schoolOrd: idx, 
            typeId: 0, typeOrd: 0, 
        });
    }

    /** 지원전형 선택시 */
    const handleTypeList = async (idx) => {
        $('.typeList').removeClass('on');
        $(`.typeList:eq(${idx})`).addClass('on');
        setSelType({ ...selType, id: typeStatementList[idx].id, ord: idx });
        props.setPsnStat({ ...props.psnStat, 
            fieldId: selField.id, fieldOrd: selField.ord, 
            schoolId: selSchool.id, schoolOrd: selSchool.ord, 
            typeId: typeStatementList[idx].id, typeOrd: idx, 
        });
    }

    useEffect(() => {
        (async () => {
            await personalStatement();
        })();
    }, []);

	return (
		<React.Fragment>
            <div className="mt-5 flex gap-20">

                {/* 지원 영역 */}
                <div className="w-full intro-y">
                    <div className="text-lg font-bold">지원영역</div>
                    <div className="flex items-center gap-2">
                        <input type="text" className="form-control" value={fieldStatementParams.name}
                            onChange={(event) => {
                                setFieldStatememtParams({ ...fieldStatementParams, name: event.currentTarget.value })
                            }}
                        />
                        <button className="btn btn-outline-primary border-dotted" onClick={() => {addStatement('field')}}>
                            <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                        </button>
                    </div>
                    <div className="box mt-3 border border-slate-200 p-5 flex flex-col gap-2">
                        {statementList?.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center w-full p-2 rounded-md supportlist fieldList"
                                            onClick={() => {handleFieldList(index)}} 
                                        >
                                            <div className="flex items-center">
                                                <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                                                {item.name}
                                            </div>
                                        </button>
                                        <button className="btn bg-slate-100 hover:btn-danger btn-sm" onClick={()=>{removeStatement(item.id, 'field')}}>
                                            <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
                                        </button>
                                        
                                    </div>
                                    
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
                
                {/* 지원 학교 */}
                <div className="w-full intro-y">
                    <div className="text-lg font-bold">지원학교</div>
                    <div className="flex items-center gap-2">
                        <input type="text" className="form-control" value={schoolStatementParams.name}
                            onChange={(event) => {
                                setSchoolStatememtParams({ ...schoolStatementParams, name: event.currentTarget.value })
                            }}
                        />
                        <button className="btn btn-outline-primary border-dotted" onClick={() => {addStatement('school')}}>
                            <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                        </button>
                    </div>
                    {schoolStatementList.length > 0 && (
                        <div className="box mt-3 border border-slate-200 p-5 flex flex-col gap-2">
                            {schoolStatementList.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className="flex items-center gap-2">
                                            <button key={index} className="flex items-center w-full p-2 rounded-md supportlist schoolList" 
                                                onClick={() => {handleSchoolList(index)}} 
                                            >
                                                <div className="flex items-center">
                                                    <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                                                    {item.name}
                                                </div>
                                            </button>
                                            <button className="btn bg-slate-100 hover:btn-danger btn-sm" onClick={()=>{removeStatement(item.id, 'field')}}>
                                                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
                                            </button>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    )}
                </div>
                            
                {/* 지원 전형 */}
                <div className="w-full intro-y">
                    <div className="text-lg font-bold">지원전형</div>
                    <div className="flex items-center gap-2">
                        <input type="text" className="form-control" value={typeStatementParams.name}
                            onChange={(event) => {
                                setTypeStatememtParams({ ...typeStatementParams, name: event.currentTarget.value })
                            }}
                        />
                        <button className="btn btn-outline-primary border-dotted" onClick={() => {addStatement('type')}}>
                            <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                        </button>
                    </div>
                    {typeStatementList.length > 0 && (
                        <div className="box mt-3 border border-slate-200 p-5 flex flex-col gap-2">
                            {typeStatementList.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className="flex items-center gap-2">
                                            <button key={index} className="flex items-center w-full p-2 rounded-md supportlist typeList" 
                                                onClick={() => {handleTypeList(index)}} 
                                            >
                                                <div className="flex items-center">
                                                    <Lucide icon="Check" className="w-4 h-4 mr-2"></Lucide>
                                                    {item.name}
                                                </div>
                                            </button>
                                            <button className="btn bg-slate-100 hover:btn-danger btn-sm" onClick={()=>{removeStatement(item.id, 'field')}}>
                                                <Lucide icon="X" className="w-4 h-4 ml-auto"></Lucide>
                                            </button>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default ClType;
