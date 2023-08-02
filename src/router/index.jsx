import { useRoutes } from 'react-router-dom'
import { PrivateRoute } from './private-route'
import SideMenu from '../layouts/side-menu/Main'
import AdminMng from '../views/member_mng/admin_mng'

import MemberMng from '../views/member_mng/member_mng'
import MemberView from '../views/member_mng/member_view'
import MemberView2 from '../views/member_mng/member_view2'
import MemberEdit from '../views/member_mng/member_edit'
import MemberEdit2 from '../views/member_mng/member_edit2'

import CoverletterMng from '../views/coverletter_mng/coverletter_mng'

import LifeRecord from '../views/life_record/life_record'
import LifeRecordView from '../views/life_record/life_record_view'
import LifeRecordEdit from '../views/life_record/life_record_edit'

import FeedMng from '../views/feed_mng/feed_mng'
import FeedView from '../views/feed_mng/feed_view'

import MentoMng from '../views/feed_mng/mentor_mng'

import Notice from '../views/contents_mng/notice'
import NoticeCreate from '../views/contents_mng/noticeCreate'
import NoticeDetail from '../views/contents_mng/noticeDetail'

import Profit from '../views/contents_mng/profit'
import ProfitCreate from '../views/contents_mng/profitCreate'
import ProfitDetail from '../views/contents_mng/profitDetail'

import CurriCulum from '../views/contents_mng/curriculum'
import CurriCulumView from '../views/contents_mng/curriculumView'
import CurriculumCreate from '../views/contents_mng/curriculumCreate'

import ClassVideo from '../views/contents_mng/classVideo'
import ClassVideoControl from '../views/contents_mng/classVideoControl'
import ClassVideoView from '../views/contents_mng/classVideoView'

import OnlinebasicClass from '../views/contents_mng/online_basic_class'
import OnlineBasicClassForm from '../views/contents_mng/online_basic_class_form'

import MockExam from '../views/contents_mng/mock_exam'
import MockExamForm from '../views/contents_mng/mock_exam_form'

import Contents from '../views/contents_mng/contents'
import Contents2 from '../views/contents_mng/contents2'

import Login from '../views/login/login'
import Join from '../views/login/join'
import JoinResult from '../views/login/join_result'
import FindId from '../views/login/id_find'
import FindIdResult from '../views/login/id_find_result'
import PwFindstep1 from '../views/login/pw_find_step1'
import FindIdResult2 from '../views/login/id_find_result2'
import PwFindstep2 from '../views/login/pw_find_step2'
import PwFindResult from '../views/login/pw_find_reslut'
import ReservationList from '../views/reservation/ReservationList'
import ReservationView from '../views/reservation/ReservationView'
import GeOnlineMng from '../views/contents_mng/geOnlineMng'
import GeOnlineMngEdit from '../views/contents_mng/geOnlineMngEdit'
import ShOnlineMng from '../views/contents_mng/shOnlineMng'
import ShOnlineMngEdit from '../views/contents_mng/shOnlineMngEdit'
import ReadOnline from '../views/contents_mng/readOnline'
import PwChange from '../views/login/pw_change'
import ReadOnlineEdit from '../views/contents_mng/readOnlineEdit'
import PriorQuestion from '../views/contents_mng/PriorQuestion'
import PriorQuestionEdit from '../views/contents_mng/PriorQuestionEdit'
import ReviewTest from '../views/feed_mng/review_test'
import MentoTabMng from '../views/feed_mng/mentoTabMng'
import ReviewTestView from '../views/feed_mng/review_test_view'
import ReviewTestEdit from '../views/feed_mng/review_test_edit'
import FeedTabMng from '../views/feed_mng/feedTabMng'

