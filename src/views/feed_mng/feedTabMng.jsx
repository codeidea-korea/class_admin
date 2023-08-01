import {
  Lucide,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@/base-components'
import React, { useState, useReducer, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import useAxios from '@/hooks/useAxios'
import { useRecoilValue } from 'recoil'
import { userState } from '@/states/userState'
import { userSchoolYear } from '@/components/helpers'
import { useQuery, useMutation } from 'react-query'
import request from '@/utils/request'
import Loading from '@/components/loading'
import ReviewTest from './review_test'
import MentoMng from './mentor_mng'
import FeedMng from './feed_mng'

const FeedTabMng = () => {
  const navigate = useNavigate()
  const url = useLocation().search
  const [tab, setTab] = useState('')

  useEffect(() => {
    if (url == '?review') {
      setTab('복습테스트')
    }else{
      setTab('자기소개서')
    }
  }, [url])

  return (
    <React.Fragment>
      <div className="flex gap-2 mt-5">
        <button
          className={
            tab == '자기소개서' ? 'btn btn-primary w-36' : 'btn bg-white w-36'
          }
          onClick={() => {
            setTab('자기소개서')
            navigate('')
          }}
        >
          자기소개서
        </button>
        <button
          className={
            tab == '복습테스트' ? 'btn btn-primary w-36' : 'btn bg-white w-36'
          }
          onClick={() => {
            setTab('복습테스트')
            navigate('?review')
          }}
        >
          복습테스트
        </button>
      </div>

      {tab == '자기소개서' && <FeedMng />}
      {tab == '복습테스트' && <ReviewTest />}
    </React.Fragment>
  )
}
export default FeedTabMng
