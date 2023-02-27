import {TabGroup, TabList, Tab, TabPanels, TabPanel} from "@/base-components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";
import ClType from "@/views/coverletter_mng/cl_type";
import ClNote from "@/views/coverletter_mng/cl_note";
import ClQuestion from "@/views/coverletter_mng/cl_question";
import ClOutline from "@/views/coverletter_mng/cl_outline";

function CoverletterMng() {
	const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);

	const [psnStat, setPsnStat] = useState({
		fieldId: 0, fieldOrd: 0, schoolId: 0, schoolOrd: 0, typeId: 0, typeOrd: 0
	})
	const [psnNote, setPsnNote] = useState({note: '', confirm: ''})
	const [psnActivity, setPsnActivity] = useState('N')
	const [questionList, setQuestionList] = useState();
	const [outlineList, setOutlineList] = useState();
	const [questionLength, setQuestionLength] = useState(0);
	const [outlineLength, setOutlineLength] = useState(0);
	const [selTab, setSelTab] = useState('question');

	/** 지원영역, 지원학교, 지원전형 전체목록 */
    const personalStatement = async () => {
        await api.get(`/admin/personal-statement`, 
			{headers: {Authorization: `Bearer ${user.token}`}}
		).then((res) => {
			//console.log('personalStatement', res)
			if (res.status === 200) {
				setPsnNote({ ...psnNote, 
					note: res.data[psnStat.fieldOrd].schoolList[psnStat.schoolOrd].typeList[psnStat.typeOrd].note, 
					confirm: res.data[psnStat.fieldOrd].schoolList[psnStat.schoolOrd].typeList[psnStat.typeOrd].confirm 
				})
				setPsnActivity(res.data[psnStat.fieldOrd].schoolList[psnStat.schoolOrd].typeList[psnStat.typeOrd].activityYN);
				setQuestionList(res.data[psnStat.fieldOrd].schoolList[psnStat.schoolOrd].typeList[psnStat.typeOrd].questionList);
				setOutlineList(res.data[psnStat.fieldOrd].schoolList[psnStat.schoolOrd].typeList[psnStat.typeOrd].outlineList);
				setQuestionLength(res.data[psnStat.fieldOrd].schoolList[psnStat.schoolOrd].typeList[psnStat.typeOrd].questionList.length);
				setOutlineLength(res.data[psnStat.fieldOrd].schoolList[psnStat.schoolOrd].typeList[psnStat.typeOrd].outlineList.length);
				console.log('type-data', res.data[psnStat.fieldOrd].schoolList[psnStat.schoolOrd].typeList[psnStat.typeOrd]);
			}
		}).catch((err) => {
			console.log('error', err);
			if (err.response.status === 403){
				alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); 
				navigate('/login');
			}
		});
    }

	// 탭 시작
	const [activeIndex, setActiveIndex]=useState(0);

    const tabClickHandler=(index)=>{
        setActiveIndex(index);
    };

	useEffect(() => {
        (async () => {
			if (psnStat.typeId > 0){
				personalStatement();
			}
        })();
    }, [psnStat]);

	const tabContArr=[
		// 자기소개서 문항
        {
            tabTitle:(
                <li className={activeIndex===0 ? "is-active nav-item flex-1" : "nav-item flex-1"} onClick={()=>tabClickHandler(0)}>
					<button className="btn w-full py-2 border-slate-200">자기소개서 문항</button>
				</li>
            ),
            tabCont:(
                <ClQuestion 
					typeId={psnStat.typeId} 
					psnActivity={psnActivity} setPsnActivity={setPsnActivity} 
					questionList={questionList} setQuestionList={setQuestionList} questionLength={questionLength} 
					personalStatement={personalStatement}
					selTab={selTab} setSelTab={setSelTab}
				/>
            )
        },
		// 자기소개서 개요표
        {
            tabTitle:(
                <li className={activeIndex===1 ? "is-active nav-item flex-1" : "nav-item flex-1"} onClick={()=>tabClickHandler(1)}>
					<button className="btn w-full py-2 border-slate-200">자기소개서 개요표</button>
				</li>
            ),
            tabCont:(
                <ClOutline 
					typeId={psnStat.typeId} 
					psnActivity={psnActivity} setPsnActivity={setPsnActivity} 
					outlineList={outlineList} setOutlineList={setOutlineList} outlineLength={outlineLength} 
					personalStatement={personalStatement}
					selTab={selTab} setSelTab={setSelTab}
				/>
            )
        }
    ];
	// 탭 끝

	return (
		<React.Fragment>
			<div className="intro-y box p-5 mt-5">
				<div className="p-5 bg-slate-50">
					<div className="font-bold text-lg">자기소개서 편집 설정 방법</div>
					<ul className="flex flex-col gap-2 mt-3">
						<li>1. 지원영역을 선택 해 주세요.</li>
						<li>2. 영역에 따른 학교를 선택해주세요.</li>
						<li>3. 지원 전형을 선택해주세요.</li>
						<li>4. 자기소개서 문항을 편집기능을 통해 추가하거나 제거할 수 있습니다.</li>
						<li>5. 자기소개서 개요표 문항을 편집기능을 통해 추가하거나 제거할 수 있습니다.</li>
					</ul>
				</div>

				{/* 지원영역, 지원학교, 지원전형 */}
				<ClType psnStat={psnStat} setPsnStat={setPsnStat} />
				
				
				{psnStat.typeId > 0 && (
					<React.Fragment>
						{/* 자기소개소 유의사항, 지원학생확인서약 */}
						<ClNote 
							typeId={psnStat.typeId} 
							psnNote={psnNote} setPsnNote={setPsnNote} 
							personalStatement={personalStatement}
						/>
						{/* 기존소스 */}
						{/* <TabGroup className="mt-6 intro-y">
							<TabList className="nav-boxed-tabs gap-6">
								<Tab className="w-full py-2 border-slate-200" tag="button" onClick={()=>{console.log('question')}}>자기소개서 문항</Tab>
								<Tab className="w-full py-2 border-slate-200" tag="button" onClick={()=>{console.log('outline')}}>자기소개서 개요표</Tab>
							</TabList>
							<TabPanels className="mt-5">
								<TabPanel className="leading-relaxed">
										<ClQuestion 
											typeId={psnStat.typeId} 
											psnActivity={psnActivity} setPsnActivity={setPsnActivity} 
											questionList={questionList} setQuestionList={setQuestionList} questionLength={questionLength} 
											personalStatement={personalStatement}
											selTab={selTab} setSelTab={setSelTab}
										/>
								</TabPanel>
								<TabPanel className="leading-relaxed">
										<ClOutline 
											typeId={psnStat.typeId} 
											psnActivity={psnActivity} setPsnActivity={setPsnActivity} 
											outlineList={outlineList} setOutlineList={setOutlineList} outlineLength={outlineLength} 
											personalStatement={personalStatement}
											selTab={selTab} setSelTab={setSelTab}
										/>
								</TabPanel>
							</TabPanels>
						</TabGroup> */}
					</React.Fragment>	
				)}
				{/* 자기소개서 새로운 탭 */}
				<div className="mt-6 intro-y">
					<ul className="tabs is-boxe nav nav-boxed-tabs gap-6">
						{tabContArr.map((section, index)=>{
							return section.tabTitle
						})}
					</ul>
					<div className="mt-5">
						{tabContArr[activeIndex].tabCont}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default CoverletterMng;