function Router() {
  const routes = [
    {
      path: '/',
      element: <SideMenu />,
      children: [
        // 회원관리
        {
          path: '/',
          element: (
            <PrivateRoute
              element={<MemberMng />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/member_view/:id', //유형이 학생일 때
          element: (
            <PrivateRoute
              element={<MemberView />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/member_edit/:id',
          element: (
            <PrivateRoute
              element={<MemberEdit />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/member_edit2',
          element: (
            <PrivateRoute
              element={<MemberEdit2 />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/admin_mng',
          element: (
            <PrivateRoute element={<AdminMng />} role={['ADMIN', 'DIRECTOR']} />
          ),
        },

        // 자기소개서 관리
        {
          path: '/coverletter_mng',
          element: (
            <PrivateRoute
              element={<CoverletterMng />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },

        // 생활기록부 관리
        {
          path: '/life_record',
          element: (
            <PrivateRoute
              element={<LifeRecord />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },
        {
          path: '/life_record_view',
          element: (
            <PrivateRoute
              element={<LifeRecordView />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },
        {
          path: '/life_record_edit',
          element: (
            <PrivateRoute
              element={<LifeRecordEdit />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },

        // 피드백 관리
        {
          path: '/feed_mng',
          element: (
            <PrivateRoute
              element={<FeedTabMng />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },
        {
          path: '/feed_view/:feedId',
          element: (
            <PrivateRoute
              element={<FeedView />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },
        {
          path: '/mento_mng',
          element: (
            <PrivateRoute
              element={<MentoTabMng />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/mento_mng/view',
          element: (
            <PrivateRoute
              element={<ReviewTestView />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },
        {
          path: '/mento_mng/edit',
          element: (
            <PrivateRoute
              element={<ReviewTestEdit />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },

        // 콘텐츠 관리
        {
          path: '/notice', //공지사항
          element: (
            <PrivateRoute element={<Notice />} role={['ADMIN', 'DIRECTOR']} />
          ),
        },
        {
          path: '/notice/create',
          element: (
            <PrivateRoute
              element={<NoticeCreate isCreate />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/notice/:id',
          element: (
            <PrivateRoute
              element={<NoticeDetail />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/notice/edit/:id',
          element: (
            <PrivateRoute
              element={<NoticeCreate />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/profit', //혜택
          element: (
            <PrivateRoute element={<Profit />} role={['ADMIN', 'DIRECTOR']} />
          ),
        },
        {
          path: '/profit/:id',
          element: (
            <PrivateRoute
              element={<ProfitDetail />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/profit/create',
          element: (
            <PrivateRoute
              element={<ProfitCreate isCreate />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/profit/edit/:id',
          element: (
            <PrivateRoute
              element={<ProfitCreate />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/curriculum', //커리큘럼
          element: (
            <PrivateRoute
              element={<CurriCulum />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },
        {
          path: '/curriculum/:id',
          element: (
            <PrivateRoute
              element={<CurriCulumView />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },
        {
          path: '/curriculum/create',
          element: (
            <PrivateRoute
              element={<CurriculumCreate isCreate />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },
        {
          path: '/curriculum/edit/:id',
          element: (
            <PrivateRoute
              element={<CurriculumCreate />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },
        {
          path: '/classVideo', //실시간 영상 수업
          element: (
            <PrivateRoute
              element={<ClassVideo />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },
        {
          path: '/classVideo/create',
          element: (
            <PrivateRoute
              element={<ClassVideoControl isCreate />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },
        {
          path: '/classVideo/edit/:id',
          element: (
            <PrivateRoute
              element={<ClassVideoControl />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },
        {
          path: '/classVideo/:id',
          element: (
            <PrivateRoute
              element={<ClassVideoView />}
              role={['ADMIN', 'DIRECTOR', 'TEACHER']}
            />
          ),
        },

        {
          path: '/online_basic_class', //온라인 기초 학습
          element: (
            <PrivateRoute
              element={<OnlinebasicClass />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/online_basic_class_form/:id',
          element: (
            <PrivateRoute
              element={<OnlineBasicClassForm />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/mock_exam', //회차별 모의고사
          element: (
            <PrivateRoute element={<MockExam />} role={['ADMIN', 'DIRECTOR']} />
          ),
        },
        {
          path: '/mock_exam/edit/:id', //회차별 모의고사 수정
          element: (
            <PrivateRoute
              element={<MockExamForm />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },

        // 컨텐츠 URL 및 다운로드
        {
          path: '/contents', // 컨텐츠 URL 및 다운로드
          element: (
            <PrivateRoute element={<Contents />} role={['ADMIN', 'DIRECTOR']} />
          ),
        },

        // 컨텐츠 URL 및 다운로드
        {
          path: '/contents2', // 컨텐츠 URL 및 다운로드
          element: (
            <PrivateRoute
              element={<Contents2 />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },

        // 영재원 영상학습 관리
        {
          path: '/ge_online_mng',
          element: (
            <PrivateRoute
              element={<GeOnlineMng />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/ge_online_mng/edit',
          element: (
            <PrivateRoute
              element={<GeOnlineMngEdit />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },

        // 과학고 영상학습 관리
        {
          path: '/sh_online_mng',
          element: (
            <PrivateRoute
              element={<ShOnlineMng />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/sh_online_mng/edit',
          element: (
            <PrivateRoute
              element={<ShOnlineMngEdit />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },

        // 읽기자료 & 학습영상 링크
        {
          path: '/read_online',
          element: (
            <PrivateRoute
              element={<ReadOnline />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/read_online/edit',
          element: (
            <PrivateRoute
              element={<ReadOnlineEdit />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },

        // 방문 면접 대비 기출 문제
        {
          path: '/prior_question',
          element: (
            <PrivateRoute
              element={<PriorQuestion />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/prior_question/edit',
          element: (
            <PrivateRoute
              element={<PriorQuestionEdit />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },

        // 상담예약확인
        {
          path: '/reservation', // 상담예약확인
          element: (
            <PrivateRoute
              element={<ReservationList />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },
        {
          path: '/reservation/view/:id', // 상담예약확인
          element: (
            <PrivateRoute
              element={<ReservationView />}
              role={['ADMIN', 'DIRECTOR']}
            />
          ),
        },

        // 비밀번호 변경
        {
          path: '/pw_change',
          element: (
            <PrivateRoute element={<PwChange />} role={['ADMIN', 'DIRECTOR']} />
          ),
        },
      ],
    },
    // 로그인
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/join',
      element: <Join />,
    },
    {
      path: '/join_result', //회원가입 결과
      element: <JoinResult />,
    },
    {
      path: '/id_find',
      element: <FindId />,
    },
    {
      path: '/id_find_result', //아이디찾기 결과
      element: <FindIdResult />,
    },
    {
      path: '/pw_find_step1', //비밀번호 찾기
      element: <PwFindstep1 />,
    },
    {
      path: '/pw_find_step2', //비밀번호 재설정
      element: <PwFindstep2 />,
    },
    {
      path: '/pw_find_reslut', //비밀번호 찾기 결과
      element: <PwFindResult />,
    },
  ]

  return useRoutes(routes)
}

export default Router
