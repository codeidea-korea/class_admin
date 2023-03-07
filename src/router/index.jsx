import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import AdminMng from "../views/member_mng/admin_mng";

import MemberMng from "../views/member_mng/member_mng";
import MemberView from "../views/member_mng/member_view";
import MemberView2 from "../views/member_mng/member_view2";
import MemberEdit from "../views/member_mng/member_edit";
import MemberEdit2 from "../views/member_mng/member_edit2";

import CoverletterMng from "../views/coverletter_mng/coverletter_mng";

import LifeRecord from "../views/life_record/life_record";
import LifeRecordView from "../views/life_record/life_record_view";
import LifeRecordEdit from "../views/life_record/life_record_edit";

import FeedMng from "../views/feed_mng/feed_mng";
import FeedView from "../views/feed_mng/feed_view";

import MentoMng from "../views/feed_mng/mentor_mng";

import Notice from "../views/contents_mng/notice";
import NoticeEdit from "../views/contents_mng/notice_edit";
import NoticeView from "../views/contents_mng/notice_view";

import Profit from "../views/contents_mng/profit";
import ProfitView from "../views/contents_mng/profit_view";
import ProfitEdit from "../views/contents_mng/profit_edit";

import CurriCulum from "../views/contents_mng/curriculum";
import CurriCulumView from "../views/contents_mng/curriculum_view";
import CurriculumForm from "../views/contents_mng/curriculum_form";

import ClassVideo from "../views/contents_mng/class_video";
import ClassVideoView from "../views/contents_mng/class_video_view";
import ClassVideoForm from "../views/contents_mng/class_video_form";

import OnlinebasicClass from "../views/contents_mng/online_basic_class";
import OnlineBasicClassForm from "../views/contents_mng/online_basic_class_form";

import MockExam from "../views/contents_mng/mock_exam";
import MockExamForm from "../views/contents_mng/mock_exam_form";

import Contents from "../views/contents_mng/contents";

import Login from "../views/login/login";
import Join from "../views/login/join";
import JoinResult from "../views/login/join_result";
import FindId from "../views/login/id_find";
import FindIdResult from "../views/login/id_find_result";
import PwFindstep1 from "../views/login/pw_find_step1";
import FindIdResult2 from "../views/login/id_find_result2";
import PwFindstep2 from "../views/login/pw_find_step2";
import PwFindResult from "../views/login/pw_find_reslut";

function Router() {
	const routes = [
		{
		path: "/",
		element: <SideMenu />,
		children: [
			// 회원관리
			{
				path: "/",
				element: <MemberMng />,
			},
			{
				path: "/member_view/:id", //유형이 학생일 때
				element: <MemberView />,
			},
			{
				path: "/member_edit/:id",
				element: <MemberEdit />,
			},
			{
				path: "/member_edit2",
				element: <MemberEdit2 />,
			},
			{
				path: "/admin_mng",
				element: <AdminMng />,
			},

			// 자기소개서 관리
			{
				path: "/coverletter_mng",
				element: <CoverletterMng />,
			},

			// 생활기록부 관리
			{
				path: "/life_record",
				element: <LifeRecord />,
			},
			{
				path: "/life_record_view",
				element: <LifeRecordView />,
			},
			{
				path: "/life_record_edit",
				element: <LifeRecordEdit />,
			},

			// 피드백 관리
			{
				path: "/feed_mng",
				element: <FeedMng />,
			},
			{
				path: "/feed_view/:id",
				element: <FeedView />,
			},
			{
				path: "/mento_mng",
				element: <MentoMng />,
			},

			// 콘텐츠 관리
			{
				path: "/notice", //공지사항
				element: <Notice />,
			},
			{
				path: "/notice_edit",
				element: <NoticeEdit />,
			},
			{
				path: "/notice_view",
				element: <NoticeView />,
			},

			{
				path: "/profit", //혜택
				element: <Profit />,
			},
			{
				path: "/profit_view",
				element: <ProfitView />,
			},
			{
				path: "/profit_edit",
				element: <ProfitEdit />,
			},

			{
				path: "/curriculum", //커리큘럼
				element: <CurriCulum />,
			},
			{
				path: "/curriculum_view",
				element: <CurriCulumView />,
			},
			{
				path: "/curriculum_form",
				element: <CurriculumForm />,
			},

			{
				path: "/class_video", //실시간 영상 수업
				element: <ClassVideo />,
			},
			{
				path: "/class_video_view",
				element: <ClassVideoView />,
			},
			{
				path: "/class_video_form",
				element: <ClassVideoForm />,
			},

			{
				path: "/online_basic_class", //온라인 기초 학습
				element: <OnlinebasicClass />,
			},
			{
				path: "/online_basic_class_form",
				element: <OnlineBasicClassForm />,
			},

			{
				path: "/mock_exam", //회차별 모의고사
				element: <MockExam />,
			},
			{
				path: "/mock_exam_form",
				element: <MockExamForm />,
			},

			// 컨텐츠 URL 및 다운로드
			{
				path: "/contents", // 컨텐츠 URL 및 다운로드
				element: <Contents />,
			},
		],
		},
		// 로그인
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/join",
			element: <Join />,
		},
		{
			path: "/join_result", //회원가입 결과
			element: <JoinResult />,
		},
		{
			path: "/id_find",
			element: <FindId />,
		},
		{
			path: "/id_find_result", //아이디찾기 결과
			element: <FindIdResult />,
		},
		{
			path: "/pw_find_step1", //비밀번호 찾기
			element: <PwFindstep1 />,
		},
		{
			path: "/pw_find_step2", //비밀번호 재설정
			element: <PwFindstep2 />,
		},
		{
			path: "/pw_find_reslut", //비밀번호 찾기 결과
			element: <PwFindResult />,
		},
	];

	return useRoutes(routes);
}

export default Router;
