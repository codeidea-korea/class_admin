import dom from '@left4code/tw-starter/dist/js/dom'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAxios from '@/hooks/useAxios'

function Join() {
  const navigate = useNavigate()
  const api = useAxios()
  const [isDuplicatedUserID, setIsDuplicatedUserID] = useState(false)
  const [passCheck, setPassCheck] = useState(false)
  const [idCheckBorder, setIdCheckBorder] = useState(false)
  const [checkRequestAuth, setCheckRequestAuth] = useState(false)
  const [checkAuth, setCheckAuth] = useState(false)
  const [checkList, setCheckList] = useState([])
  const [joinParams, setJoinParams] = useState({
    userId: '', name: '',
    password: '', password_confirm: '',
    phone: '', code: '',
    tos1YN: 'Y', tos2YN: 'Y',
  })
  const [alertText, setAlertText] = useState({
    alertUserID: [0, ''],
    alertPass: [0, ''],
    alertPassCheck: [0, ''],
    alertName: [0, ''],
    alertResult: [0, ''],
  })
  const idReg = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/
  const passReg = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/

  const handleChange = (event) => {
    const { name, value } = event.currentTarget
    if (name === 'userId') {
      setIsDuplicatedUserID(false)
      if (value.length < 5 || value.length > 20) {
        setAlertText({ ...alertText, alertUserID: [1, '아이디는 5~20자의 영문 소문자, 숫자 조합으로 입력해주세요.'] })
        setIdCheckBorder(false)
      } else if (!idReg.test(value)) {
        setAlertText({ ...alertText, alertUserID: [1, '영문, 숫자를 최소 1자리를 포함해주세요.'] })
        setIdCheckBorder(false)
      } else {
        setAlertText({ ...alertText, alertUserID: [0, ''] })
        setIdCheckBorder(true)
      }
    } else if (name === 'password') {
      if (value.length < 8 || value.length >= 16) {
        setAlertText({ ...alertText, alertPass: [1, '8~16자리 이내로 해주세요.'] })
      } else if (!passReg.test(value)) {
        setAlertText({ ...alertText, alertPass: [1, '영문, 숫자, 특수문자를 최소 1자리를 포함해주세요.'] })
      } else {
        setAlertText({ ...alertText, alertPass: [0, ''] })
      }
    } else if (name === 'password_confirm') {
      if (joinParams.password !== value) {
        setAlertText({ ...alertText, alertPassCheck: [1, '비밀번호가 일치하지 않습니다.'] })
      } else {
        setAlertText({ ...alertText, alertPassCheck: [0, ''] })
        setPassCheck(true)
      }
    }
    setJoinParams({ ...joinParams, [name]: value })
  }

  // 인증 요청(휴대폰)
  const jsSubmit = () => {
    window.open(`/join_popup1?init=true`, 'auth_popup', 'width=430,height=640,scrollbars=yes')

    window.addEventListener('message', (event) => {
      if (event.origin === window.location.origin) {
        const result = event.data.result

        if(result.userPhone !== null && result.userPhone !== '') {
          setCheckAuth(true)
          setJoinParams({ ...joinParams, phone: result.userPhone })
        }
      }
    })
  }

  // 인증 요청
  const requestAuth = async () => {
    if (idCheckBorder && passCheck && isDuplicatedUserID && joinParams.name !== '' && joinParams.phone !== '') {
      setAlertText({ ...alertText, alertResult: [0, ''] })
      await api.get(`/v1/admin/sign-up/request-number?phone=${joinParams.phone}`)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            setCheckRequestAuth(true)
            setTimer(179)
          }
        })
        .catch((err) => {
          setAlertText({ ...alertText, alertResult: [1, '데이터 처리중 오류가 발생하였습니다.'] })
          console.log(err)
        })
    } else {
      setAlertText({ ...alertText, alertResult: [1, '필수 항목을 입력해주세요.'] })
    }
  }
  // 인증번호 확인
  const sendAuth = () => {
    if (timer <= 0 && checkRequestAuth) {
      setAlertText({ ...alertText, alertResult: [1, '인증 시간이 초과되었습니다. 다시 인증요청해주세요.'] })
      return false
    }
    api.post('/v1/admin/sign-up/check-number', joinParams)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setCheckAuth(true)
          setAlertText({ ...alertText, alertResult: [1, '인증이 정상적으로 처리되었습니다.'] })
        }
      })
      .catch((err) => {
        setAlertText({ ...alertText, alertResult: [1, err.response.data.msg] })
        console.log(err)
      })
  }

  // 아이디 중복확인
  const checkUserIdDuplication = () => {
    if (!joinParams.userId) {
      setAlertText({ ...alertText, alertUserID: [1, '아이디는 5~20자의 영문 소문자, 숫자 조합으로 입력해주세요.'] })
      return
    }
    api.get(`/v1/sign-up/check-duplicate?userId=${joinParams.userId}`)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setIsDuplicatedUserID(true)
          setAlertText({ ...alertText, alertUserID: [2, '사용 가능한 아이디입니다.'] })
        }
      })
      .catch((err) => {
        setIsDuplicatedUserID(false)
        setAlertText({ ...alertText, alertUserID: [1, err.response.data.msg] })
        console.log(err)
      })
  }

  // 회원가입
  const requestJoin = () => {
    if (!checkAuth) {
      setAlertText({ ...alertText, alertResult: [1, '본인인증을 진행해주세요.'] })
      return false
    }
    if (!checkList.includes('terms1') || !checkList.includes('terms2')) {
      setAlertText({ ...alertText, alertResult: [1, '회원가입 약관(필수)에 동의하셔야만 합니다.'] })
      return false
    }
    api.post('v1/admin/sign-up', joinParams)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          navigate('/join_result', { state: { code: 200 } })
        }
      })
      .catch((err) => {
        setAlertText({ ...alertText, alertResult: [1, err.response.data.msg] })
        console.log(err)
      })
  }

  // 체크박스 세트
  const handlerAllCheck = (event) => {
    let ckArr = Array.from(document.querySelectorAll('.ck'))
    let checked = event.target.checked
    ckArr.forEach(ck => {
      ck.checked = checked
    })
    checked ? setCheckList(['terms1', 'terms2']) : setCheckList([])
  }
  const handlerCheck = (event) => {
    event.currentTarget.checked
      ? setCheckList([...checkList, event.currentTarget.name])
      : setCheckList(checkList.filter((choice) => choice != event.currentTarget.name))
  }

  /** 타이머 */
  const [timer, setTimer] = useState(0)
  let timerId = useRef(null)
  useEffect(() => {
    if (timer >= 0) {
      const Counter = setInterval(() => {
        timerId.current = timer - 1
        if (timerId.current >= 0) setTimer(timerId.current)
      }, 1000)
      if (timerId.current === 0) setAlertText({ ...alertText, alertResult: [1, '인증 시간이 초과되었습니다.'] })
      return () => clearInterval(Counter)
    }
  }, [timer])
  const timeFormat = (time) => {
    const m = Math.floor(time / 60).toString()
    let s = (time % 60).toString()
    if (s.length === 1) s = `0${s}`
    return `${m}:${s}`
  }

  useEffect(() => {
    dom('body').removeClass('main').removeClass('error-page').addClass('login_body')
  }, [])


  useEffect(() => {
  }, [joinParams])

  // 자세히보기
  const [isOpen, setMenu] = useState(false)
  const toggleMenu = () => {
    setMenu(isOpen => !isOpen)
  }
  const [isOpen2, setMenu2] = useState(false)
  const toggleMenu2 = () => {
    setMenu2(isOpen2 => !isOpen2)
  }
  return (
    <React.Fragment>
      <div className='container'>
        <div className='block login_con'>
          {/* BEGIN: Login Form */}
          <div className='h-auto flex py-0 my-0'>
            <div className='my-auto mx-auto  px-8 rounded-md shadow-md login_size'>
              <h2 className='intro-x font-bold text-5xl text-center text-white'>
                WP Apply
                <br />
                <span className='text-xl'>admin</span>
              </h2>
              <div className='intro-y box mt-4'>
                <div className='p-3 px-5 flex items-center border-b border-slate-200/6 text-lg font-medium'>
                  관리자 회원가입
                </div>
                <div className='box p-8'>
                  <div className='intro-x'>
                    <div>
                      <div className='font-medium'>
                        아이디 <span className='text-danger'>*</span>
                      </div>
                      <div className='flex gap-2 items-center mt-1'>
                        <input
                          type='text' name={'userId'}
                          className='intro-x login__input form-control py-3 px-4 block'
                          placeholder='아이디를 입력해주세요.'
                          onChange={handleChange}
                        />
                        <button className='btn btn-primary w-28 py-3 shrink-0' onClick={checkUserIdDuplication}>중복확인
                        </button>
                      </div>
                      {!!alertText.alertUserID[0] &&
                        <div className='text-sm text-danger mt-2 ml-2'>{alertText.alertUserID[1]}</div>}
                    </div>
                    <div className='mt-3'>
                      <div className='font-medium'>
                        비밀번호 <span className='text-danger'>*</span>
                      </div>
                      <input
                        type='password' name={'password'}
                        className='intro-x login__input form-control py-3 px-4 block mt-1'
                        placeholder='비밀번호를 입력해주세요.'
                        onChange={handleChange}
                      />
                      {!!alertText.alertPass[0] &&
                        <div className='text-sm text-danger mt-2 ml-2'>{alertText.alertPass[1]}</div>}
                    </div>

                    <div className='mt-3'>
                      <div className='font-medium'>
                        비밀번호 확인 <span className='text-danger'>*</span>
                      </div>
                      <input
                        type='password' name={'password_confirm'}
                        className='intro-x login__input form-control py-3 px-4 block mt-1'
                        placeholder='비밀번호를 입력해주세요.'
                        onChange={handleChange}
                      />
                      {!!alertText.alertPassCheck[0] &&
                        <div className='text-sm text-danger mt-2 ml-2'>{alertText.alertPassCheck[1]}</div>}
                    </div>
                    <div className='mt-3'>
                      <div className='font-medium'>
                        이름<span className='text-danger'>*</span>
                      </div>
                      <input type='text' name={'name'}
                             className='intro-x login__input form-control py-3 px-4 block mt-1'
                             placeholder='이름을 입력해주세요.'
                             onChange={handleChange}
                      />
                      {!!alertText.alertName[0] &&
                        <div className='text-sm text-danger mt-2 ml-2'>{alertText.alertName[1]}</div>}
                    </div>
                    <div className='mt-3'>
                      <div className='font-medium'>휴대전화번호</div>
                      <div className='flex gap-2 items-center mt-1'>
                        <input
                          type='number' name={'phone'}
                          className='intro-x login__input form-control py-3 px-4 block w-96'
                          placeholder='인증을 진행해 주세요.'
                          value={joinParams.phone}
                          onChange={handleChange}
                          disabled={true}
                        />
                        <button className='btn btn-danger w-28 py-3 shrink-0' onClick={jsSubmit}>인증요청</button>
                        {/*<button className='btn btn-danger w-28 py-3 shrink-0' onClick={requestAuth}>인증요청</button>*/}
                        {checkRequestAuth && (<div className='text-slate-400'>{timeFormat(timer)}</div>)}
                      </div>
                      {/*<div className='flex gap-2 items-center mt-3'>*/}
                      {/*  <input*/}
                      {/*    type='text' name={'code'}*/}
                      {/*    className='intro-x login__input form-control py-3 px-4 block w-96'*/}
                      {/*    placeholder='인증번호를 입력해주세요.'*/}
                      {/*    onChange={handleChange}*/}
                      {/*  />*/}
                      {/*  <button*/}
                      {/*    className={joinParams.code !== ''*/}
                      {/*      ? 'btn btn-green w-28 py-3 shrink-0'*/}
                      {/*      : 'btn btn-secondary w-28 py-3 shrink-0'} onClick={sendAuth}>*/}
                      {/*    확인*/}
                      {/*  </button>*/}
                      {/*</div>*/}
                      {!!alertText.alertResult[0] &&
                        <div className='text-sm text-danger mt-2 ml-2'>{alertText.alertResult[1]}</div>}
                    </div>

                  </div>

                  {/* 약관동의 추가 */}
                  <div className='mt-5'>
                    <h2 className='text-lg'>약관동의</h2>
                    <div className='border p-5 mt-2 rounded-md'>
                      <div className=''>
                        <div className='form-check'>
                          <input id='checkbox-switch-1' className='form-check-input' type='checkbox' value=''
                                 onChange={handlerAllCheck} />
                          <label className='form-check-label' htmlFor='checkbox-switch-1'>회원가입 약관에 모두 동의합니다.</label>
                        </div>
                        <div className='mt-1 text-slate-400'>이용약관, 개인정보처리 및 이용에 대한 안내(일부 선택), 개인정보의 마케팅 및 광고 활용(선택),
                          개인정보의 위탁(선택)에 모두 동의합니다.
                        </div>
                      </div>
                      <div className='mt-3 border-t pt-3'>
                        <div className='flex justify-between items-center'>
                          <div className='form-check'>
                            <input id='checkbox-switch-2' className='form-check-input ck' type='checkbox'
                                   name='terms1' onChange={handlerCheck} />
                            <label className='form-check-label' htmlFor='checkbox-switch-2'>이용약관 <span
                              className='text-primary'>[필수]</span></label>
                          </div>
                          <button className='text-slate-400 underline see_detail' onClick={() => toggleMenu()}>자세히 보기
                          </button>
                        </div>
                        <div className={isOpen ? 'show-menu' : 'hide-menu'}>
                          <div
                            className='bg-slate-100 p-3 mt-2 rounded-md text-slate-500 h-80 overflow-y-auto agree_box'>
                            <h4>WP Apply 이용약관</h4>
                            <h5>제 1장 총칙</h5>
                            <h6>제 1조 (목적)</h6>
                            <p>
                              본 이용약관(이하 “약관”)은 ㈜ 이트리즈 과사람학원(이하 “회사”)과 이용 고객(이하 “회원”)간에 웹사이트 및 응용프로그램을 통해 회사가 제공하는 ㈜
                              이트리즈과사람 및 연계된 브랜드 서비스(이하 “서비스”)의
                              가입 조건 및 이용에 관한 제반 사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
                            </p>
                            <h6>제 2조 (이용약관의 효력 및 변경)</h6>
                            <p>본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
                              본 약관은 서비스 홈페이지에 온라인으로 공시됨으로써 효력이 발생되고, 합리적인 사유가 발생할 경우 회사는 관계법령에 위배되지 않는 범위에서 본 약관을 변경할 수
                              있습니다.
                              개정 약관은 서비스 홈페이지에 온라인으로 공시됨으로써 효력이 발생됩니다. 회사는 약관을 변경할 경우 지체 없이 이를 공시하여야 하고, 회원의 권리나 의무 등에
                              관한 중요사항을 개정할 경우에는 사전에 공시하여야 합니다.
                              본 약관에 동의하는 것은 정기적으로 서비스 홈페이지를 방문하여 약관의 변경사항을 확인하는 것에 동의함을 의미합니다. 변경된 약관을 인지하지 못해 발생하는 이용자의
                              피해에 대해서 회사에서는 책임지지 않습니다.
                              변경된 약관에 동의하지 않는 회원은 탈퇴(해지)를 요청할 수 있으며, 약관의 공시된 날로부터 7일 이내 별도의 이의 제기 및 거부의사를 표시하지 아니하고 서비스를
                              계속 사용할 경우는 약관에 동의한 것으로 간주됩니다.
                            </p>
                            <h6>제 3조 (약관과 기타 준칙)</h6>
                            <p>
                              본 약관은 회사가 제공하는 개별서비스에 관한 이용안내(이하 서비스별 안내라 함)와 함께 적용됩니다. 본 약관에 명시되지 아니한 사항은 관계법령 및 서비스별 안내로
                              갈음합니다.
                            </p>
                            <h6>제 4조 (용어 정의)</h6>
                            <p>
                              “회원”은 “회사”에서 제공하는 각각의 브랜드 서비스에 개인정보를 제공하여 회원등록을 한 자로서, “회사”가 제공하는 서비스를 계속적으로 이용할 수 있는 자를
                              말합니다.
                              “아이디(ID)”라 함은 “회사”에서 제공하는 서비스를 이용하기 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을 의미합니다.
                              “비밀번호”라 함은 “회원”임을 확인하고 비밀 보호를 위해 “회원”에게 부여된 “아이디”와 일치하는 “회원” 자신이 정한 영문, 숫자 또는 특수문자 등의 조합을
                              의미합니다.
                              “서비스 홈페이지”라 함은 “회원”이 온라인으로 “회사”에서 운영하는 위피어플라이 및 연계된 브랜드 서비스를 이용할 수 있는 당사의 인터넷 사이트를 의미합니다.
                              “브랜드 서비스”란 “회사”가 제공하는 모든 서비스를 의미하며 위피어플라이 웹사이트 도메인과 각 브랜드의 개별적인 도메인, 그리고 응용 프로그램으로 제공될 수
                              있습니다.
                              브랜드 서비스의 추가 변경사항은 위피어플라이 웹사이트를 통해 고지합니다.
                            </p>
                            <h5>제 2장 이용계약 체결</h5>
                            <h6>제 5조 (이용 계약의 성립)</h6>
                            <p>
                              이용 계약은 “회원”이 본 약관에 대한 동의와 이용신청에 대하여 회사가 이용승낙을 함으로써 성립하며, 본 이용약관에 대한 동의절차는 “회사는” 서비스 이용 신청
                              화면에 게시하고. “회원”은 본 약관과 동의 절차에 대하여 인지하고 신청을 완료함으로써 성립합니다.
                            </p>
                            <h6>제 6조 (서비스 이용 신청)</h6>
                            <p>
                              회원으로 가입하여 본 서비스를 이용하고자 하는 자는 회사에서 요청하는 제반 정보(이름, 연락처 등)를 제공하여야 합니다.
                              모든 회원은 반드시 회원 본인의 이름을 제공하여야만 서비스를 이용할 수 있으며, 실명으로 등록하지 않는 자는 일체의 권리를 주장할 수 없으며, 만일 제 3의 명의
                              도용 및 부정한 방법으로 이용하는 경우에는 관련법령에 의해 처벌 받을 수 있습니다.
                              회사는 본 서비스를 이용하는 회원을 등급별로 구분하고 이용시간, 이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수 있습니다.
                            </p>
                            <h6>제 7조 (서비스의 제공 및 변경)</h6>
                            <p>
                              회사는 회원에게 아래와 같은 서비스를 제공합니다.<br />
                              ① 회원을 위한 섹션 및 컨텐츠 서비스, 동영상 서비스<br />
                              ② 회사가 자체 개발하거나 다른 회사와 협력계약을 통해 회원들에게 제공할 일체의 서비스<br />
                              “회사”는 서비스 변경 시 변경될 서비스의 내용 및 제공일자를 홈페이지를 통해 공지하고 서비스를 변경하여 “회원”에게 제공할 수 있습니다.
                            </p>
                            <h6>제 8조 (개인 정보의 보호 및 사용)</h6>
                            <p>
                              회사는 고객의 개인정보를 보호하고 존중합니다.
                              회사는 별도의 이벤트 및 마케팅 활동과 기타 “회사”에서 제공하는 서비스를 이용하기 위한 과정에서 수집되는 개인정보를 활용하여 서비스 안내 및 경품 제공 동의
                              마케팅 활용을 할 수 있으며, 이용약관에 명시된 서비스 제공을 위한 목적으로만 사용합니다.
                              회사는 서비스 제공과 관련하여 취득한 고객의 신상정보를 본인의 승낙 없이 제3자에게 누설할 수 없으며, 기타 자세한 사항은 정보통신 보호법에 따릅니다.
                              다만, 다음의 각 호의 경우에는 예외로 제공할 수 있습니다.<br />
                              ① 서비스의 제공에 따른 요금 정산을 위하여 필요한 경우<br />
                              ② 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서, 특정 개인을 식별할 수 없는 형태로 가공하여 제공하는 경우<br />
                              ③ 관계법령에 의하여 수사상 목적으로 정해진 절차와 방법에 따라 관계기관의 요구가 있는 경우<br />
                              ④ 다른 법률에 특별한 규정이 있는 경우<br />
                              ⑤ 정보통신윤리위원회가 관계법령에 의하여 요청한 경우<br />
                              ⑥ 회원에게 보다 전문적이고 다양한 서비스를 제공하기 위한 경우<br />
                              회사는 회원에게 제3항의 전문적이고 다양한 서비스를 제공하기 위해 자체적으로 TM을 하거나, 외부 전문 사업자와 제휴하여 공동으로 마케팅 서비스(TM, SMS,
                              메일 등 광고성 정보 발송)를 제공할 수 있습니다.
                              전문적인 지식, 경험과 상담이 요구되는 서비스의 경우 회원의 동의를 받아 외부전문사업자와 공동으로 서비스를 제공하며 이때 해당전문사업자의 상호와 공유목적, 공유
                              정보를 명시합니다.
                              외부전문사업자와의 공동서비스를 제공함에 있어 회원의 성명, 연락처 등 공동서비스에 필요한 최소한의 정보가 공유될 수 있고, 공유되는 정보는 아래 각호와 같이
                              엄격히 보호 관리됩니다.<br />
                              ① 공유되는 정보는 해당 전문 서비스 이외 어떠한 다른 용도로도 사용되지 않습니다.<br />
                              ② 서비스 제공 과정에서 해당 전문 서비스에 대해 회원이 동의의사를 밝히지 않거나 사전에 거부의사를 밝힐 경우 최소한의 정보도 전문 사업자와 공유하지
                              않습니다.<br />
                              <br />
                              제 4항의 개인정보 이용에 관한 회원의 동의는 본 약관에 동의하는 것으로 갈음할 수 있습니다. 회원은 언제든 원할 경우 회사에 제공한 개인정보의 수집과 이용에
                              관한 동의를 철회할 수 있고, 위 동의의 철회는 해지 신청을 하는 것으로 이루어집니다.
                              개인정보보호와 관련된 보다 자세한 사항은 개인정보취급방침을 참고하시기 바랍니다.

                            </p>
                            <h6>제 9조 (이용 신청의 승낙과 제한)</h6>
                            <p>
                              회사는 제6조의 규정에 의한 이용신청고객에 대하여 업무 수행상 또는 기술상 지장이 없는 경우 원칙적으로 접수순서에 따라 서비스 이용을 승낙합니다. 회사는
                              아래사항에 해당할 경우 이용 승낙하지 않을 수 있습니다.<br />
                              ① 실명이 아니거나 타인의 명의를 이용하여 신청한 경우<br />
                              ② 이용계약 신청서의 내용을 허위로 기재한 경우<br />
                              ③ 부정한 용도로 본 서비스를 이용하고자 하는 경우<br />
                              ④ 영리를 추구할 목적으로 본 서비스를 이용하고자 하는 경우<br />
                              ⑤ “회사”에서 제공하는 서비스와 경쟁관계에 있는 이용자가 신청하는 경우<br />
                              ⑥ 회사의 서비스 제공에 피해를 끼칠 수 있다고 판단되는 경우<br />
                              ⑦ 기타 규정한 제반 사항을 위반하여 신청하는 경우<br />
                              <br />
                              회사는 서비스 이용신청이 다음 각 호에 해당하는 경우에는 그 신청에 대하여 승낙 제한사유가 해소될 때까지 승낙을 유보할 수 있습니다.<br />
                              ① 회사가 설비의 여유가 없는 경우<br />
                              ② 회사의 기술상 지장이 있는 경우<br />
                              ③ 기타 이용승낙이 곤란한 사유가 있는 경우<br />
                              회사는 이용신청고객이 관계법령에서 규정하는 미성년자일 경우에 서비스별 안내에서 정하는 바에 따라 승낙을 보류할 수 있습니다.
                              미성년자는 관련 법령에 따라 회원가입 또는 서비스이용이 제한될 수 있으며, 부모 등 법정대리인의 동의를 얻은 후 서비스이용을 위한 결제를 진행하여야 합니다.
                              다만 법정대리인이 동의하지 아니한 경우, 미성년자 본인 또는 법정대리인은 결제를 취소할 수 있습니다.
                            </p>
                            <h6>제 10조 (이용자 ID 부여 및 변경 등)</h6>
                            <p>
                              회사는 약관에 정하는 바에 따라 이용고객에게 이용자 ID를 부여합니다.
                              이용자 ID는 원칙적으로 변경이 불가하며 부득이한 사유로 인하여 변경하고자 할 경우에는 해당 ID를 해지하고 재가입해야 합니다.
                              회원 ID는 다음 각 호에 해당할 경우 이용고객 또는 회사의 요청으로 변경할 수 있습니다.<br />
                              ① 회원 ID가 이용자의 전화번호 또는 주민등록번호 등으로 등록되어 사생활 침해가 우려되는 경우<br />
                              ② 타인에게 혐오감을 주거나 미풍양속에 어긋나는 행위를 한 경우<br />
                              ③ 기타 합리적인 사유가 있는 경우<br />
                              회원 ID 및 비밀번호의 관리책임은 이용자에게 있고, 그 관리책임을 소홀히 하여 발생하는 서비스 이용상의 손해나 제 3자에 의한 부정이용 등의 책임은 전적으로
                              이용자가 부담하여야 합니다.
                              회원은 자신의 ID 및 비밀번호를 도난 당하거나 제 3자가 사용하고 있음을 인지한 경우에는 바로 회사에 통보하고 회사의 안내가 있는 경우에는 그에 따라야 합니다.
                              기타 이용자 개인 정보 관리 및 변경 등에 관한 사항은 서비스별 안내에 정하는 바에 따릅니다.
                            </p>
                            <h5>제 3장 계약 당사자의 의무</h5>
                            <h6>제 11조 (회사의 의무)</h6>
                            <p>
                              회사는 특별한 사정이 없는 한 회원이 희망한 서비스 이용 개시일에 서비스를 제공하고 계속적이고 안정적으로 서비스를 제공해야 합니다.
                              회사는 개인정보 보호를 위한 보안시스템을 구축하고 개인정보취급방침을 공시하고 준수합니다.
                              회사는 이용고객으로부터 제기되는 의견이나 불만이 정당하다고 인정될 경우 적절한 조치를 취해야 하고, 즉시 처리하기 곤란한 경우에는 이용자에게 그 사유와 처리일정을
                              통보해야 합니다.
                            </p>
                            <h6>제 12조 (이용자의 의무)</h6>
                            <p>
                              이용자는 회원가입신청이나 회원정보변경 시 모든 사항을 사실에 근거해 작성하여야 하며, 허위 또는 타인의 정보를 이용하여 등록할 경우에는 ‘회원’으로서의 일체의
                              권리를 주장할 수 없습니다.
                              회원은 주소, 연락처, 전자우편주소 등 이용계약사항의 변경이 있을 경우 필요한 절차를 거쳐 즉시 이를 회사에 알려야 합니다.
                              회원은 본 약관과 관계법령 등 제반 규정 및 회사의 공지사항을 준수하여야 하며, 회사의 업무를 방해하거나 회사의 명예를 손상시키는 행위를 해서는 안됩니다.
                              회원은 회사의 사전 승낙 없이 서비스를 이용하여 영업활동을 할 수 없으며, 회사는 그 영업활동에 대한 책임을 부담하지 않습니다. 또한 회원은 위와 같은
                              영업활동으로 회사에 손해를 입힐 경우 손해배상책임을 부담합니다.
                              회원은 회사의 명시적 동의가 없는 한 서비스의 이용권한, 기타 이용계약상의 지위를 타인에게 양도, 증여, 담보제공 할 수 없습니다.
                              회원은 회사 및 제 3자의 지적재산권을 침해해서는 안됩니다.
                              회사는 회원이 다음 각 호의 행위를 할 경우 회원의 서비스 이용제한 등 적절한 제한조치를 할 수 있습니다.<br />
                              ① 회원 가입 신청 또는 회원정보 변경시 허위내용을 등록하는 행위<br />
                              ② 다른 이용자의 ID, 비밀번호, 주민등록번호를 도용하는 행위<br />
                              ③ 이용자 ID를 타인과 거래하는 행위<br />
                              ④ 회사의 운영진, 직원 또는 관계자를 사칭하는 행위<br />
                              ⑤ 회사로부터 특별한 권리를 부여 받지 않고 회사의 응용프로그램을 변경하거나, 회사의 서버를 해킹하거나, 웹사이트 또는 게시된 정보의 일부분 또는 전체를 임의로
                              변경하는 행위<br />
                              ⑥ 회사에서 제공하는 서비스에 위해를 가하거나 고의로 방해하는 행위<br />
                              ⑦ 본 서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 서비스 이용 되의 목적으로 복제하거나, 이를 출판 및 방송 등에 사용하거나, 제 3자에게 제공하는
                              행위<br />
                              ⑧ 공공질서 및 미풍양속에 위반되는 저속, 음란한 내용의 정보, 문장, 도형, 음향, 동영상을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게 유포하는 행위<br />
                              ⑨ 모욕적이거나 개인신상에 대한 내용이어서 타인의 명예나 프라이버시를 침해할 수 있는 내용을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게 유포하는
                              행위<br />
                              ⑩ 다른 이용자를 희롱 또는 위협하거나, 특정 이용자에게 지속적으로 고통 또는 불편을 주는 행위<br />
                              ⑪ 회사의 승인을 받지 않고 다른 사용자의 개인정보를 수집 또는 저장하는 행위<br />
                              ⑫ 범죄와 결부된다고 객관적으로 판단되는 행위<br />
                              ⑬ 본 약관을 포함하여 기타 회사가 정한 제반 규정 또는 이용 조건을 위반하는 행위<br />
                              ⑭ 기타 관계법령에 위배되는 행위
                            </p>
                            <h6>제 13조 (게시물의 관리)</h6>
                            <p>
                              회사는 다음 각 호에 해당하는 게시물이나 자료를 사전통지 없이 삭제, 이동하거나 등록 거부할 수 있습니다.<br />
                              ① 다른 회원 또는 제 3자에게 심한 모욕을 주거나 명예를 손상시키는 내용인 경우<br />
                              ② 공공질서 및 미풍양속에 위반되는 내용을 유포하거나 링크시키는 경우<br />
                              ③ 불법 복제 또는 해킹을 조장하는 내용인 경우<br />
                              ④ 영리를 모적으로 하는 광고일 경우<br />
                              ⑤ 범죄와 결부된다고 객관적으로 인정되는 내용일 경우<br />
                              ⑥ 다른 이용자 또는 제 3자의 저작권 등 기타 권리를 침해하는 내용인 경우<br />
                              ⑦ 회사에서 규정한 게시물 원칙에 어긋나거나, 게시판 성격에 부합하지 않는 경우<br />
                              ⑧ 기타 관계 법령에 위배된다고 판단되는 경우
                            </p>
                            <h6>제 14조 (게시물에 대한 저작권)</h6>
                            <p>
                              서비스 화면 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다. 만일 위 게시물이 제 3자의 지적재산권을 침해할 경우의 모든 책임은 게시물을 게시한 회원이
                              부담하며, 이로 인해 회사가 타인으로부터 손해배상청구 등을 받게 될 경우 회원은 회사의 면책을 위해 노력해야 하고, 회사가 면책되지 않을 경우 회사의 모든 손해를
                              배상하여야 한다.
                              회사는 게시자의 동의없이 게시물을 상업적으로 이용할 수 없습니다.다만 서비스 내에 이를 게시할 권리를 갖습니다.
                              회원은 서비시를 이용하여 취득한 정보를 가공, 판매하는 행위 등 서비스에 게재된 자료를 영리목적으로 이용하거나 제 3자에게 이용할 수 없습니다.
                              회사는 회원이 게시하거나 등록하는 서비스 내의 내용물, 게시물이 제 14조 각 호에 해당된다고 판단할 경우 이를 삭제하거나 등록 거부할 수 있습니다.
                            </p>
                            <h6>제 15조 (정보의 제공)</h6>
                            <p>
                              회사는 서비스를 운영함에 있어 각종 정보를 서비스 화면에 게재하거나 전자 우편, SMS, 알림톡이나 서신우편 등의 방법으로 회원에게 제공할 수 있습니다.
                              회사는 서비스 개선 및 회원 대상의 서비스 소개 등의 목적으로 회원의 동의 하에 추가적인 개인 정보를 요구할 수 있습니다.
                            </p>
                            <h5>제 4장 청약 철회 및 이용 제한</h5>
                            <h6>제 16조 (계약 변경 및 해지)</h6>
                            <p>
                              회원이 이용계약을 해지하고자 하는 때에는 회원 본인 서비스 홈페이지의 회원 가입 변경메뉴를 이용해 가입 해지를 해야 합니다.
                            </p>
                            <h6>제 17조 (서비스 이용제한)</h6>
                            <p>
                              회사는 회원이 서비스 이용내용에 있어서 본 약관 제 12조 내용을 위반하거나, 다음 각 호에 해당하는 경우 서비스 이용을 제한할 수 있습니다.<br />
                              ① 미풍양속을 저해하는 비속한 ID 및 별명 사용<br />
                              ② 타 이용자에게 심한 모욕을 주거나, 서비스 이용을 방해한 경우<br />
                              ③ 정보통신 윤리위원회 등 관련 공공기관의 시정 요구가 있는 경우<br />
                              ④ 불법 홈페이지인 경우 상용소프트웨어나 크랙 파일을 올린 경우<br />
                              ⑤ 정보통신윤리 위원회의 심의 세칙 제 7조에 어긋나는 음란물을 게재한 경우<br />
                              ⑥ 반국가적 행위의 수행을 목적으로 하는 내용을 포함한 경우<br />
                              ⑦ 저작권이 있는 글을 무단 복제하거나 저작권을 위배한 콘텐츠를 불법 유통한 경우<br />
                              ⑧ 기타 정상적인 서비스운영에 방해가 될 경우<br />
                              상기 이용제한 규정에 따라 서비스를 이용하는 회원에게 서비스 이용에 대하여 별도 공지 없이 서비스 이용의 일시정지, 초기화, 이용계약 해지 등을 불량이용자
                              처리규정에 따라 취할 수 있습니다.
                              회사는 회원 자격을 제한, 정지시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되니 아니하는 경우 회사는 회원 자격을 상실시킬 수
                              있습니다.
                              회사가 회원 자격을 상실시키는 경우에는 회원 등록을 말소합니다.
                            </p>
                            <h5>제 5장 손해배상 및 기타사항</h5>
                            <h6>제 18조 (손해배상)</h6>
                            <p>회사가 제공하는 서비스로 인하여 회원에게 손해가 발생하는 경우 회사는 그 손해가 회사의 고의 또는 중과실에 의한 경우에 한하여 통상손해의 범위에서 손해배상책임을
                              부담합니다.</p>
                            <h6>제 19조 (면책조항)</h6>
                            <p>
                              회사가 천재지변, 전쟁 및 폐업, 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임이 면제됩니다.<br />
                              회사는 기간통신 사업자가 전기통신 서비스를 중지하거나 정상적으로 제공하지 아니하여 손해가 발생한 경우 책임이 면제됩니다.<br />
                              회사는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다.<br />
                              회사는 회원의 귀책사유로 인한 서비스 이용의 장애 또는 손해에 대하여 책임을지지 않습니다.<br />
                              회사는 이용자의 컴퓨터 오류에 의해 손해가 발생한 경우, 또는 회원이 신상정보 및 전자우편주소를 부실하게 기재하여 손해가 발생한 경우 책임을지지
                              않습니다.<br />
                              회사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을지지 않습니다.<br />
                              회사는 회원이 서비스를 이용하면서 얻은 자료로 인한 손해에 대하여 책임을지지 않습니다. 또한 회사는 회원이 서비스를 이용하며 타 회원으로 인해 입게 되는 정신적
                              피해에 대하여 보상할 책임을지지 않습니다.<br />
                              회사는 회원이 서비스에 게재한 각종 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 대하여 책임을지지 않습니다.<br />
                              회사는 이용자 상호간 및 이용자와 제 3자 상호 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임도 없습니다.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='mt-3 border-t pt-3'>
                        <div className='flex justify-between items-center'>
                          <div className='form-check'>
                            <input id='checkbox-switch-3' className='form-check-input ck' type='checkbox'
                                   name='terms2' onChange={handlerCheck} />
                            <label className='form-check-label' htmlFor='checkbox-switch-3'>개인정보 필수항목에 대한 처리 및 이용 <span
                              className='text-primary'>[필수]</span></label>
                          </div>
                          <button className='text-slate-400 underline' onClick={() => toggleMenu2()}>자세히 보기</button>
                        </div>
                        <div className={isOpen2 ? 'show-menu' : 'hide-menu'}>
                          <div
                            className='bg-slate-100 p-3 mt-2 rounded-md text-slate-500 h-80 overflow-y-auto agree_box'>
                            <h5>개인정보처리방침</h5>
                            <p>
                              ㈜ 이트리즈 과사람(이하 “회사”라 합니다)는 정보주체의 자유와 권리 보호를 위해 「개인정보보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인 정보를
                              처리학 안전하게 관리하고 있습니다.
                              이에 「개인정보 보호법」 제 30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련된 고충을 신속하고 원활하게 처리할 수 있도록
                              하기 위하여 다음과 같이 개인정보처리방침을 수립·공개합니다.
                            </p>
                            <h6>제 1조 (개인 정보의 수집에 대한 동의)</h6>
                            <p>
                              회사는 개인정보처리방침의 내용에 대하여 「동의」할 수 있는 절차를 마련하여, 회원이 「동의」 버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 간주합니다. 단,
                              학부모가 자녀를 추가로 가입하는 경우 학부모가 「동의」 버튼을 선택하면 자녀의 개인정보 수집에 대해 동의한 것으로 간주합니다.
                            </p>
                            <h6>제 2조 (개인정보의 수집방법 및 항목)</h6>
                            <p>
                              ① 개인정보 수집 방법은 다음과 같습니다.<br />
                              - 홈페이지를 통한 회원가입, 입학시험 예약, 상담게시판, 행사 참가<br />
                              - 회원 또는 제휴사로부터의 제공<br />
                              - 생성 정보 수집 툴을 통한 수집<br />
                              - 학원 시설(강의실 등)에 설치된 CCTV를 통한 정보 수집<br />
                              - 학원에서 학생 관리 및 환불 처리를 통한 정보 수집<br />
                              - 영상정보처리기기(네트워크 카메라 등)를 통한 영상(초상 포함) 및 음성 정보 수집<br />
                              ② 각각의 개인정보 수집항목은 다음과 같습니다.
                            </p>
                            <table>
                              <thead>
                              <tr>
                                <th>구분</th>
                                <th>수집항목</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <th>회원 가입 및 관리</th>
                                <td>아이디, 비밀번호, 이름, 성별, 생년월일, 휴대전화번호, 이메일, 학년, 학교</td>
                              </tr>
                              <tr>
                                <th>고객 상담</th>
                                <td>이름, 이메일, 휴대전화번호, 상담 내용 및 문의 사항</td>
                              </tr>
                              <tr>
                                <th>이벤트 응모</th>
                                <td>이름, 휴대전화번호</td>
                              </tr>
                              <tr>
                                <th>자동 생성 정보</th>
                                <td>IP Address, 쿠키, 방문일자, 서비스 이용기록</td>
                              </tr>
                              </tbody>
                            </table>
                            <h6>제 3조 (개인 정보의 처리 목적)</h6>
                            <p>
                              회사는 다음의 목적을 위하여 최소한의 개인정보를 수집하여 처리합니다.<br />
                              ○ 회원 가입<br />
                              - 회원제 서비스 이용에 따른 본인확인, 개인식별, 불량 회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 연령 확인, 학사 기록 관리, 만 14세
                              미만 아동 개인정보 수집 시 법정 대리인 동의 여부 확인, 불만 처리 등 민원처리, 고지사항 전달<br />
                              ○ 방문 상담, 테스트 및 수강 신청<br />
                              - 강의 등록 및 서비스 제공, 고지사항 전달, 학사기록 관리, 이벤트 참여, 민원처리, 환불 접수, 수준 테스트 및 과정 맞춤형 컨설팅, 고객 상담
                              등<br />
                              ○ 서비스 제공에 관한 계약 이행<br />
                              - 강의 및 콘텐츠 제공, 교육서비스 제공 사실 확인, 수업환경 모니터링, 강의자료 활동<br />
                              ○ 기록 보존<br />
                              - 학원법 시행규칙 제 17조에 따른 기록보관<br />
                              ○ 홍보 및 마케팅, 광고 (홍보, 마케팅 동의 시)<br />
                              - 수상 및 합격 사실 공개 등을 통한 홍보와 마케팅, 신규 서비스(제품)개발 및 특화, 이벤트 등 광고성 정보 전달, 접속 빈도 파악, 회원의 서비스 이용에
                              대한 통계
                            </p>
                            <h6>제 4조 (개인 정보의 보유 및 보유기간)</h6>
                            <p>
                              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리하고 보유합니다.
                              각각의 개인 정보 처리 및 보유기간은 다음과 같습니다.<br />
                              ① 약관 및 정책에 따라 서비스 이용의 혼성, 부정 이용방지, 불법적 사용자에 대한 관련 기관 수사협조를 위하여 회원탈퇴 후 1년간 개인 정보를 보존하며, 이
                              기간이 경과한 후에 삭제합니다.<br />
                              ② 회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다. 단 다음의 정보에 개해서는 아래의 이류로 명시한 기간 동안
                              보존합니다.<br />
                              1. 로그인 ID<br />
                              - 보존이유 : 부정 사용 방지 및 재가입 금기<br />
                              - 보존 기간 : 3년<br />
                              2. 이름, 주소, 휴대폰 번호, 법정 대리인 정보<br />
                              - 보존 근거 : 전자상거래 등에서의 소비자보호에 관한 법률<br />
                              - 표시·광고에 관한 기록 : 6월<br />
                              - 계약 또는 청약철회 등에 관한 기록 : 5년<br />
                              - 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년<br />
                              3. 웹사이트 방문 기록 : 3개월<br />
                              - 보존 근거 : 통신비밀보호법
                            </p>
                            <h6>제 5조 (정보주체와 법정대리인의 권리·의무 및 행사방법)</h6>
                            <p>
                              ① 정보주체는 회사에 대해 언제든지 개인정보 열람, 정정, 삭제, 처리정리 요구 등의 권리를 행사할 수 있습니다.<br />
                              ② 권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제 41조 제 1항에 따라 서면, 전자우편, 모사전성(FAX) 등을 통하여 하실 수 있으며, 회사는 이에
                              대해 지체없이 조치하겠습니다.<br />
                              ③ 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)”
                              별지 제 11호 서식에 따른 위임장을 제출하여셔야 합니다.<br />
                              ④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제 35조 제 4항, 제 37조 제 2항에 의하여 정보주체의 권리가 제한될 수 있습니다.<br />
                              ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.<br />
                              ⑥ 회사는 정보주체 권리에 따른 열람의 요구, 정정, 삭제의 요구, 처리정지의 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.<br />
                              ⑦ 개인 정보 조회, 수정을 위해서는 “개인정보 변경”(또는 “회원정보수정” 등)을, 가입 해지(동의 철회)를 위해서는 “회원탈퇴”를 클릭하여 본인 확인 절차를
                              거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
                            </p>
                            <h6>제 6조 (개인정보의 안정성 확보조치)</h6>
                            <p>
                              회사는 개인정보의 안정성 확보를 위해 다음과 같은 조치를 취하고 있습니다.<br />
                              ① 관리적 조치 : 내부관리계획 수립, 시행, 정기적 직원 교육 등<br />
                              ② 기술적 조치 : 개인정보처리시스템 등의 접근 권한 관리, 접근 통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치(백신 프로그램 포함) 및
                              갱신<br />
                              ③ 물리적 조치 : 외부로부터 접근이 통제된 구역에 시스템을 설치하고 있으며, 출입통제 절차를 수립 및 운영
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  {/* 약관동의 추가 끝 */}
                  <div className='intro-x mt-5 text-center '>
                    <Link to='#' onClick={requestJoin}>
                      <button className='btn btn-sky py-3 px-4 w-full align-top'>
                        회원가입
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: Login Form */}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Join
