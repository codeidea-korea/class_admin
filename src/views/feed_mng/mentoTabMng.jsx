import {
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@/base-components'
import React, { useState, useReducer, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import useAxios from '@/hooks/useAxios'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'
import { userSchoolYear } from '@/components/helpers'
import { useQuery, useMutation } from 'react-query'
import request from '@/utils/request'
import Loading from '@/components/loading'
import ReviewTest from './review_test'
import MentoMng from './mentor_mng'

const MentoTabMng = () => {
  const url = useLocation().search
  const [tab, setTab] = useState('자기소개서')

  useEffect(() => {
    if (url == '?review') {
      setTab('복습테스트')
    }
  }, [])

  return (
    <React.Fragment>
      <div className="flex gap-2 mt-5">
        <button
          className={
            tab == '자기소개서' ? 'btn btn-primary w-36' : 'btn bg-white w-36'
          }
          onClick={() => {
            setTab('자기소개서')
          }}
        >
          자기소개서
        </button>
        <button
          className="btn bg-white w-36"
          onClick={() => alert('준비중입니다.')}
        >
          문제은행
        </button>
        <button
          className={
            tab == '복습테스트' ? 'btn btn-primary w-36' : 'btn bg-white w-36'
          }
          onClick={() => {
            setTab('복습테스트')
          }}
        >
          복습테스트
        </button>
      </div>

      {tab == '복습테스트' && <ReviewTest />}
      {tab == '자기소개서' && <MentoMng />}
    </React.Fragment>
  )
}
export default MentoTabMng
