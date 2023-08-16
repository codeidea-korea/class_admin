import { Lucide } from "@/base-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import useAxios from "@/hooks/useAxios";
import {userState} from "@/states/userState";

function LifeRecordView() {
    const location = useLocation();
    const [userInfo, setUserInfo] = useState({ ...location.state });
    const [parseHtml, setParseHtml] = useState({});

    const user = useRecoilValue(userState);
    const api = useAxios();
    const navigate = useNavigate();

    const getStudentLifeRecordList = async (id) => {
        let result = {
            data:{},
        };
        await api.get(`/admin/life-record/${id}`,
            {headers: {Authorization: `Bearer ${user.token}`}})
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    //alert('성공');
                    result = res;
                }
            }).catch((err) => {
                console.log(err);
                if (err.response.status === 401) { alert('토큰이 만료되었습니다. 다시 로그인해주세요.'); navigate('/'); }
            });

        return result;
    };

    useEffect(() => {
        let obj = {};
        getStudentLifeRecordList(userInfo.userId).then((res) => {
            console.log('res > ', res);
            obj = {...res.data};
            obj.attendanceAbsence = JSON.parse(obj.attendanceAbsence);
            obj.awardCareer = JSON.parse(obj.awardCareer);
            obj.creativeExperienceActive = JSON.parse(obj.creativeExperienceActive);
            obj.volunteerActivePerformance = JSON.parse(obj.volunteerActivePerformance);
            obj.studentLearnDevelopStatus = JSON.parse(obj.studentLearnDevelopStatus);
            obj.freeSemesterActiveStatus = JSON.parse(obj.freeSemesterActiveStatus);
            obj.readActiveStatus = JSON.parse(obj.readActiveStatus);
            obj.behaviorCharacterGeneralOpinion = JSON.parse(obj.behaviorCharacterGeneralOpinion);
            setParseHtml({...obj});
        });
    },[userInfo]);

  return (
    <>
      <div className="flex justify-end gap-2 intro-x">
        {/*<button className="btn btn-green flex items-center">
          <Lucide icon="Download" className="w-4 h-4 mr-2"></Lucide>
          다운로드
        </button>*/}
        <Link to="/life_record_edit" state={userInfo}>
          <button className="btn btn-sky ml-auto">
            <Lucide icon="Edit" className="w-4 h-4 mr-2"></Lucide>
            수정하기
          </button>
        </Link>
      </div>
      <div className="intro-y box mt-5 p-5">
        <table className="table table_layout01">
          <tr>
            <td className="w-48">
              <span className="font-bold text-slate-400">이름</span>
            </td>
            <td>{userInfo.name}</td>
          </tr>
          <tr>
            <td className="w-48">
              <span className="font-bold text-slate-400">구분</span>
            </td>
            <td>{userInfo.gubun}</td>
          </tr>
          <tr>
            <td className="w-48">
              <span className="font-bold text-slate-400">학교</span>
            </td>
            <td>{userInfo.schoolName}</td>
          </tr>
          <tr>
            <td className="w-48">
              <span className="font-bold text-slate-400">전화번호</span>
            </td>
            <td>{userInfo.phone}</td>
          </tr>
        </table>
      </div>

      {/* 생활기록부 시작 작성 */}
      {/* 출결상황 */}
      <div className="container mt-5">
          <div className="box">
              <div className="p-5 border-b">
                  <h2 id="wq_uuid_503" className='text-lg font-bold'>출결상황</h2>
              </div>
              <div className="p-5">
                  <div className="overflow-x-auto">
                      <table id="wq_uuid_504" className="table table-bordered">
                          <caption className="dp_none" id="wq_uuid_505">출결상황 - 학년,수업일수,결석일수,지각,조퇴,결과,특기사항 등을 제공하는 표</caption>
                          <colgroup id="wq_uuid_603">
                              <col id="wq_uuid_604" style={{width:'80px'}}/>
                              <col id="wq_uuid_605" style={{width:'10%'}}/>
                              <col id="wq_uuid_606" style={{width:'6.67%'}}/>
                              <col id="wq_uuid_607" style={{width:'width:100px;'}}/>
                          </colgroup>
                          <thead id="wq_uuid_522" className="whitespace-nowrap text-center">
                              <tr id="wq_uuid_523">
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_524" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_525">학년</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_526" scope="row" colSpan={1} rowSpan={2}><span id="wq_uuid_527">수업일수</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_528" scope="colgroup" colSpan={3} rowSpan={1}><span id="wq_uuid_529">결석일수</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_530" colSpan={3} rowSpan={1} scope="colgroup"><span id="wq_uuid_531">지각</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_532" colSpan={3} rowSpan={1} scope="colgroup"><span id="wq_uuid_533">조퇴</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_534" colSpan={3} rowSpan={1} scope="colgroup"><span id="wq_uuid_535">결과</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_536" colSpan={1} rowSpan={2} scope="col"><span id="wq_uuid_537">특기사항</span></th>
                              </tr>
                              <tr id="wq_uuid_538" className="w2group ">
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_539" scope="col"><span id="wq_uuid_540">질병</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_541" scope="col"><span id="wq_uuid_542">미인정</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_543" scope="col"><span id="wq_uuid_544">기타</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_545" scope="col"><span id="wq_uuid_546">질병</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_547" scope="col"><span id="wq_uuid_548">미인정</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_549" scope="col"><span id="wq_uuid_550">기타</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_551" scope="col"><span id="wq_uuid_552">질병</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_553" scope="col"><span id="wq_uuid_554">미인정</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_555" scope="col"><span id="wq_uuid_556">기타</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_557" scope="col"><span id="wq_uuid_558">질병</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_559" scope="col"><span id="wq_uuid_560">미인정</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_561" scope="col"><span id="wq_uuid_562">기타</span></th>
                              </tr>
                          </thead>
                          <tbody id="gen05" className="whitespace-nowrap text-center">
                          {Object.entries(parseHtml).map(([key, item]) => {
                              if (key === 'attendanceAbsence') {
                                  const array = item;
                                  return array.map((data, index) => (
                                      <tr id={`attendance_absence_tr_${index}`}>
                                          <td><span>{data.class}</span></td>
                                          <td><span>{data.row.school_day.school_day}</span></td>
                                          <td><span>{data.row.absent.absent}</span></td>
                                          <td><span>{data.row.absent.not_accept}</span></td>
                                          <td><span>{data.row.absent.etc}</span></td>
                                          <td><span>{data.row.late.absent}</span></td>
                                          <td><span>{data.row.late.not_accept}</span></td>
                                          <td><span>{data.row.late.etc}</span></td>
                                          <td><span>{data.row.early_leave.absent}</span></td>
                                          <td><span>{data.row.early_leave.not_accept}</span></td>
                                          <td><span>{data.row.early_leave.etc}</span></td>
                                          <td><span>{data.row.result.absent}</span></td>
                                          <td><span>{data.row.result.not_accept}</span></td>
                                          <td><span>{data.row.result.etc}</span></td>
                                          <td><span>{data.row.special.special}</span></td>
                                      </tr>
                                  ))
                              }
                          })}
                              {/*<tr id="wq_uuid_1155" >
                                  <td id="wq_uuid_1156"><span id="gen05_0_txbE1">1</span></td>
                                  <td id="wq_uuid_1158"><span id="gen05_0_txbE2">190</span></td>
                                  <td id="wq_uuid_1160"><span id="gen05_0_txbE3">.</span></td>
                                  <td id="wq_uuid_1162"><span id="gen05_0_txbE4">.</span></td>
                                  <td id="wq_uuid_1164"><span id="gen05_0_txbE5">.</span></td>
                                  <td id="wq_uuid_1166"><span id="gen05_0_txbE6">.</span></td>
                                  <td id="wq_uuid_1168"><span id="gen05_0_txbE7">.</span></td>
                                  <td id="wq_uuid_1170"><span id="gen05_0_txbE8">.</span></td>
                                  <td id="wq_uuid_1172"><span id="gen05_0_txbE9">.</span></td>
                                  <td id="wq_uuid_1174"><span id="gen05_0_txbE10">.</span></td>
                                  <td id="wq_uuid_1176"><span id="gen05_0_txbE11">.</span></td>
                                  <td id="wq_uuid_1178"><span id="gen05_0_txbE12">.</span></td>
                                  <td id="wq_uuid_1180"><span id="gen05_0_txbE13">.</span></td>
                                  <td id="wq_uuid_1182"><span id="gen05_0_txbE14">.</span></td>
                                  <td id="wq_uuid_1184"><span id="gen05_0_txbE15">.</span></td>
                              </tr>
                              <tr id="wq_uuid_1186">
                                  <td id="wq_uuid_1187" ><span id="gen05_1_txbE1">2</span></td>
                                  <td id="wq_uuid_1189" ><span id="gen05_1_txbE2">126</span></td>
                                  <td id="wq_uuid_1191" ><span id="gen05_1_txbE3">.</span></td>
                                  <td id="wq_uuid_1193" ><span id="gen05_1_txbE4">.</span></td>
                                  <td id="wq_uuid_1195" ><span id="gen05_1_txbE5">.</span></td>
                                  <td id="wq_uuid_1197" ><span id="gen05_1_txbE6">.</span></td>
                                  <td id="wq_uuid_1199" ><span id="gen05_1_txbE7">.</span></td>
                                  <td id="wq_uuid_1201" ><span id="gen05_1_txbE8">.</span></td>
                                  <td id="wq_uuid_1203" ><span id="gen05_1_txbE9">.</span></td>
                                  <td id="wq_uuid_1205" ><span id="gen05_1_txbE10">.</span></td>
                                  <td id="wq_uuid_1207" ><span id="gen05_1_txbE11">.</span></td>
                                  <td id="wq_uuid_1209" ><span id="gen05_1_txbE12">.</span></td>
                                  <td id="wq_uuid_1211" ><span id="gen05_1_txbE13">.</span></td>
                                  <td id="wq_uuid_1213" ><span id="gen05_1_txbE14">.</span></td>
                                  <td id="wq_uuid_1215" ><span id="gen05_1_txbE15">.</span></td>
                              </tr>*/}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
                
      {/* 수상경력 */}
      <div className="container mt-5">
          <div className="box">
              <div className="p-5 border-b">
                  <h2 id="wq_uuid_565" className='text-lg font-bold'>수상경력</h2>
              </div>
              <div className="p-5">
                  <div className="overflow-x-auto">
                      <table id="wq_uuid_566" className="table table-bordered">
                          <caption className="dp_none" id="wq_uuid_567">수상경력 - 수상구분,수상명,등급,수상년월일,수여기관,참가대상을 제공하는 표</caption>
                          <colgroup id="wq_uuid_568">
                              <col id="wq_uuid_569" style={{width:'80px'}}/>
                              <col id="wq_uuid_570" style={{width:'80px'}}/>
                              <col id="wq_uuid_571" style={{width:'20%'}}/>
                              <col id="wq_uuid_572" style={{width:'12%'}}/>
                              <col id="wq_uuid_573" style={{width:'18%'}}/>
                              <col id="wq_uuid_574" style={{width:'18%'}}/>
                              <col id="wq_uuid_575" style={{width:'18%'}}/>
                          </colgroup>
                          <thead id="wq_uuid_576" className="whitespace-nowrap text-center">
                              <tr id="wq_uuid_577" >
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_578" colSpan={2}><span id="wq_uuid_579">학년<br/>(학기)</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_580" scope="col"><span id="wq_uuid_581">수상명</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_582" scope="col"><span id="wq_uuid_583">등급(위)</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_584" scope="col"><span id="wq_uuid_585">수상연월일</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_586" scope="col"><span id="wq_uuid_587">수여기관</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_588" scope="col"><span id="wq_uuid_589">참가대상(참가인원)</span></th>
                              </tr>
                          </thead>
                          <tbody id="gen06" className="whitespace-nowrap text-center">
                          {Object.entries(parseHtml).map(([key, item]) => {
                              if (key === 'awardCareer') {
                                  const array = item;
                                  return array.map((data, index) => (
                                      <tr id={`award_career_tr_${index}`}>
                                          <td><span>{data.class}</span></td>
                                          <td><span>{data.semester}</span></td>
                                          <td><span>{data.award_name}</span></td>
                                          <td><span>{data.rank}</span></td>
                                          <td><span>{data.award_date}</span></td>
                                          <td><span>{data.agency}</span></td>
                                          <td><span>{data.target}</span></td>
                                      </tr>
                                  ))
                              }
                          })}
                              {/*<tr id="gen06_0_trMerge6" >
                                  <td id="gen06_0_tdMerge6"><span id="gen06_0_txbG7">2</span></td>
                                  <td id="gen06_0_tdMerge6_1"><span id="gen06_0_txbG8">1</span></td>
                                  <td id="wq_uuid_1222"><span id="gen06_0_txbG2">교과우수상(역사, 기술·가정)</span></td>
                                  <td id="wq_uuid_1224"><span id="gen06_0_txbG3"></span></td>
                                  <td id="wq_uuid_1226"><span id="gen06_0_txbG4">2022.07.15.</span></td>
                                  <td id="wq_uuid_1228"><span id="gen06_0_txbG5">해연중학교장</span></td>
                                  <td id="wq_uuid_1230"><span id="gen06_0_txbG6">수강자</span></td>
                              </tr>*/}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
                
      {/* 창의적체험활동상황 */}
      <div className="container mt-5">
          <div className="box">
              <div className="p-5 border-b">
                  <h2 id="wq_uuid_599" className='text-lg font-bold'>창의적체험활동상황</h2>
              </div>
              <div className="p-5">
                  {/*<p id="wq_uuid_600" className="text-danger pb-5">창의적체험활동 특기사항, 행동특성 및 종합의견, 세부능력 및 특기사항(초·교과학습발달상황) 내용은 「공공기관의 정보공개에 관한 법률」제9조 제1항 제5호에 따라 내부 검토 중인 사항으로 당해학년도에는 제공하지 않습니다.</p>*/}
                  <div className="overflow-x-auto">
                      <table id="wq_uuid_601" className="table table-bordered">
                          <caption className="dp_none" id="wq_uuid_602">창의적체험활동</caption>
                          <colgroup id="wq_uuid_603">
                              <col id="wq_uuid_604" style={{width:'80px'}}/>
                              <col id="wq_uuid_605" style={{width:'10%'}}/>
                              <col id="wq_uuid_606" style={{width:'10%'}}/>
                              <col id="wq_uuid_607" style={{width:'80px'}}/>
                          </colgroup>
                          <thead id="wq_uuid_608" className="whitespace-nowrap text-center">
                              <tr id="wq_uuid_609">
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_610" scope="col"><span id="wq_uuid_611">학년</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_612" scope="col"><span id="wq_uuid_613">영역</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_614" scope="col"><span id="wq_uuid_615">시간</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_616" scope="col" colSpan={3} rowSpan={2}><span id="wq_uuid_617">특기사항</span></th>
                              </tr>
                          </thead>
                          <tbody id="gen09" className="whitespace-nowrap text-center">
                          {Object.entries(parseHtml).map(([key, item]) => {
                              if (key === 'creativeExperienceActive') {
                                  const array = item;
                                  return array.map((data, index) => {
                                      if (data.area === '자율활동') {
                                          return (
                                              <React.Fragment key={index}>
                                                  <tr id={`creative_experience_active_tr_${index}`}>
                                                      <td rowSpan={6} colSpan={1}><span>{data.class}</span></td>
                                                      <td rowSpan={2} colSpan={1}><span>{data.area}</span></td>
                                                      <td rowSpan={2} colSpan={1}><span>{data.time}</span></td>
                                                  </tr>
                                                  <tr id={`creative_experience_active_tr_${index}_sub`}>
                                                      <td colSpan={3}>
                                                          <p className="whitespace-normal text-left">{data.special.toString()}</p>
                                                      </td>
                                                  </tr>
                                              </React.Fragment>
                                          );
                                      } else if (data.area === '진로활동') {
                                          return (
                                              <React.Fragment key={index}>
                                                  <tr>
                                                      <td rowSpan={2} colSpan={1}><span>{data.area}</span></td>
                                                      <td rowSpan={2} colSpan={1}><span>{data.time}</span></td>
                                                      <th className="bg-slate-100 font-medium" style={{width:'30px'}} colSpan={1}>
                                                          <p>{data.special.special_hope_key}</p>
                                                      </th>
                                                      <td className="whitespace-normal text-left" colSpan={2}>
                                                          <p>{data.special.special_hope_value}</p>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td colSpan={3} >
                                                          <p className="text-left">{data.special.content}</p>
                                                      </td>
                                                  </tr>
                                              </React.Fragment>
                                          );
                                      } else {
                                          return (
                                              <React.Fragment key={index}>
                                                  <tr id={`creative_experience_active_tr_${index}`}>
                                                      <td rowSpan={2} colSpan={1}><span>{data.area}</span></td>
                                                      <td rowSpan={2} colSpan={1}><span>{data.time}</span></td>
                                                  </tr>
                                                  <tr id={`creative_experience_active_tr_${index}_sub`}>
                                                      <td colSpan={3}>
                                                          <p className="whitespace-normal text-left">{data.special.toString()}</p>
                                                      </td>
                                                  </tr>
                                              </React.Fragment>
                                          );
                                      }
                                  });
                              }
                          })}
                              {/*<tr id="gen09_0_hope">
                                  <td id="gen09_0_tdMerge11" rowSpan={6} colSpan={1}><span id="gen09_0_txbJ1">1</span></td>
                                  <td id="gen09_0_tdMerge11_1" rowSpan={2} colSpan={1}><span id="gen09_0_txbJ2">자율활동</span></td>
                                  <td id="gen09_0_tdMerge11_2" rowSpan={2} colSpan={1}><span id="gen09_0_txbJ3">48</span></td>
                              </tr>
                              <tr id="gen09_0_hope2">
                                  <td id="gen09_0_group54" colSpan={3}>
                                      <p id="gen09_0_txbJ4" className="whitespace-normal text-left">
                                        아동학대예방교육(2021.03.05.), 성폭력예방교육(2021.07.13., 2021.11.08.), 학교폭력예방교육(2021.07.13., 2021.12.22.)을 통해 폭력의 범위와 예방법을 배우고 폭력 발생 시 신고 방법 등을 숙지함. 생명존중교육(2021.03.23., 2021.09.10.)
                                      </p>
                                  </td>
                              </tr>
                              <tr id="gen09_1_hope">
                                  <td id="gen09_1_tdMerge11_1" rowSpan={2} colSpan={1}><span id="gen09_1_txbJ2">동아리활동</span></td>
                                  <td id="gen09_1_tdMerge11_2" rowSpan={2} colSpan={1}><span id="gen09_1_txbJ3"></span></td>
                              </tr>
                              <tr id="gen09_1_hope2">
                                  <td id="gen09_1_group54" colSpan={3}>
                                      <p id="gen09_1_txbJ4">.</p>
                                  </td>
                              </tr>
                              <tr id="gen09_2_hope">
                                  <td id="gen09_2_tdMerge11_1" rowSpan={2} colSpan={1}><span id="gen09_2_txbJ2">진로활동</span></td>
                                  <td id="gen09_2_tdMerge11_2" rowSpan={2} colSpan={1}><span id="gen09_2_txbJ3"></span></td>
                                  <th className="bg-slate-100 font-medium" id="gen09_2_group52" style={{width:'30px'}} colSpan={1}>
                                      <p id="wq_uuid_1268" className="whitespace-normal text-left">희망분야</p>
                                  </th>
                                  <td id="gen09_2_group53" colSpan={2}>
                                      <p id="gen09_2_txbJ5" className="whitespace-normal text-left">.</p>
                                  </td>
                              </tr>
                              <tr id="gen09_2_hope2">
                                  <td id="gen09_2_group54" colSpan={3} >
                                      <p id="gen09_2_txbJ4" className="whitespace-normal text-left">.</p>
                                  </td>
                              </tr>
                              <tr id="gen09_3_hope">
                                  <td id="gen09_3_tdMerge11" rowSpan={6} colSpan={1}><span id="gen09_3_txbJ1"></span></td>
                                  <td id="gen09_3_tdMerge11_1" rowSpan={2} colSpan={1}><span id="gen09_3_txbJ2">자율활동</span></td>
                                  <td id="gen09_3_tdMerge11_2" rowSpan={2} colSpan={1}><span id="gen09_3_txbJ3"></span></td>
                              </tr>
                              <tr id="gen09_3_hope2">
                                  <td id="gen09_3_group54" colSpan={3} >
                                      <p id="gen09_3_txbJ4" className="text-danger">해당내용은 「공공기관의 정보공개에 관한 법률」제9조 제1항 제5호에 따라 내부 검토 중인 사항으로 당해학년도에는 제공하지 않습니다.</p>
                                  </td>
                              </tr>
                              <tr id="gen09_4_hope">
                                  <td id="gen09_4_tdMerge11_1" rowSpan={2} colSpan={1}><span id="gen09_4_txbJ2">동아리활동</span></td>
                                  <td id="gen09_4_tdMerge11_2" rowSpan={2} colSpan={1}><span id="gen09_4_txbJ3"></span></td>
                              </tr>
                              <tr id="gen09_4_hope2">
                                  <td id="gen09_4_group54" colSpan={3} >
                                      <p id="gen09_4_txbJ4" className="text-danger">해당내용은 「공공기관의 정보공개에 관한 법률」제9조 제1항 제5호에 따라 내부 검토 중인 사항으로 당해학년도에는 제공하지 않습니다.</p>
                                  </td>
                              </tr>
                              <tr id="gen09_5_hope">
                                  <td id="gen09_5_tdMerge11_1" rowSpan={2} colSpan={1}><span id="gen09_5_txbJ2">진로활동</span></td>
                                  <td id="gen09_5_tdMerge11_2" rowSpan={2} colSpan={1}><span id="gen09_5_txbJ3"></span></td>
                                  <th className="bg-slate-100 font-medium" id="gen09_5_group52" style={{width:'30px'}} colSpan={1} >
                                      <p id="wq_uuid_1310">희망분야</p>
                                  </th>
                                  <td id="gen09_5_group53" colSpan={2} >
                                      <p id="gen09_5_txbJ5" className="text-danger">해당내용은 「공공기관의 정보공개에 관한 법률」제9조 제1항 제5호에 따라 내부 검토 중인 사항으로 당해학년도에는 제공하지 않습니다.</p>
                                  </td>
                              </tr>
                              <tr id="gen09_5_hope2">
                                  <td id="gen09_5_group54" colSpan={3} >
                                      <p id="gen09_5_txbJ4" className="text-danger">해당내용은 「공공기관의 정보공개에 관한 법률」제9조 제1항 제5호에 따라 내부 검토 중인 사항으로 당해학년도에는 제공하지 않습니다.</p>
                                  </td>
                              </tr>*/}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
                
      {/* 봉사활동실적 */}
      <div className="container mt-5">
          <div className="box">
              <div className="p-5 border-b">
                  <h2 id="wq_uuid_627" className='text-lg font-bold'>봉사활동실적</h2>
              </div>
              <div className="p-5">
                  <div className="overflow-x-auto">
                      <table id="wq_uuid_628" className="table table-bordered">
                          <caption className="dp_none" id="wq_uuid_629">봉사활동실적 - 학년,일자,장소,봉사활동내용 및 시간 등을 제공하는 표</caption>
                          <colgroup id="wq_uuid_630">
                              <col id="wq_uuid_631" style={{width:'80px'}}/>
                              <col id="wq_uuid_632" style={{width:'20%'}}/>
                              <col id="wq_uuid_633" style={{width:'20%'}}/>
                              <col id="wq_uuid_634"/>
                              <col id="wq_uuid_635" style={{width:'8%'}}/>
                              <col id="wq_uuid_636" style={{width:'8%'}}/>
                          </colgroup>
                          <thead id="wq_uuid_637" className="whitespace-nowrap text-center">
                              <tr id="wq_uuid_638">
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_639" scope="col"><span id="wq_uuid_640">학년</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_641" scope="col"><span id="wq_uuid_642">일자 또는 기간</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_643" scope="col"><span id="wq_uuid_644">장소 또는 주관기관명</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_645" scope="col"><span id="wq_uuid_646">활동내용</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_647" scope="col"><span id="wq_uuid_648">시간</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_649" scope="col"><span id="wq_uuid_650">누계시간</span></th>
                              </tr>
                          </thead>
                          <tbody id="gen10" className="whitespace-nowrap text-center">
                          {Object.entries(parseHtml).map(([key, item]) => {
                              if (key === 'volunteerActivePerformance') {
                                  const array = item;
                                  let classNum = '';
                                  return array.map((data, index) => {
                                      if(data.class === classNum) {
                                          return (
                                              <tr id={`volunteer_active_performance_tr_${index}`}>
                                                  <td><span>{data.from_to}</span></td>
                                                  <td><span>{data.place_agency}</span></td>
                                                  <td><span>{data.active_content}</span></td>
                                                  <td><span>{data.time}</span></td>
                                                  <td><span>{data.total_time}</span></td>
                                              </tr>
                                          );
                                      } else {
                                          let count = 0;
                                          classNum = data.class;
                                          array.map((data, index) => {
                                              if(data.class === classNum) {
                                                  count++;
                                              }
                                          });
                                          return (
                                              <tr id={`volunteer_active_performance__tr_${index}`}>
                                                  <td rowSpan={count}><span>{data.class}</span></td>
                                                  <td><span>{data.from_to}</span></td>
                                                  <td><span>{data.place_agency}</span></td>
                                                  <td><span>{data.active_content}</span></td>
                                                  <td><span>{data.time}</span></td>
                                                  <td><span>{data.total_time}</span></td>
                                              </tr>
                                          );
                                      }
                                  })
                              }
                          })}
                          {/*<tr id="gen10_0_trMerge10" >
                                  <td id="gen10_0_tdMerge10" rowSpan={9}><span id="gen10_0_txbL1">1</span></td>
                                  <td id="wq_uuid_1319"><span id="gen10_0_txbL2">2021.03.02.</span></td>
                                  <td id="wq_uuid_1321"><span id="gen10_0_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1323"><span id="gen10_0_txbL5">봉사활동 소양교육</span></td>
                                  <td id="wq_uuid_1325"><span id="gen10_0_txbL6">1</span></td>
                                  <td id="wq_uuid_1327"><span id="gen10_0_txbL7">1</span></td>
                              </tr>
                              <tr id="gen10_1_trMerge10">
                                  <td id="wq_uuid_1332"><span id="gen10_1_txbL2">2021.03.25.</span></td>
                                  <td id="wq_uuid_1334"><span id="gen10_1_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1336"><span id="gen10_1_txbL5">교내 대청소</span></td>
                                  <td id="wq_uuid_1338"><span id="gen10_1_txbL6">1</span></td>
                                  <td id="wq_uuid_1340"><span id="gen10_1_txbL7">2</span></td>
                              </tr>
                              <tr id="gen10_2_trMerge10">
                                  <td id="wq_uuid_1345"><span id="gen10_2_txbL2">2021.04.06.</span></td>
                                  <td id="wq_uuid_1347"><span id="gen10_2_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1349"><span id="gen10_2_txbL5">교내 대청소</span></td>
                                  <td id="wq_uuid_1351"><span id="gen10_2_txbL6">1</span></td>
                                  <td id="wq_uuid_1353"><span id="gen10_2_txbL7">3</span></td>
                              </tr>
                              <tr id="gen10_3_trMerge10">
                                  <td id="wq_uuid_1358"><span id="gen10_3_txbL2">2021.05.07.</span></td>
                                  <td id="wq_uuid_1360"><span id="gen10_3_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1362"><span id="gen10_3_txbL5">봉사활동 온라인교육</span></td>
                                  <td id="wq_uuid_1364"><span id="gen10_3_txbL6">2</span></td>
                                  <td id="wq_uuid_1366"><span id="gen10_3_txbL7">5</span></td>
                              </tr>
                              <tr id="gen10_4_trMerge10">
                                  <td id="wq_uuid_1371"><span id="gen10_4_txbL2">2021.06.25.</span></td>
                                  <td id="wq_uuid_1373"><span id="gen10_4_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1375"><span id="gen10_4_txbL5">교내 대청소</span></td>
                                  <td id="wq_uuid_1377"><span id="gen10_4_txbL6">1</span></td>
                                  <td id="wq_uuid_1379"><span id="gen10_4_txbL7">6</span></td>
                              </tr>
                              <tr id="gen10_5_trMerge10">
                                  <td id="wq_uuid_1384"><span id="gen10_5_txbL2">2021.07.06.</span></td>
                                  <td id="wq_uuid_1386"><span id="gen10_5_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1388"><span id="gen10_5_txbL5">봉사활동 온라인교육</span></td>
                                  <td id="wq_uuid_1390"><span id="gen10_5_txbL6">1</span></td>
                                  <td id="wq_uuid_1392"><span id="gen10_5_txbL7">7</span></td>
                              </tr>
                              <tr id="gen10_6_trMerge10">
                                  <td id="wq_uuid_1397"><span id="gen10_6_txbL2">2021.07.15.</span></td>
                                  <td id="wq_uuid_1399"><span id="gen10_6_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1401"><span id="gen10_6_txbL5">교내 대청소</span></td>
                                  <td id="wq_uuid_1403"><span id="gen10_6_txbL6">1</span></td>
                                  <td id="wq_uuid_1405"><span id="gen10_6_txbL7">8</span></td>
                              </tr>
                              <tr id="gen10_7_trMerge10">
                                  <td id="wq_uuid_1410"><span id="gen10_7_txbL2">2021.11.09.</span></td>
                                  <td id="wq_uuid_1412"><span id="gen10_7_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1414"><span id="gen10_7_txbL5">체험활동 및 환경보호활동</span></td>
                                  <td id="wq_uuid_1416"><span id="gen10_7_txbL6">1</span></td>
                                  <td id="wq_uuid_1418"><span id="gen10_7_txbL7">9</span></td>
                              </tr>
                              <tr id="gen10_8_trMerge10">
                                  <td id="wq_uuid_1423"><span id="gen10_8_txbL2">2021.11.10.</span></td>
                                  <td id="wq_uuid_1425"><span id="gen10_8_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1427"><span id="gen10_8_txbL5">교내 대청소</span></td>
                                  <td id="wq_uuid_1429"><span id="gen10_8_txbL6">1</span></td>
                                  <td id="wq_uuid_1431"><span id="gen10_8_txbL7">10</span></td>
                              </tr>
                              <tr id="gen10_9_trMerge10">
                                  <td id="gen10_9_tdMerge10" rowSpan={12}><span id="gen10_9_txbL1" >2</span></td>
                                  <td id="wq_uuid_1436"><span id="gen10_9_txbL2">2022.03.02. - 2022.07.15.</span></td>
                                  <td id="wq_uuid_1438"><span id="gen10_9_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1440"><span id="gen10_9_txbL5">도서반납 도우미</span></td>
                                  <td id="wq_uuid_1442"><span id="gen10_9_txbL6">5</span></td>
                                  <td id="wq_uuid_1444"><span id="gen10_9_txbL7">5</span></td>
                              </tr>
                              <tr id="gen10_10_trMerge10">
                                  <td id="wq_uuid_1449"><span id="gen10_10_txbL2">2022.03.10. - 2023.02.08.</span></td>
                                  <td id="wq_uuid_1451"><span id="gen10_10_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1453"><span id="gen10_10_txbL5">학급 내 휴대전화 관리</span></td>
                                  <td id="wq_uuid_1455"><span id="gen10_10_txbL6">10</span></td>
                                  <td id="wq_uuid_1457"><span id="gen10_10_txbL7">15</span></td>
                              </tr>
                              <tr id="gen10_11_trMerge10">
                                  <td id="wq_uuid_1462"><span id="gen10_11_txbL2">2022.03.11.</span></td>
                                  <td id="wq_uuid_1464"><span id="gen10_11_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1466"><span id="gen10_11_txbL5">봉사활동소양교육</span></td>
                                  <td id="wq_uuid_1468"><span id="gen10_11_txbL6">1</span></td>
                                  <td id="wq_uuid_1470"><span id="gen10_11_txbL7">16</span></td>
                              </tr>
                              <tr id="gen10_12_trMerge10">
                                  <td id="wq_uuid_1475"><span id="gen10_12_txbL2">2022.03.24.</span></td>
                                  <td id="wq_uuid_1477"><span id="gen10_12_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1479"><span id="gen10_12_txbL5">교내 대청소</span></td>
                                  <td id="wq_uuid_1481"><span id="gen10_12_txbL6">1</span></td>
                                  <td id="wq_uuid_1483"><span id="gen10_12_txbL7">17</span></td>
                              </tr>
                              <tr id="gen10_13_trMerge10">
                                  <td id="wq_uuid_1488"><span id="gen10_13_txbL2">2022.04.19.</span></td>
                                  <td id="wq_uuid_1490"><span id="gen10_13_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1492"><span id="gen10_13_txbL5">교내 대청소</span></td>
                                  <td id="wq_uuid_1494"><span id="gen10_13_txbL6">1</span></td>
                                  <td id="wq_uuid_1496"><span id="gen10_13_txbL7">18</span></td>
                              </tr>
                              <tr id="gen10_14_trMerge10">
                                  <td id="wq_uuid_1501"><span id="gen10_14_txbL2">2022.05.06.</span></td>
                                  <td id="wq_uuid_1503"><span id="gen10_14_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1505"><span id="gen10_14_txbL5">교내 대청소</span></td>
                                  <td id="wq_uuid_1507"><span id="gen10_14_txbL6">2</span></td>
                                  <td id="wq_uuid_1509"><span id="gen10_14_txbL7">20</span></td>
                              </tr>
                              <tr id="gen10_15_trMerge10">
                                  <td id="wq_uuid_1514"><span id="gen10_15_txbL2">2022.05.27.</span></td>
                                  <td id="wq_uuid_1516"><span id="gen10_15_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1518"><span id="gen10_15_txbL5">교내 대청소</span></td>
                                  <td id="wq_uuid_1520"><span id="gen10_15_txbL6">1</span></td>
                                  <td id="wq_uuid_1522"><span id="gen10_15_txbL7">21</span></td>
                              </tr>
                              <tr id="gen10_16_trMerge10">
                                  <td id="wq_uuid_1527"><span id="gen10_16_txbL2">2022.06.24.</span></td>
                                  <td id="wq_uuid_1529"><span id="gen10_16_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1531"><span id="gen10_16_txbL5">교내 대청소</span></td>
                                  <td id="wq_uuid_1533"><span id="gen10_16_txbL6">1</span></td>
                                  <td id="wq_uuid_1535"><span id="gen10_16_txbL7">22</span></td>
                              </tr>
                              <tr id="gen10_17_trMerge10">
                                  <td id="wq_uuid_1540"><span id="gen10_17_txbL2">2022.07.14.</span></td>
                                  <td id="wq_uuid_1542"><span id="gen10_17_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1544"><span id="gen10_17_txbL5">교내 대청소</span></td>
                                  <td id="wq_uuid_1546"><span id="gen10_17_txbL6">1</span></td>
                                  <td id="wq_uuid_1548"><span id="gen10_17_txbL7">23</span></td>
                              </tr>
                              <tr id="gen10_18_trMerge10">
                                  <td id="wq_uuid_1553"><span id="gen10_18_txbL2">2022.08.16. - 2023.02.08.</span></td>
                                  <td id="wq_uuid_1555"><span id="gen10_18_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1557"><span id="gen10_18_txbL5">도서반납 도우미</span></td>
                                  <td id="wq_uuid_1559"><span id="gen10_18_txbL6">5</span></td>
                                  <td id="wq_uuid_1561"><span id="gen10_18_txbL7">28</span></td>
                              </tr>
                              <tr id="gen10_19_trMerge10">
                                  <td id="wq_uuid_1566"><span id="gen10_19_txbL2">2022.10.14.</span></td>
                                  <td id="wq_uuid_1568"><span id="gen10_19_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1570"><span id="gen10_19_txbL5">교내 대청소</span></td>
                                  <td id="wq_uuid_1572"><span id="gen10_19_txbL6">1</span></td>
                                  <td id="wq_uuid_1574"><span id="gen10_19_txbL7">29</span></td>
                              </tr>
                              <tr id="gen10_20_trMerge10">
                                  <td id="wq_uuid_1579"><span id="gen10_20_txbL2">2022.11.09.</span></td>
                                  <td id="wq_uuid_1581"><span id="gen10_20_txbL4">(학교)해연중학교</span></td>
                                  <td id="wq_uuid_1583"><span id="gen10_20_txbL5">교내 대청소</span></td>
                                  <td id="wq_uuid_1585"><span id="gen10_20_txbL6">1</span></td>
                                  <td id="wq_uuid_1587"><span id="gen10_20_txbL7">30</span></td>
                              </tr>*/}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
                
      {/* 교과학습발달상황 */}
      <div className="container mt-5">
          <div className="box">
              <div className="p-5 border-b">
                  <h2 id="wq_uuid_660" className='text-lg font-bold'>교과학습발달상황</h2>
              </div>
              <div className="p-5">
                  {Object.entries(parseHtml).map(([key, item]) => {
                      if (key === 'studentLearnDevelopStatus') {
                          const array = item;
                          return array.map((data, index) => {
                              let table_1 = [];
                              let table_2 = [];
                              let table_3 = [];
                              let table_4 = [];
                              let table_5 = [];

                              data.table_1.map((data_1, index_1) => {
                                  table_1.push(
                                      <>
                                          <tr>
                                              <td><span>{data_1.semester}</span></td>
                                              <td><span>{data_1.subject_1}</span></td>
                                              <td><span>{data_1.subject_2}</span></td>
                                              <td><span>{data_1.ori_score_subject_average}</span></td>
                                              <td><span>{data_1.achieve_level}</span></td>
                                              <td><span>{data_1.note}</span></td>
                                          </tr>
                                      </>
                                  );
                              });

                              data.table_2.map((data_2, index_2) => {
                                  table_2.push(
                                      <>
                                          <tr>
                                              <td className="text-center">
                                                  <p>{data_2.subject}</p>
                                              </td>
                                              <td>
                                                  <p>{data_2.detail_capability_special}</p>
                                              </td>
                                          </tr>
                                      </>
                                  );
                              });

                              data.table_3.map((data_3, index_3) => {
                                  table_3.push(
                                      <>
                                          <tr className="text-center">
                                              <td><span>{data_3.semester}</span></td>
                                              <td><span>{data_3.subject_1}</span></td>
                                              <td><span>{data_3.subject_2}</span></td>
                                              <td><span>{data_3.ori_score_subject_average}</span></td>
                                              <td><span>{data_3.achieve_leve}</span></td>
                                          </tr>
                                      </>
                                  );
                              });

                              data.table_4.map((data_4, index_4) => {
                                  table_4.push(
                                      <>
                                          <tr>
                                              <td className="text-center"><span>{data_4.subject}</span></td>
                                              <td><span>{data_4.detail_capability_special}</span></td>
                                          </tr>
                                      </>
                                  );
                              });

                              data.table_5.map((data_5, index_5) => {
                                  table_5.push(
                                      <>
                                          <tr className="text-center">
                                              <td><span>{data_5.semester}</span></td>
                                              <td><span>{data_5.subject_1}</span></td>
                                              <td><span>{data_5.subject_2}</span></td>
                                              <td><span>{data_5.ori_score_subject_average}</span></td>
                                              <td><span>{data_5.achieve_level}</span></td>
                                              <td><span>{data_5.note}</span></td>
                                          </tr>
                                      </>
                                  );
                              });

                              return (
                                  <React.Fragment key={index}>
                                      <div className="mt-5">
                                          <h5 className="pb-3">[{data.class}학년]</h5>
                                          <table className="table table-bordered">
                                              {/*<caption>{index+1}학년 교과학습발달상황 - {index+1}학년 교과,과목의 학기별 성취도 및 원점수,과목평균 등을 제공하는 표</caption>*/}
                                              <colgroup>
                                                  <col style={{width:'5%'}}/>
                                                  <col style={{width:'15%'}}/>
                                                  <col style={{width:'15%'}}/>
                                                  <col style={{width:'16%'}}/>
                                                  <col style={{width:'10%'}}/>
                                                  <col style={{width:'10%'}}/>
                                              </colgroup>
                                              <thead id="wq_uuid_674" className="whitespace-nowrap text-center">
                                              <tr id="wq_uuid_675">
                                                  <th className="bg-slate-100 font-medium" id="wq_uuid_676" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_677">학기</span></th>
                                                  <th className="bg-slate-100 font-medium" id="wq_uuid_678" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_679">교과</span></th>
                                                  <th className="bg-slate-100 font-medium" id="wq_uuid_680" scope="colgroup" colSpan={0} rowSpan={1}><span id="wq_uuid_681">과목</span></th>
                                                  <th className="bg-slate-100 font-medium" id="wq_uuid_682" scope="colgroup" colSpan={0} rowSpan={1}><span id="oneStdev">원점수/과목평균</span></th>
                                                  <th className="bg-slate-100 font-medium" id="wq_uuid_684" rowSpan={0} scope="col"><span id="wq_uuid_685">성취도(수강자수)</span></th>
                                                  <th className="bg-slate-100 font-medium" id="wq_uuid_686" rowSpan={0} scope="col"><span id="wq_uuid_687">비고</span></th>
                                              </tr>
                                              </thead>
                                              <tbody className="whitespace-nowrap text-center" style={{tableLayout:'fixed'}}>
                                              {table_1}
                                              </tbody>
                                          </table>
                                      </div>
                                      <div className="mt-5">
                                          <table className="table table-bordered">
                                              {/*<caption>{index+1}학년 교과학습발달상황 - {index+1}학년 과목별 세부능력 및 특기사항을 제공하는 표</caption>*/}
                                              <colgroup>
                                                  <col style={{width:'20%'}}/>
                                                  <col style={{width:'80%'}}/>
                                              </colgroup>
                                              <thead className="whitespace-nowrap text-center">
                                              <tr>
                                                  <th className="bg-slate-100 font-medium" scope="col"><span>과목</span></th>
                                                  <th className="bg-slate-100 font-medium" scope="col"><span>세부능력 및 특기사항</span></th>
                                              </tr>
                                              </thead>
                                              <tbody>
                                              {table_2}
                                              </tbody>
                                          </table>
                                      </div>
                                      <div className="mt-5">
                                          <h5 className="text-primary pb-3">&lt; 체육ㆍ예술(음악/미술) &gt;</h5>
                                          <table className="table table-bordered">
                                              {/*<caption>{index+1}학년 체육,예술(음악/미술) 교과학습발달상황 - {index+1}학년체육,예술(음악,미술)에 관련된 교과 과목의 학기별 변동이름을 제공하는 표</caption>*/}
                                              <colgroup>
                                                  <col style={{width:'6%'}}/>
                                                  <col style={{width:'25%'}}/>
                                                  <col style={{width:'25%'}}/>
                                                  <col style={{width:'26%'}}/>
                                                  <col/>
                                              </colgroup>
                                              <thead className="whitespace-nowrap text-center">
                                              <tr>
                                                  <th className="bg-slate-100 font-medium" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_872">학기</span></th>
                                                  <th className="bg-slate-100 font-medium" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_874">교과</span></th>
                                                  <th className="bg-slate-100 font-medium" scope="col" colSpan={1} rowSpan={1}><span id="wq_uuid_876">과목</span></th>
                                                  <th className="bg-slate-100 font-medium" scope="col" colSpan={1} rowSpan={1}><span id="wq_uuid_878">성취도</span></th>
                                                  <th className="bg-slate-100 font-medium" rowSpan={2} scope="col"><span id="wq_uuid_880">비고</span></th>
                                              </tr>
                                              </thead>
                                              <tbody className="whitespace-nowrap">
                                              {table_3}
                                              </tbody>
                                          </table>
                                      </div>
                                      <div className="mt-5">
                                          <table className="table table-bordered">
                                              {/*<caption >{index+1}학년 교과학습발달상황 - {index+1}학년 과목별 특기사항 상세내용을 제공하는 표</caption>*/}
                                              <colgroup>
                                                  <col style={{width:'20%'}}/>
                                                  <col style={{width:'80%'}}/>
                                              </colgroup>
                                              <thead className="whitespace-nowrap text-center">
                                              <tr>
                                                  <th className="bg-slate-100 font-medium" scope="col"><span>과목</span></th>
                                                  <th className="bg-slate-100 font-medium" scope="col"><span>세부능력 및 특기사항</span></th>
                                              </tr>
                                              </thead>
                                              <tbody>
                                              {table_4}
                                              </tbody>
                                          </table>
                                      </div>
                                      <div className="mt-5">
                                          <h5 className="text-primary pb-3">&lt; 교양교과 &gt;</h5>
                                          <table className="table table-bordered">
                                              {/*<caption>1학년 교양교과 교과학습발달상황 - 1학년 교양교과에 관련된 교과,과목의 학기별이수시간,이수여부를 제공하는 표</caption>*/}
                                              <colgroup>
                                                  <col style={{width:'6%'}}/>
                                                  <col style={{width:'20%'}}/>
                                                  <col style={{width:'20%'}}/>
                                                  <col style={{width:'15%'}}/>
                                                  <col style={{width:'15%'}}/>
                                                  <col style={{width:'16%'}}/>
                                              </colgroup>
                                              <thead className="whitespace-nowrap text-center">
                                              <tr>
                                                  <th className="bg-slate-100 font-medium" scope="col" colSpan={1} rowSpan={2}><span>학기</span></th>
                                                  <th className="bg-slate-100 font-medium" scope="col" colSpan={1} rowSpan={2}><span>교과</span></th>
                                                  <th className="bg-slate-100 font-medium" scope="colgroup" colSpan={0} rowSpan={1}><span>과목</span></th>
                                                  <th className="bg-slate-100 font-medium" scope="colgroup" colSpan={0} rowSpan={1}><span>이수시간</span></th>
                                                  <th className="bg-slate-100 font-medium" rowSpan={2} scope="col"><span>이수여부</span></th>
                                                  <th className="bg-slate-100 font-medium" rowSpan={2} scope="col"><span>비고</span></th>
                                              </tr>
                                              </thead>
                                              <tbody id="gen28">
                                              {table_5}
                                              </tbody>
                                          </table>
                                      </div>
                                  </React.Fragment>
                              );
                          })
                      }
                  })}
                  {/*<p id="wq_uuid_661" className="text-danger pb-5">교과별 성취도 "A,B,C,D,E"는 지필평가 1회(중간고사), 2회(기말고사), 수행평가를 합산하여 학기 단위로 산출됩니다.<br/>석차등급란의 "A,B,C,D,E"는 성취도를 나타냅니다.</p>*/}
                  {/*<h5 id="wq_uuid_663"className="pb-3">[1학년]</h5>
                  <div className="overflow-x-auto">
                      <table id="wq_uuid_665" className="table table-bordered">
                          <caption className="dp_none" id="wq_uuid_666">1학년 교과학습발달상황 - 1학년 교과,과목의 학기별 성취도 및 원점수,과목평균 등을 제공하는 표</caption>
                          <colgroup id="wq_uuid_667">
                              <col id="wq_uuid_668" style={{width:'5%'}}/>
                              <col id="wq_uuid_669" style={{width:'15%'}}/>
                              <col id="wq_uuid_670" style={{width:'15%'}}/>
                              <col id="wq_uuid_671" style={{width:'16%'}}/>
                              <col id="wq_uuid_672" style={{width:'10%'}}/>
                              <col id="wq_uuid_673" style={{width:'10%'}}/>
                          </colgroup>
                          <thead id="wq_uuid_674" className="whitespace-nowrap text-center">
                              <tr id="wq_uuid_675">
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_676" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_677">학기</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_678" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_679">교과</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_680" scope="colgroup" colSpan={0} rowSpan={1}><span id="wq_uuid_681">과목</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_682" scope="colgroup" colSpan={0} rowSpan={1}><span id="oneStdev">원점수/과목평균</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_684" rowSpan={0} scope="col"><span id="wq_uuid_685">성취도(수강자수)</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_686" rowSpan={0} scope="col"><span id="wq_uuid_687">비고</span></th>
                              </tr>
                          </thead>
                          <tbody id="gen14" className="whitespace-nowrap text-center">
                              <tr id="wq_uuid_1589">
                                  <td id="wq_uuid_1590"><span id="gen14_0_txbP1">1</span></td>
                                  <td id="wq_uuid_1592"><span id="gen14_0_txbP2">국어</span></td>
                                  <td id="wq_uuid_1594"><span id="gen14_0_txbP3">국어</span></td>
                                  <td id="wq_uuid_1596"><span id="gen14_0_txbP4"></span></td>
                                  <td id="wq_uuid_1598"><span id="gen14_0_txbP5">P</span></td>
                                  <td id="wq_uuid_1600"><span id="gen14_0_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1602">
                                  <td id="wq_uuid_1603"><span id="gen14_1_txbP1">1</span></td>
                                  <td id="wq_uuid_1605"><span id="gen14_1_txbP2">사회(역사포함)/도덕</span></td>
                                  <td id="wq_uuid_1607"><span id="gen14_1_txbP3">사회</span></td>
                                  <td id="wq_uuid_1609"><span id="gen14_1_txbP4"></span></td>
                                  <td id="wq_uuid_1611"><span id="gen14_1_txbP5">P</span></td>
                                  <td id="wq_uuid_1613"><span id="gen14_1_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1615">
                                  <td id="wq_uuid_1616"><span id="gen14_2_txbP1">1</span></td>
                                  <td id="wq_uuid_1618"><span id="gen14_2_txbP2">수학</span></td>
                                  <td id="wq_uuid_1620"><span id="gen14_2_txbP3">수학</span></td>
                                  <td id="wq_uuid_1622"><span id="gen14_2_txbP4"></span></td>
                                  <td id="wq_uuid_1624"><span id="gen14_2_txbP5">P</span></td>
                                  <td id="wq_uuid_1626"><span id="gen14_2_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1628">
                                  <td id="wq_uuid_1629"><span id="gen14_3_txbP1">1</span></td>
                                  <td id="wq_uuid_1631"><span id="gen14_3_txbP2">과학/기술·가정/정보</span></td>
                                  <td id="wq_uuid_1633"><span id="gen14_3_txbP3">과학</span></td>
                                  <td id="wq_uuid_1635"><span id="gen14_3_txbP4"></span></td>
                                  <td id="wq_uuid_1637"><span id="gen14_3_txbP5">P</span></td>
                                  <td id="wq_uuid_1639"><span id="gen14_3_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1641">
                                  <td id="wq_uuid_1642"><span id="gen14_4_txbP1">1</span></td>
                                  <td id="wq_uuid_1644"><span id="gen14_4_txbP2">과학/기술·가정/정보</span></td>
                                  <td id="wq_uuid_1646"><span id="gen14_4_txbP3">기술·가정</span></td>
                                  <td id="wq_uuid_1648"><span id="gen14_4_txbP4"></span></td>
                                  <td id="wq_uuid_1650"><span id="gen14_4_txbP5">P</span></td>
                                  <td id="wq_uuid_1652"><span id="gen14_4_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1654">
                                  <td id="wq_uuid_1655"><span id="gen14_5_txbP1">1</span></td>
                                  <td id="wq_uuid_1657"><span id="gen14_5_txbP2">과학/기술·가정/정보</span></td>
                                  <td id="wq_uuid_1659"><span id="gen14_5_txbP3">정보</span></td>
                                  <td id="wq_uuid_1661"><span id="gen14_5_txbP4"></span></td>
                                  <td id="wq_uuid_1663"><span id="gen14_5_txbP5">P</span></td>
                                  <td id="wq_uuid_1665"><span id="gen14_5_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1667">
                                  <td id="wq_uuid_1668"><span id="gen14_6_txbP1">1</span></td>
                                  <td id="wq_uuid_1670"><span id="gen14_6_txbP2">영어</span></td>
                                  <td id="wq_uuid_1672"><span id="gen14_6_txbP3">영어</span></td>
                                  <td id="wq_uuid_1674"><span id="gen14_6_txbP4"></span></td>
                                  <td id="wq_uuid_1676"><span id="gen14_6_txbP5">P</span></td>
                                  <td id="wq_uuid_1678"><span id="gen14_6_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1680">
                                  <td id="wq_uuid_1681"><span id="gen14_7_txbP1">1</span></td>
                                  <td id="wq_uuid_1683"><span id="gen14_7_txbP2">선택</span></td>
                                  <td id="wq_uuid_1685"><span id="gen14_7_txbP3">한문</span></td>
                                  <td id="wq_uuid_1687"><span id="gen14_7_txbP4"></span></td>
                                  <td id="wq_uuid_1689"><span id="gen14_7_txbP5">P</span></td>
                                  <td id="wq_uuid_1691"><span id="gen14_7_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1693">
                                  <td id="wq_uuid_1694"><span id="gen14_8_txbP1">2</span></td>
                                  <td id="wq_uuid_1696"><span id="gen14_8_txbP2">국어</span></td>
                                  <td id="wq_uuid_1698"><span id="gen14_8_txbP3">국어</span></td>
                                  <td id="wq_uuid_1700"><span id="gen14_8_txbP4"></span></td>
                                  <td id="wq_uuid_1702"><span id="gen14_8_txbP5">P</span></td>
                                  <td id="wq_uuid_1704"><span id="gen14_8_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1706">
                                  <td id="wq_uuid_1707"><span id="gen14_9_txbP1">2</span></td>
                                  <td id="wq_uuid_1709"><span id="gen14_9_txbP2">사회(역사포함)/도덕</span></td>
                                  <td id="wq_uuid_1711"><span id="gen14_9_txbP3">사회</span></td>
                                  <td id="wq_uuid_1713"><span id="gen14_9_txbP4"></span></td>
                                  <td id="wq_uuid_1715"><span id="gen14_9_txbP5">P</span></td>
                                  <td id="wq_uuid_1717"><span id="gen14_9_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1719">
                                  <td id="wq_uuid_1720"><span id="gen14_10_txbP1">2</span></td>
                                  <td id="wq_uuid_1722"><span id="gen14_10_txbP2">수학</span></td>
                                  <td id="wq_uuid_1724"><span id="gen14_10_txbP3">수학</span></td>
                                  <td id="wq_uuid_1726"><span id="gen14_10_txbP4"></span></td>
                                  <td id="wq_uuid_1728"><span id="gen14_10_txbP5">P</span></td>
                                  <td id="wq_uuid_1730"><span id="gen14_10_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1732">
                                  <td id="wq_uuid_1733"><span id="gen14_11_txbP1">2</span></td>
                                  <td id="wq_uuid_1735"><span id="gen14_11_txbP2">과학/기술·가정/정보</span></td>
                                  <td id="wq_uuid_1737"><span id="gen14_11_txbP3">과학</span></td>
                                  <td id="wq_uuid_1739"><span id="gen14_11_txbP4"></span></td>
                                  <td id="wq_uuid_1741"><span id="gen14_11_txbP5">P</span></td>
                                  <td id="wq_uuid_1743"><span id="gen14_11_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1745">
                                  <td id="wq_uuid_1746"><span id="gen14_12_txbP1">2</span></td>
                                  <td id="wq_uuid_1748"><span id="gen14_12_txbP2">과학/기술·가정/정보</span></td>
                                  <td id="wq_uuid_1750"><span id="gen14_12_txbP3">기술·가정</span></td>
                                  <td id="wq_uuid_1752"><span id="gen14_12_txbP4"></span></td>
                                  <td id="wq_uuid_1754"><span id="gen14_12_txbP5">P</span></td>
                                  <td id="wq_uuid_1756"><span id="gen14_12_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1758">
                                  <td id="wq_uuid_1759"><span id="gen14_13_txbP1">2</span></td>
                                  <td id="wq_uuid_1761"><span id="gen14_13_txbP2">과학/기술·가정/정보</span></td>
                                  <td id="wq_uuid_1763"><span id="gen14_13_txbP3">정보</span></td>
                                  <td id="wq_uuid_1765"><span id="gen14_13_txbP4"></span></td>
                                  <td id="wq_uuid_1767"><span id="gen14_13_txbP5">P</span></td>
                                  <td id="wq_uuid_1769"><span id="gen14_13_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1771">
                                  <td id="wq_uuid_1772"><span id="gen14_14_txbP1">2</span></td>
                                  <td id="wq_uuid_1774"><span id="gen14_14_txbP2">영어</span></td>
                                  <td id="wq_uuid_1776"><span id="gen14_14_txbP3">영어</span></td>
                                  <td id="wq_uuid_1778"><span id="gen14_14_txbP4"></span></td>
                                  <td id="wq_uuid_1780"><span id="gen14_14_txbP5">P</span></td>
                                  <td id="wq_uuid_1782"><span id="gen14_14_txbP6"></span></td>
                              </tr>
                              <tr id="wq_uuid_1784">
                                  <td id="wq_uuid_1785"><span id="gen14_15_txbP1">2</span></td>
                                  <td id="wq_uuid_1787"><span id="gen14_15_txbP2">선택</span></td>
                                  <td id="wq_uuid_1789"><span id="gen14_15_txbP3">한문</span></td>
                                  <td id="wq_uuid_1791"><span id="gen14_15_txbP4"></span></td>
                                  <td id="wq_uuid_1793"><span id="gen14_15_txbP5">P</span></td>
                                  <td id="wq_uuid_1795"><span id="gen14_15_txbP6"></span></td>
                              </tr>
                          </tbody>
                      </table>
                      <div className="mt-5">
                          <table id="wq_uuid_712" className="table table-bordered">
                              <caption className="dp_none" id="wq_uuid_713">1학년 교과학습발달상황 - 1학년 과목별 세부능력 및 특기사항을 제공하는 표</caption>
                              <colgroup id="wq_uuid_714">
                                  <col id="wq_uuid_715" style={{width:'20%'}}/>
                                  <col id="wq_uuid_716"/>
                              </colgroup>
                              <thead id="wq_uuid_717" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_718">
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_719" scope="col"><span id="wq_uuid_720">과목</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_721" scope="col"><span id="wq_uuid_722">세부능력 및 특기사항</span></th>
                                  </tr>
                              </thead>
                              <tbody id="wq_uuid_723" className="whitespace-nowrap text-center">
                                  <tr>
                                      <td>(1학기)국어(자유학기)</td>
                                      <td className="whitespace-normal text-left">집중력이 있어 수업 내용을 잘 이해하고 성실한 태도로 수업 시간 주어진 문제를 잘 해결하며 주변 친구들을 잘 배려함. 읽기 목적, 글의 구조나 전개 방식을 고려하여, 소설 '홍길동전'을 읽고 영웅의 일대기를 중심으로 중요한 내용을 포괄하며 글 내용을 적절하고 효과적으로 요약함. 자신의 삶과 경험을 바탕으로 하여 사건이나 행동, 생각이나 느낌을 진솔하고 창의적으로 표현하여 독자에게 감동이나 즐거움을 주는 글을 씀. 여러 갈래의 작품에서 비유와 상징의 표현 효과를 주체적으로 수용하고 이를 활용하여 자신의 생각이나 느낌을 창의적으로 표현함.</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div className="mt-5">
                          <h5 id="wq_uuid_728" className="text-primary pb-3">&lt; 체육ㆍ예술(음악/미술) &gt;</h5>
                          <table id="wq_uuid_729" className="table table-bordered">
                              <caption className="dp_none" id="wq_uuid_713">1학년 체육,예술(음악/미술) 교과학습발달상황 - 1학년 체육,예술(음악,미술)에 관련된 교과 과목의 학기별 변동이름을 제공하는 표</caption>
                              <colgroup id="wq_uuid_731">
                                  <col id="wq_uuid_732" style={{width:'%'}}/>
                                  <col id="wq_uuid_733" style={{width:'25%'}}/>
                                  <col id="wq_uuid_734" style={{width:'25%'}}/>
                                  <col id="wq_uuid_735" style={{width:'26%'}}/>
                                  <col id="wq_uuid_736"/>
                              </colgroup>
                              <thead id="wq_uuid_737" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_738">
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_739" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_740">학기</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_741" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_742">교과</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_743" scope="col" colSpan={1} rowSpan={1}><span id="wq_uuid_744">과목</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_745" scope="col" colSpan={1} rowSpan={1}><span id="wq_uuid_746">성취도</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_747" rowSpan={2} scope="col"><span id="wq_uuid_748">비고</span></th>
                                  </tr>
                              </thead>
                              <tbody id="gen17" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_1797">
                                      <td id="wq_uuid_1798"><span id="gen17_0_txbPp1">1</span></td>
                                      <td id="wq_uuid_1800"><span id="gen17_0_txbPp2">체육</span></td>
                                      <td id="wq_uuid_1802"><span id="gen17_0_txbPp3">체육</span></td>
                                      <td id="wq_uuid_1804"><span id="gen17_0_txbPp4">P</span></td>
                                      <td id="wq_uuid_1806"><span id="gen17_0_txbPp5"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_1808">
                                      <td id="wq_uuid_1809"><span id="gen17_1_txbPp1">1</span></td>
                                      <td id="wq_uuid_1811"><span id="gen17_1_txbPp2">예술(음악/미술)</span></td>
                                      <td id="wq_uuid_1813"><span id="gen17_1_txbPp3">음악</span></td>
                                      <td id="wq_uuid_1815"><span id="gen17_1_txbPp4">P</span></td>
                                      <td id="wq_uuid_1817"><span id="gen17_1_txbPp5"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_1819">
                                      <td id="wq_uuid_1820"><span id="gen17_2_txbPp1">1</span></td>
                                      <td id="wq_uuid_1822"><span id="gen17_2_txbPp2">예술(음악/미술)</span></td>
                                      <td id="wq_uuid_1824"><span id="gen17_2_txbPp3">미술</span></td>
                                      <td id="wq_uuid_1826"><span id="gen17_2_txbPp4">P</span></td>
                                      <td id="wq_uuid_1828"><span id="gen17_2_txbPp5"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_1830">
                                      <td id="wq_uuid_1831"><span id="gen17_3_txbPp1">2</span></td>
                                      <td id="wq_uuid_1833"><span id="gen17_3_txbPp2">체육</span></td>
                                      <td id="wq_uuid_1835"><span id="gen17_3_txbPp3">체육</span></td>
                                      <td id="wq_uuid_1837"><span id="gen17_3_txbPp4">P</span></td>
                                      <td id="wq_uuid_1839"><span id="gen17_3_txbPp5"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_1841">
                                      <td id="wq_uuid_1842"><span id="gen17_4_txbPp1">2</span></td>
                                      <td id="wq_uuid_1844"><span id="gen17_4_txbPp2">예술(음악/미술)</span></td>
                                      <td id="wq_uuid_1846"><span id="gen17_4_txbPp3">음악</span></td>
                                      <td id="wq_uuid_1848"><span id="gen17_4_txbPp4">P</span></td>
                                      <td id="wq_uuid_1850"><span id="gen17_4_txbPp5"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_1852">
                                      <td id="wq_uuid_1853"><span id="gen17_5_txbPp1">2</span></td>
                                      <td id="wq_uuid_1855"><span id="gen17_5_txbPp2">예술(음악/미술)</span></td>
                                      <td id="wq_uuid_1857"><span id="gen17_5_txbPp3">미술</span></td>
                                      <td id="wq_uuid_1859"><span id="gen17_5_txbPp4">P</span></td>
                                      <td id="wq_uuid_1861"><span id="gen17_5_txbPp5"></span></td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div className="mt-5">
                          <table id="wq_uuid_751" className="table table-bordered">
                              <caption className="dp_none" id="wq_uuid_752">1학년 교과학습발달상황 - 1학년 교과학습발달상황에 관한 특기사항을 제공하는 표</caption>
                              <colgroup id="wq_uuid_714">
                                  <col id="wq_uuid_715" style={{width:'20%'}}/>
                                  <col id="wq_uuid_716"/>
                              </colgroup>
                              <thead id="wq_uuid_756" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_757">
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_758" scope="col"><span id="wq_uuid_759">과목</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_760" scope="col"><span id="wq_uuid_761">세부능력 및 특기사항</span></th>
                                  </tr>
                              </thead>
                              <tbody id="wq_uuid_762" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_763">
                                      <td>(2학기)체육(자유학기)</td>
                                      <td className="whitespace-normal text-left">배드민턴 기본자세의 움직임을 구사하는 데 어려움이 있으며, 스트로크 중 하이클리어를 적절히 타격하지 못함. 매트 운동 앞, 뒤구르기를 안정적으로 수행함.</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div className="mt-5">
                          <h5 id="wq_uuid_767" className="text-primary pb-3">&lt; 교양교과 &gt;</h5>
                          <table id="wq_uuid_768" className="table table-bordered">
                              <caption className="dp_none" id="wq_uuid_713">1학년 교양교과 교과학습발달상황 - 1학년 교양교과에 관련된 교과,과목의 학기별 이수시간,이수여부를 제공하는 표</caption>
                              <colgroup id="wq_uuid_770">
                                  <col id="wq_uuid_771" style={{width:'6%'}}/>
                                  <col id="wq_uuid_772" style={{width:'20%'}}/>
                                  <col id="wq_uuid_773" style={{width:'20%'}}/>
                                  <col id="wq_uuid_774" style={{width:'15%'}}/>
                                  <col id="wq_uuid_775" style={{width:'15%'}}/>
                                  <col id="wq_uuid_776" style={{width:'16%'}}/>
                              </colgroup>
                              <thead id="wq_uuid_777" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_778">
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_779" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_780">학기</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_781" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_782">교과</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_783" scope="colgroup" colSpan={0} rowSpan={1}><span id="wq_uuid_784">과목</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_785" scope="colgroup" colSpan={0} rowSpan={1}><span id="wq_uuid_786">이수시간</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_787" rowSpan={2} scope="col"><span id="wq_uuid_788">이수여부</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_789" rowSpan={2} scope="col"><span id="wq_uuid_790">비고</span></th>
                                  </tr>
                              </thead>
                              <tbody id="gen19" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_1863">
                                      <td id="wq_uuid_1864"><span id="gen19_0_txbPpp1">1</span></td>
                                      <td id="wq_uuid_1866"><span id="gen19_0_txbPpp2">선택</span></td>
                                      <td id="wq_uuid_1868"><span id="gen19_0_txbPpp3">진로와 직업</span></td>
                                      <td id="wq_uuid_1870"><span id="gen19_0_txbPpp4">17</span></td>
                                      <td id="wq_uuid_1872"><span id="gen19_0_txbPpp5">P</span></td>
                                      <td id="wq_uuid_1874"><span id="gen19_0_txbPpp6"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_1876">
                                      <td id="wq_uuid_1877"><span id="gen19_1_txbPpp1">2</span></td>
                                      <td id="wq_uuid_1879"><span id="gen19_1_txbPpp2">선택</span></td>
                                      <td id="wq_uuid_1881"><span id="gen19_1_txbPpp3">진로와 직업</span></td>
                                      <td id="wq_uuid_1883"><span id="gen19_1_txbPpp4">17</span></td>
                                      <td id="wq_uuid_1885"><span id="gen19_1_txbPpp5">P</span></td>
                                      <td id="wq_uuid_1887"><span id="gen19_1_txbPpp6"></span></td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div className="mt-5">
                          <h5 id="wq_uuid_795" className="pb-3">[2학년]</h5>
                          <table id="wq_uuid_797" className="table table-bordered">
                              <caption className="dp_none" id="wq_uuid_798">1학년 교과학습발달상황 - 1학년 교과,과목의 학기별 성취도 및 원점수,과목평균 등을 제공하는 표</caption>
                              <colgroup id="wq_uuid_667">
                                  <col id="wq_uuid_668" style={{width:'5%'}}/>
                                  <col id="wq_uuid_669" style={{width:'15%'}}/>
                                  <col id="wq_uuid_670" style={{width:'15%'}}/>
                                  <col id="wq_uuid_671" style={{width:'16%'}}/>
                                  <col id="wq_uuid_672" style={{width:'10%'}}/>
                                  <col id="wq_uuid_673" style={{width:'10%'}}/>
                              </colgroup>
                              <thead id="wq_uuid_806" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_807">
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_808" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_809">학기</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_810" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_811">교과</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_812" scope="colgroup" colSpan={0} rowSpan={1}><span id="wq_uuid_813">과목</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_814" scope="colgroup" colSpan={0} rowSpan={1}><span id="twoStdev">원점수/과목평균</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_816" rowSpan={2} scope="col"><span id="wq_uuid_817">성취도(수강자수)</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_818" rowSpan={2} scope="col"><span id="wq_uuid_819">비고</span></th>
                                  </tr>
                              </thead>
                              <tbody id="gen23" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_1889">
                                      <td id="wq_uuid_1890"><span id="gen23_0_txbS11">1</span></td>
                                      <td id="wq_uuid_1892"><span id="gen23_0_txbS12">국어</span></td>
                                      <td id="wq_uuid_1894"><span id="gen23_0_txbS13">국어</span></td>
                                      <td id="wq_uuid_1896"><span id="gen23_0_txbS14">87/71.0</span></td>
                                      <td id="wq_uuid_1898"><span id="gen23_0_txbS15">B(203)</span></td>
                                      <td id="wq_uuid_1900"><span id="gen23_0_txbS16"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_1902">
                                      <td id="wq_uuid_1903"><span id="gen23_1_txbS11">1</span></td>
                                      <td id="wq_uuid_1905"><span id="gen23_1_txbS12">사회(역사포함)/도덕</span></td>
                                      <td id="wq_uuid_1907"><span id="gen23_1_txbS13">도덕</span></td>
                                      <td id="wq_uuid_1909"><span id="gen23_1_txbS14">90/81.7</span></td>
                                      <td id="wq_uuid_1911"><span id="gen23_1_txbS15">A(203)</span></td>
                                      <td id="wq_uuid_1913"><span id="gen23_1_txbS16"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_1915">
                                      <td id="wq_uuid_1916"><span id="gen23_2_txbS11">1</span></td>
                                      <td id="wq_uuid_1918"><span id="gen23_2_txbS12">사회(역사포함)/도덕</span></td>
                                      <td id="wq_uuid_1920"><span id="gen23_2_txbS13">역사</span></td>
                                      <td id="wq_uuid_1922"><span id="gen23_2_txbS14">97/72.1</span></td>
                                      <td id="wq_uuid_1924"><span id="gen23_2_txbS15">A(203)</span></td>
                                      <td id="wq_uuid_1926"><span id="gen23_2_txbS16"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_1928">
                                      <td id="wq_uuid_1929"><span id="gen23_3_txbS11">1</span></td>
                                      <td id="wq_uuid_1931"><span id="gen23_3_txbS12">수학</span></td>
                                      <td id="wq_uuid_1933"><span id="gen23_3_txbS13">수학</span></td>
                                      <td id="wq_uuid_1935"><span id="gen23_3_txbS14">89/69.4</span></td>
                                      <td id="wq_uuid_1937"><span id="gen23_3_txbS15">B(203)</span></td>
                                      <td id="wq_uuid_1939"><span id="gen23_3_txbS16"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_1941">
                                      <td id="wq_uuid_1942"><span id="gen23_4_txbS11">1</span></td>
                                      <td id="wq_uuid_1944"><span id="gen23_4_txbS12">과학/기술·가정/정보</span></td>
                                      <td id="wq_uuid_1946"><span id="gen23_4_txbS13">과학</span></td>
                                      <td id="wq_uuid_1948"><span id="gen23_4_txbS14">86/70.7</span></td>
                                      <td id="wq_uuid_1950"><span id="gen23_4_txbS15">B(203)</span></td>
                                      <td id="wq_uuid_1952"><span id="gen23_4_txbS16"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_1954">
                                      <td id="wq_uuid_1955"><span id="gen23_5_txbS11">1</span></td>
                                      <td id="wq_uuid_1957"><span id="gen23_5_txbS12">과학/기술·가정/정보</span></td>
                                      <td id="wq_uuid_1959"><span id="gen23_5_txbS13">기술·가정</span></td>
                                      <td id="wq_uuid_1961"><span id="gen23_5_txbS14">96/76.3</span></td>
                                      <td id="wq_uuid_1963"><span id="gen23_5_txbS15">A(203)</span></td>
                                      <td id="wq_uuid_1965"><span id="gen23_5_txbS16"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_1967">
                                      <td id="wq_uuid_1968"><span id="gen23_6_txbS11">1</span></td>
                                      <td id="wq_uuid_1970"><span id="gen23_6_txbS12">영어</span></td>
                                      <td id="wq_uuid_1972"><span id="gen23_6_txbS13">영어</span></td>
                                      <td id="wq_uuid_1974"><span id="gen23_6_txbS14">96/70.4</span></td>
                                      <td id="wq_uuid_1976"><span id="gen23_6_txbS15">A(203)</span></td>
                                      <td id="wq_uuid_1978"><span id="gen23_6_txbS16"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_1980">
                                      <td id="wq_uuid_1981"><span id="gen23_7_txbS11">1</span></td>
                                      <td id="wq_uuid_1983"><span id="gen23_7_txbS12">선택</span></td>
                                      <td id="wq_uuid_1985"><span id="gen23_7_txbS13">생활 중국어</span></td>
                                      <td id="wq_uuid_1987"><span id="gen23_7_txbS14">83/78.7</span></td>
                                      <td id="wq_uuid_1989"><span id="gen23_7_txbS15">B(203)</span></td>
                                      <td id="wq_uuid_1991"><span id="gen23_7_txbS16"></span></td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div className="mt-5">
                          <table id="wq_uuid_844" className="table table-bordered">
                              <caption className="dp_none" id="wq_uuid_845">2학년 교과학습발달상황 - 2학년 과목별 세부능력 및 특기사항을 제공하는 표</caption>
                              <thead id="wq_uuid_849" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_850">
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_851" scope="col"><span id="wq_uuid_852">과목</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_853" scope="col"><span id="wq_uuid_854">세부능력 및 특기사항</span></th>
                                  </tr>
                              </thead>
                              <tbody id="wq_uuid_855" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_856">
                                      <td id="wq_uuid_857" colSpan={2} rowSpan={1}>
                                          <p id="txbT1" className="text-danger">해당내용은 「공공기관의 정보공개에 관한 법률」제9조 제1항 제5호에 따라 내부 검토 중인 사항으로 당해학년도에는 제공하지 않습니다.</p>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div className="mt-5">
                          <h5 id="wq_uuid_860" className="text-primary pb-3">&lt; 체육ㆍ예술(음악/미술) &gt;</h5>
                          <table id="wq_uuid_861" className="table table-bordered">
                              <caption className="dp_none" id="wq_uuid_862">1학년 체육,예술(음악/미술) 교과학습발달상황 - 1학년체육,예술(음악,미술)에 관련된 교과 과목의 학기별 변동이름을 제공하는 표</caption>
                              <colgroup id="wq_uuid_731">
                                  <col id="wq_uuid_732" style={{width:'6%'}}/>
                                  <col id="wq_uuid_733" style={{width:'25%'}}/>
                                  <col id="wq_uuid_734" style={{width:'25%'}}/>
                                  <col id="wq_uuid_735" style={{width:'26%'}}/>
                                  <col id="wq_uuid_736"/>
                              </colgroup>
                              <thead id="wq_uuid_869" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_870">
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_871" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_872">학기</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_873" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_874">교과</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_875" scope="col" colSpan={1} rowSpan={1}><span id="wq_uuid_876">과목</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_877" scope="col" colSpan={1} rowSpan={1}><span id="wq_uuid_878">성취도</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_879" rowSpan={2} scope="col"><span id="wq_uuid_880">비고</span></th>
                                  </tr>
                              </thead>
                              <tbody id="gen26" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_1993">
                                      <td id="wq_uuid_1994"><span id="gen26_0_txbSs1">1</span></td>
                                      <td id="wq_uuid_1996"><span id="gen26_0_txbSs2">체육</span></td>
                                      <td id="wq_uuid_1998"><span id="gen26_0_txbSs3">체육</span></td>
                                      <td id="wq_uuid_2000"><span id="gen26_0_txbSs4">B</span></td>
                                      <td id="wq_uuid_2002"><span id="gen26_0_txbSs5"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_2004">
                                      <td id="wq_uuid_2005"><span id="gen26_1_txbSs1">1</span></td>
                                      <td id="wq_uuid_2007"><span id="gen26_1_txbSs2">예술(음악/미술)</span></td>
                                      <td id="wq_uuid_2009"><span id="gen26_1_txbSs3">음악</span></td>
                                      <td id="wq_uuid_2011"><span id="gen26_1_txbSs4">A</span></td>
                                      <td id="wq_uuid_2013"><span id="gen26_1_txbSs5"></span></td>
                                  </tr>
                                  <tr id="wq_uuid_2015">
                                      <td id="wq_uuid_2016"><span id="gen26_2_txbSs1">1</span></td>
                                      <td id="wq_uuid_2018"><span id="gen26_2_txbSs2">예술(음악/미술)</span></td>
                                      <td id="wq_uuid_2020"><span id="gen26_2_txbSs3">미술</span></td>
                                      <td id="wq_uuid_2022"><span id="gen26_2_txbSs4">A</span></td>
                                      <td id="wq_uuid_2024"><span id="gen26_2_txbSs5"></span></td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div className="mt-5">
                          <table id="wq_uuid_883" className="table table-bordered">
                              <caption className="dp_none" id="wq_uuid_862">2학년 교과학습발달상황 - 2학년 과목별 특기사항 상세내용을 제공하는 표</caption>
                              <thead id="wq_uuid_888" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_889">
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_890" scope="col"><span id="wq_uuid_891">과목</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_892" scope="col"><span id="wq_uuid_893">세부능력 및 특기사항</span></th>
                                  </tr>
                              </thead>
                              <tbody id="wq_uuid_894" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_895">
                                      <td id="wq_uuid_896" colSpan={2} rowSpan={1}>
                                          <p id="txbTt1"className="text-danger">해당내용은 「공공기관의 정보공개에 관한 법률」제9조 제1항 제5호에 따라 내부 검토 중인 사항으로 당해학년도에는 제공하지 않습니다.</p>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div className="mt-5">
                          <h5 id="wq_uuid_899" className="text-primary pb-3">&lt; 교양교과 &gt;</h5>
                          <table id="wq_uuid_900" className="table table-bordered">
                              <caption className="dp_none" id="wq_uuid_901">1학년 교양교과 교과학습발달상황 - 1학년 교양교과에 관련된 교과,과목의 학기별이수시간,이수여부를 제공하는 표</caption>
                              <colgroup id="wq_uuid_770">
                                  <col id="wq_uuid_771" style={{width:'6%'}}/>
                                  <col id="wq_uuid_772" style={{width:'20%'}}/>
                                  <col id="wq_uuid_773" style={{width:'20%'}}/>
                                  <col id="wq_uuid_774" style={{width:'15%'}}/>
                                  <col id="wq_uuid_775" style={{width:'15%'}}/>
                                  <col id="wq_uuid_776" style={{width:'16%'}}/>
                              </colgroup>
                              <thead id="wq_uuid_909" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_910">
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_911" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_912">학기</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_913" scope="col" colSpan={1} rowSpan={2}><span id="wq_uuid_914">교과</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_915" scope="colgroup" colSpan={0} rowSpan={1}><span id="wq_uuid_916">과목</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_917" scope="colgroup" colSpan={0} rowSpan={1}><span id="wq_uuid_918">이수시간</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_919" rowSpan={2} scope="col"><span id="wq_uuid_920">이수여부</span></th>
                                      <th className="bg-slate-100 font-medium" id="wq_uuid_921" rowSpan={2} scope="col"><span id="wq_uuid_922">비고</span></th>
                                  </tr>
                              </thead>
                              <tbody id="gen28" className="whitespace-nowrap text-center">
                                  <tr id="wq_uuid_2026">
                                      <td id="wq_uuid_2027"><span id="gen28_0_txbSss1">.</span></td>
                                      <td id="wq_uuid_2029"><span id="gen28_0_txbSss2">.</span></td>
                                      <td id="wq_uuid_2031"><span id="gen28_0_txbSss3">.</span></td>
                                      <td id="wq_uuid_2033"><span id="gen28_0_txbSss4">.</span></td>
                                      <td id="wq_uuid_2035"><span id="gen28_0_txbSss5">.</span></td>
                                      <td id="wq_uuid_2037"><span id="gen28_0_txbSss6">.</span></td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>*/}
              </div>
          </div>
      </div>
                
      {/* 자유학기활동상황 */}
      <div className="container mt-5">
          <div className="box">
              <div className="p-5 border-b">
                  <h2 id="wq_uuid_1059" className='text-lg font-bold'>자유학기활동상황</h2>
              </div>
              <div className="p-5">
                  <div className="overflow-x-auto">
                      <table id="grpPageNewResult" className="table table-bordered">
                          <caption className="dp_none" id="wq_uuid_1061">학년,학기,영역,시간,특기사항등 자유학기활동 정보를 제공하는 표</caption>
                          <colgroup id="wq_uuid_1062">
                              <col id="wq_uuid_1063" style={{width:'6%'}}/>
                              <col id="wq_uuid_1064" style={{width:'6%'}}/>
                              <col id="wq_uuid_1065" style={{width:'14%'}}/>
                              <col id="wq_uuid_1066" style={{width:'8%'}}/>
                              <col id="wq_uuid_1067"/>
                          </colgroup>
                          <thead id="wq_uuid_1068" className="whitespace-nowrap text-center">
                              <tr id="wq_uuid_1069">
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_1070" scope="col"><span id="wq_uuid_1071">학년</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_1072"><span id="wq_uuid_1073">학기</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_1074" scope="col"><span id="wq_uuid_1075">영역</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_1076"><span id="wq_uuid_1077">시간</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_1078" scope="col"><span id="wq_uuid_1079">특기사항</span></th>
                              </tr>
                          </thead>
                          <tbody id="genNew">
                          {Object.entries(parseHtml).map(([key, item]) => {
                              if (key === 'freeSemesterActiveStatus') {
                                  const array = item;
                                  let classNum = '';
                                  let semesterNum = '';
                                  return array.map((data, index) => {
                                      if(data.class === classNum) {
                                          if(data.semester === semesterNum) {
                                              return (
                                                  <tr id={`free_semester_active_status_tr_${index}`}>
                                                      <td className="text-center"><span>{data.area}</span></td>
                                                      <td className="text-center"><span>{data.time}</span></td>
                                                      <td><span>{data.special}</span></td>
                                                  </tr>
                                              );
                                          } else {
                                              semesterNum = data.semester;
                                              return (
                                                  <tr id={`free_semester_active_status_tr_${index}`}>
                                                      <td className="text-center" rowSpan={4}><span>{data.semester}</span></td>
                                                      <td className="text-center"><span>{data.area}</span></td>
                                                      <td className="text-center"><span>{data.time}</span></td>
                                                      <td><span>{data.special}</span></td>
                                                  </tr>
                                              );
                                          }
                                      } else {
                                          classNum = data.class;
                                          semesterNum = data.semester;
                                          return (
                                              <tr id={`free_semester_active_status_tr_${index}`}>
                                                  <td className="text-center" rowSpan={8}><span>{data.class}</span></td>
                                                  <td className="text-center" rowSpan={4}><span>{data.semester}</span></td>
                                                  <td className="text-center"><span>{data.area}</span></td>
                                                  <td className="text-center"><span>{data.time}</span></td>
                                                  <td><span>{data.special}</span></td>
                                              </tr>
                                          );
                                      }
                                  })
                              }
                          })}
                              {/*<tr id="genNew_0_trMergeNew">
                                  <td id="genNew_0_tdMergeNew1" rowSpan={8}><span id="genNew_0_txbAr1">1</span></td>
                                  <td id="genNew_0_tdMergeNew2" rowSpan={4}><span id="genNew_0_txbAr2">1</span></td>
                                  <td id="wq_uuid_2044"><span id="genNew_0_txbAr3">진로탐색활동</span></td>
                                  <td id="wq_uuid_2046"><span id="genNew_0_txbAr4">15</span></td>
                                  <td id="wq_uuid_2048" className="whitespace-normal text-left">
                                      <p id="genNew_0_txbAr5">(진로체험반)(15시간) 적성과 소질을 탐색하여 스스로 미래를 설계해 나갈 수 있도록 체계적인 진로 학습 기회를 가짐. 과학환경행사(2021.04.13.)를 통해 환경과 과학 분야에 관련된 다양한 직업 세계에 대해 알아보고 발명 및 탐구활동에 참여함. 그림한마당(2021.05.07.)을 통해 문화예술과 관련된 진로에 대해 탐색하고 자신의 미래직업을 설계해보는 시간을 가짐. 교육청에서 실시한 중학교 미래시민공감체험과정(2021.05.20.)에서 예술인의 직업을 체험하여 진로에 대한 자기 이해의 계기로 삼음. 직업인 진로 특강(2021.05.28.)에서 마술관련 강연을 듣고 자신의 진로를 모색함. 문화예술의 날(2021.07.14.)에 국악공연을 관람하고 음악과 관련된 직업군을 탐색함.</p>
                                  </td>
                              </tr>
                              <tr id="genNew_1_trMergeNew">
                                  <td id="wq_uuid_2055"><span id="genNew_1_txbAr3">주제선택활동</span></td>
                                  <td id="wq_uuid_2057"><span id="genNew_1_txbAr4">34</span></td>
                                  <td id="wq_uuid_2059">
                                     <p id="genNew_1_txbAr5" className="whitespace-normal text-left">(Seasee)(17시간) 친구들과의 소통이 뛰어나 모둠 활동 수행능력이 우수함. 어류의 기관에 맞게 멸치를 해부함. 마리모가 아닌 해조류를 실생활에서 찾을 수 있는 관찰능력이 뛰어남. 영화에서 등장하는 해양생물을 보고 실제 해양생물을 비교 분석할 수 있는 능력이 탁월함. 나만의 아쿠아리움을 만들어 봄으로 해양 생물을 동물계 척삭동물문 '강' 수준에서 분류함.
                                          <br/>
                                          <br/>(아두이노 탐구생활)(17시간) 코딩을 이해하고 적용하는 능력이 뛰어남. 블럭코딩을 통해 프로그래밍의 원리를 잘 이해하고 함수와 변수를 이용하여 과제를 해결하는 수준이 높음. 아두이노와 블럭코딩 프로그램을 이용한 코딩을 빠르게 배우며 피지컬 컴퓨팅에 대해 이해도가 높음. 브레드보드, 3가지 LED, 저항을 이용하여 신호등 코딩을 빠르게 완성하고 센서와 피에조부저를 이용하여 센서의 반응에 따라 소리가 출력되도록 코딩함. 초음파센서로 입력을 받아 엠블럭에서 거리가 표시되도록 코딩하고 출력모듈과 결합하여 물체와의 거리에 따라 반응하도록 코딩함.</p>
                                  </td>
                              </tr>
                              <tr id="genNew_2_trMergeNew">
                                  <td id="wq_uuid_2066"><span id="genNew_2_txbAr3">예술·체육활동</span></td>
                                  <td id="wq_uuid_2068"><span id="genNew_2_txbAr4">17</span></td>
                                  <td id="wq_uuid_2070">
                                      <p id="genNew_2_txbAr5" className="whitespace-normal text-left">(불꽃 슛팅 피구반)(17시간) 수업에 적극적으로 참여하고 하고자 하는 열의가 돋보이며 피구경기 중 위치선정이 뛰어나는 등 공격 및 수비상황에서 움직임의 판단력이 우수함. 피구 종목의 기초기능 및 전술을 익히는 자세가 바름.</p>
                                  </td>
                              </tr>
                              <tr id="genNew_3_trMergeNew">
                                  <td id="wq_uuid_2077"><span id="genNew_3_txbAr3">동아리활동</span></td>
                                  <td id="wq_uuid_2079"><span id="genNew_3_txbAr4">27</span></td>
                                  <td id="wq_uuid_2081">
                                      <p id="genNew_3_txbAr5" className="whitespace-normal text-left">(빅피처반)(10시간) 회화의 기본 특성을 이해하고 자신의 아이디어를 작품으로 시각화하여 표현하는 데 능하며 여러 가지 조형 요소와 원리를 응용하여 팝업 박스 만들기 작품을 표현함.
                                          <br/>
                                          <br/>(카바디반)(17시간) 카바디에 대한 이해 수준이 높고 항상 에너지 넘치고 활기차게 참여함.</p>
                                  </td>
                              </tr>
                              <tr id="genNew_4_trMergeNew">
                                  <td id="genNew_4_tdMergeNew2" rowSpan={4}><span id="genNew_4_txbAr2">2</span></td>
                                  <td id="wq_uuid_2088"><span id="genNew_4_txbAr3">진로탐색활동</span></td>
                                  <td id="wq_uuid_2090"><span id="genNew_4_txbAr4">26</span></td>
                                  <td id="wq_uuid_2092">
                                      <p id="genNew_4_txbAr5" className="whitespace-normal text-left">(진로체험반)(26시간) 한글날백일장(2021.10.07.)글짓기 활동으로 한글의 소중함을 되새김. 놀이마루 진로체험(2021.10.19.)에서 다양한 직업 체험을 하고 자신의 진로를 탐색함. 체험학습(2021.11.09-2021.11.10.)을 통해 부산 고유의 문화를 체험하여 문화적 소양을 기르고, 진로체험행사에 참여하여 자기주도적 학습의 방법 및 중요성을 깨달음. 진로체험의 날(2021.11.16.)에 다양한 직업 세계를 경험하고 자신의 진로를 모색함. 진로특강(2021.12.17.)을 듣고 자신의 꿈을 현실화하는 방안을 생각함.</p>
                                  </td>
                              </tr>
                              <tr id="genNew_5_trMergeNew">
                                  <td id="wq_uuid_2099"><span id="genNew_5_txbAr3">주제선택활동</span></td>
                                  <td id="wq_uuid_2101"><span id="genNew_5_txbAr4">34</span></td>
                                  <td id="wq_uuid_2103">
                                      <p id="genNew_5_txbAr5" className="whitespace-normal text-left">(영화와 손잡고 인문학 산책)(17시간) 영화를 통해 깨달은 바를 자신에게 적용하는 모습이 인상적임. 자신이 성찰한 것을 수필, 논설문 등의 갈래로 유기적인 흐름에 따라 표현함.
                                          <br/>
                                          <br/>(포토에세이북 만들기)(17시간) '나의 일상'이라는 주제로 자신의 생각을 포토에세이로 표현하고자 노력함. 쓰기 활동을 계획할 때 주제, 목적, 독자를 고려해야 함을 알고 쓰기과정을 점검함. 자신의 삶과 경험을 바탕으로 쓸 내용을 제한적으로 선정하여 포토에세이의 주제 파악이 어렵고 완성도가 만족스럽지 못함. 과제 수행에 소극적으로 참여하여 의견 전달에 어려움이 있음. 스스로 수업활동에 적극적으로 참여하고 그 결과에 만족하나, 친구들의 평가는 평범함.</p>
                                  </td>
                              </tr>
                              <tr id="genNew_6_trMergeNew">
                                  <td id="wq_uuid_2110"><span id="genNew_6_txbAr3">예술·체육활동</span></td>
                                  <td id="wq_uuid_2112"><span id="genNew_6_txbAr4">51</span></td>
                                  <td id="wq_uuid_2114">
                                      <p id="genNew_6_txbAr5" className="whitespace-normal text-left">(낭만주의 콜라보반)(17시간) 다양한 시대의 음악을 듣고 시대별 음악적 특징을 설명함. 감상한 음악의 느낌을 창의적인 재료를 활용한 미술작품으로 나타냄.
                                          <br/>
                                          <br/>(뚝딱뚝딱 공예반)(17시간) 공예에 큰 흥미를 가지고 열정적으로 임하며, 예술적인 시각으로 바라보는 탐색 능력을 갖춤. 작품을 감상하는 올바른 태도를 갖추고 작품의 표현 방법과 느낌을 본인에 맞춰 해석하는 능력이 뛰어남. 팝업 박스 만들기, 가면 만들기 활동으로 도안을 만들어 수업 이해도가 높으며 색을 사용하거나 조합하는 능력이 우수함.
                                          <br/>
                                          <br/>(불꽃 슛팅 피구반)(17시간) 능동적으로 피구 수업에 참여하며, 경기 중에 팀의 일원으로 분위기를 살리는 행동을 많이 함. 볼 캐치 및 삼각패스 능력이 우수함. 움직임이 활발하고 많이 뛰어다니어 상대 선수를 공격하는 공간 활용 능력이 뛰어남. 피구의 기본자세가 잘 갖추어져 있으며, 공에 대한 집중력이 매우 높음.</p>
                                  </td>
                              </tr>
                              <tr id="genNew_7_trMergeNew">
                                  <td id="wq_uuid_2121"><span id="genNew_7_txbAr3">동아리활동</span></td>
                                  <td id="wq_uuid_2123"><span id="genNew_7_txbAr4">25</span></td>
                                  <td id="wq_uuid_2125">
                                      <p id="genNew_7_txbAr5" className="whitespace-normal text-left">(빅피처반)(8시간) 회화에 대한 기본 이해도가 높고 드로잉 활동과 조형 활동에서 표현력이 좋은 작품으로 동아리에서 두각을 드러냄. 자신의 주변 환경을 예술적으로 승화하고 색과 선의 사용이 정돈되어 감상자의 입장을 고려하는 우수한 면모를 보여줌.
                                          <br/>
                                          <br/>(카바디반)(17시간) 경기를 통해 친구들과의 배려심과 운영 능력을 보여줌.</p>
                                  </td>
                              </tr>*/}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>

      {/* 독서활동상황 */}
      <div className="container mt-5">
          <div className="box">
              <div className="p-5 border-b">
                  <h2 id="wq_uuid_1106" className='text-lg font-bold'>독서활동상황</h2>
              </div>
              <div className="p-5">
                  <div className="overflow-x-auto">
                      <table id="grpPageNewResult" className="table table-bordered">
                          <caption className="dp_none" id="wq_uuid_1108">독서활동상황 - 학년/학기별 과목,영역,독서활동상황을 제공하는 표</caption>
                          <colgroup id="wq_uuid_1109">
                              <col id="wq_uuid_1110" style={{width:'6%'}}/>
                              <col id="wq_uuid_1111" style={{width:'15%'}}/>
                              <col id="wq_uuid_1112"/>
                          </colgroup>
                          <thead id="wq_uuid_1113" className="whitespace-nowrap text-center">
                              <tr id="wq_uuid_1114">
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_1115" scope="col"><span id="wq_uuid_1116">학년</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_1117" scope="col"><span id="wq_uuid_1118">과목 또는 영역</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_1119" scope="col"><span id="wq_uuid_1120">독서활동상황</span></th>
                              </tr>
                          </thead>
                          <tbody id="gen39">
                          {Object.entries(parseHtml).map(([key, item]) => {
                              if (key === 'readActiveStatus') {
                                  const array = item;
                                  return array.map((data, index) => {
                                      return (
                                          <>
                                              <tr>
                                                  <td className="text-center"><span>{data.class}</span></td>
                                                  <td className="text-center"><span>{data.subject_area}</span></td>
                                                  <td>
                                                      <p>{data.active_status}</p>
                                                  </td>
                                              </tr>
                                          </>
                                      );
                                  })
                              }
                          })}
                              {/*<tr id="gen39_0_trMerge39">
                                  <td id="gen39_0_tdMerge39"><span id="gen39_0_txbY1">1</span></td>
                                  <td id="gen39_0_tdMerge39_1"><span id="gen39_0_txbY2"></span></td>
                                  <td id="wq_uuid_2132">
                                      <p id="gen39_0_txbY3"></p>
                                  </td>
                              </tr>
                              <tr id="gen39_1_trMerge39">
                                  <td id="gen39_1_tdMerge39"><span id="gen39_1_txbY1">2</span></td>
                                  <td id="gen39_1_tdMerge39_1"><span id="gen39_1_txbY2"></span></td>
                                  <td id="wq_uuid_2139">
                                      <p id="gen39_1_txbY3" className="whitespace-normal text-left"></p>
                                  </td>
                              </tr>*/}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
                
      {/* 행동특성 및 종합의견 */}
      <div className="container mt-5">
          <div className="box">
              <div className="p-5 border-b">
                  <h2 id="wq_uuid_1123" className='text-lg font-bold'>행동특성 및 종합의견</h2>
              </div>
              <div className="p-5">
                  <div className="overflow-x-auto">
                      <table id="wq_uuid_1124" className="table table-bordered">
                          <caption className="dp_none" id="wq_uuid_1125">행동특성 및 종합의견 - 학년별 행동특성 및 종합의견을 제공하는 표</caption>
                          <colgroup id="wq_uuid_1126">
                              <col id="wq_uuid_1127" style={{width:'6%'}}/>
                              <col id="wq_uuid_1128"/>
                          </colgroup>
                          <thead id="wq_uuid_1129" className="whitespace-nowrap text-center">
                              <tr id="wq_uuid_1130">
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_1131" scope="col"><span id="wq_uuid_1132">학년</span></th>
                                  <th className="bg-slate-100 font-medium" id="wq_uuid_1133" scope="col"><span id="wq_uuid_1134">행동 특성 및 종합의견</span></th>
                              </tr>
                          </thead>
                          <tbody id="gen40">
                          {Object.entries(parseHtml).map(([key, item]) => {
                              if (key === 'behaviorCharacterGeneralOpinion') {
                                  const array = item;
                                  return array.map((data, index) => {
                                      return (
                                          <>
                                              <tr>
                                                  <td className="text-center"><span>{data.class}</span></td>
                                                  <td><span>{data.behavior_character_general_opinion}</span></td>
                                              </tr>
                                          </>
                                      );
                                  })
                              }
                          })}
                              {/*<tr id="wq_uuid_2141">
                                  <td id="wq_uuid_2142"><span id="gen40_0_txbZ1">1</span></td>
                                  <td id="wq_uuid_2144">
                                      <p id="gen40_0_txbZ2" className="whitespace-normal text-left">자신이 먼저 하고 싶은 일이 있어도 상대방을 배려하여 흔쾌히 양보하는 미덕을 가짐. 청소시간에도 자신의 활동을 마친 후 다른 학생들을 도와주는 등 급우들을 위해 배려하는 모습을 지님. 성취의욕이 높아 어려운 문제를 자신의 힘으로 풀고자 하는 의욕이 강하며 자신감을 갖고 도전하는 적극적인 자세를 지닌 학생임.</p>
                                  </td>
                              </tr>
                              <tr id="wq_uuid_2146">
                                  <td id="wq_uuid_2147"><span id="gen40_1_txbZ1">2</span></td>
                                  <td id="wq_uuid_2149">
                                      <p id="gen40_1_txbZ2" className="whitespace-normal text-left">해당내용은 「공공기관의 정보공개에 관한 법률」제9조 제1항 제5호에 따라 내부 검토 중인 사항으로 당해학년도에는 제공하지 않습니다.</p>
                                  </td>
                              </tr>*/}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
      {/* 생활기록부 시작 작성 끝*/}

      {/* 이전코드 카피본에 있음 */}

      <div className="flex mt-5 justify-center gap-3">
        <Link to="/life_record">
          <button className="btn bg-white w-24">목록</button>
        </Link>
        <Link to="/life_record_edit" state={userInfo}>
          <button className="btn w-24 btn-sky" state={userInfo}>수정하기</button>
        </Link>
      </div>
    </>
  );
}

export default LifeRecordView;
