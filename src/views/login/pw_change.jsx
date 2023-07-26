import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxios from '@/hooks/useAxios'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'

const PwChange = () => {
  const api = useAxios()
  const user = useRecoilValue(userState)

  const [alertText, setAlertText] = useState({
    alertPwd: [0, ''],
    alertResult: [0, ''],
  })

  const [pwParams, setPwParams] = useState({
    password: 'string',
    newPassword: 'string',
    newPasswordChk: 'string',
  })

  const passReg = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/

  const handleChange = (event) => {
    const { name, value } = event.currentTarget
    if (name === 'newPassword') {
      if (value.length < 8 || value.length >= 16) {
        setAlertText({
          ...alertText,
          alertPwd: [1, '8~16자리 이내로 해주세요.'],
        })
      } else if (!passReg.test(value)) {
        setAlertText({
          ...alertText,
          alertPwd: [1, '영어 대소문자, 숫자 조합으로 입력해주세요.'],
        })
      } else {
        setAlertText({ ...alertText, alertPwd: [0, ''] })
      }
    }
    setPwParams({ ...pwParams, [name]: value })
  }

  // 비밀번호 변경
  const changeHandle = () => {
    if (pwParams.password === '') {
      setAlertText({ ...alertText, alertPwd: [1, '비밀번호를 입력해주세요.'] })
      return false
    }
    if (pwParams.newPassword !== pwParams.newPasswordChk) {
      setAlertText({
        ...alertText,
        alertResult: [
          1,
          '비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.',
        ],
      })
      return false
    }

    api
      .post(
        `/v1/admin/direct-new-password?userId=${user.userId}&password=${pwParams.password}&newPassword=${pwParams.newPassword}&newPasswordChk=${pwParams.newPasswordChk}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      )
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          alert('비밀번호가 변경되었습니다')
          setAlertText({ ...alertText, alertResult: [1, ''] })
        }
      })
      .catch((err) => {
        setAlertText({ ...alertText, alertResult: [1, err.response.data.msg] })
        console.log(err)
      })
  }

  return (
    <>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium">비밀번호 변경</div>
        </div>
        <div className="intro-y p-5">
          <div className="font-medium">기존 비밀번호</div>
          <input
            type="password"
            name="password"
            className="login__input form-control px-4 block mt-1"
            placeholder="기존 비밀번호를 입력해주세요."
            onChange={handleChange}
          />

          <div className="font-medium mt-5">새 비밀번호</div>
          <input
            type="password"
            name="newPassword"
            className="login__input form-control px-4 block mt-1"
            placeholder="새 비밀번호를 입력해주세요."
            onChange={handleChange}
          />
          {!!alertText.alertPwd[0] && (
            <div className="text-sm text-danger mt-2 ml-2">
              {alertText.alertPwd[1]}
            </div>
          )}
          <div className="font-medium mt-5">새 암호를 확인합니다</div>
          <input
            type="password"
            name="newPasswordChk"
            className="login__input form-control px-4 block mt-1"
            placeholder="새 비밀번호를 입력해주세요."
            onChange={handleChange}
          />
          {!!alertText.alertResult[0] && (
            <div className="text-sm text-danger mt-2 ml-2">
              {alertText.alertResult[1]}
            </div>
          )}
          <button className="btn btn-primary mt-7" onClick={changeHandle}>
            비밀번호 변경
          </button>
        </div>
      </div>
    </>
  )
}
export default PwChange
