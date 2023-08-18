import React, { useEffect, useState } from 'react'
import useAxios from '@/hooks/useAxios'

function JoinPopup1() {
  const api = useAxios()
  const params = new URLSearchParams(location.search)
  const init = params.get('init')
  const mdlTkn = params.get('mdl_tkn')
  const [formData, setFormData] = useState({
    token: '',
    companyCode: '',
    popupUrl: '',
  })

  if (init) {
    api.get('/v1/kcb-identity-verification', {
      params: {
        siteType: 'admin'
      }
    })
      .then((r) => {
        const newFormData = {
          token: r.data.token,
          companyCode: r.data.companyCode,
          popupUrl: r.data.popupUrl,
        }
        setFormData(newFormData)
      })
      .catch(reason => console.log(reason))
  } else {
    api.get('/v1/kcb-identity-verification2', {
      params: {
        mdl_tkn: mdlTkn,
      },
    })
      .then((r) => {
        if (r.data.rsltCd === 'B000') {
          const result = {
            authType: 'PHONE',
            userName: r.data.rsltName,
            userPhone: r.data.telNo,
            userEmail: '',
          }
          window.opener.postMessage({ result }, window.location.origin)
          window.close()
        } else {
          window.close()
        }
      })
      .catch((reason) => console.log(reason))
  }

  useEffect(() => {
    const formEl = document.getElementById('phoneAuthPopup')
    if (formEl && formData.popupUrl !== '') {
      formEl.action = formData.popupUrl
      formEl.submit()
    }
  }, [formData])


  return (
    <React.Fragment>
      <form id='phoneAuthPopup' method='post' hidden={true}>
        <input type='hidden' name='tc' value='kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd' />
        <input type='hidden' name='mdl_tkn' value={formData.token} />
        <input type='hidden' name='cp_cd' value={formData.companyCode} />
        <input type='hidden' name='target_id' value='' />
      </form>
    </React.Fragment>
  )
}

export default JoinPopup1
