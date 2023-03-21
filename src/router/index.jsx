import { useRoutes, useNavigate, Route } from "react-router-dom";

import { PrivateRoute } from './private-route';
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
				element: <PrivateRoute element={<MemberMng />} role={['ADMIN', 'DIRECTOR']} />,
			},
			{
				path: "/member_view/:id", //유형이 학생일 때
				element: <PrivateRoute element={<MemberView />} role={['ADMIN', 'DIRECTOR']} />,
			},
			{
				path: "/member_edit/:id",
				element: <PrivateRoute element={<MemberEdit />} role={['ADMIN', 'DIRECTOR']} />,
			},
			{
				path: "/member_edit2",
				element: <PrivateRoute element={<MemberEdit2 />} role={['ADMIN', 'DIRECTOR']} />,
			},
			{
				path: "/admin_mng",
				element: <PrivateRoute element={<AdminMng />} role={['ADMIN', 'DIRECTOR']} />,
			},

			// 자기소개서 관리
			{
				path: "/coverletter_mng",
				element: <PrivateRoute element={<MemberMng />} role={['ADMIN', 'DIRECTOR']} />,
			},

			// 생활기록부 관리
			{
				path: "/life_record",
				element: <PrivateRoute element={<LifeRecord />} role={['ADMIN', 'DIRECTOR', 'TEACHER']} />,
			},
			{
				path: "/life_record_view",
				element: <PrivateRoute element={<LifeRecordView />} role={['ADMIN', 'DIRECTOR', 'TEACHER']} />,
			},
			{
				path: "/life_record_edit",
				element: <PrivateRoute element={<LifeRecordEdit />} role={['ADMIN', 'DIRECTOR', 'TEACHER']} />,
			},

			// 피드백 관리
			{
				path: "/feed_mng",
				element: <PrivateRoute element={<FeedMng />} role={['ADMIN', 'DIRECTOR', 'TEACHER']} />,
			},
			{
				path: "/feed_view/:feedId",
				element: <PrivateRoute element={<FeedView />} role={['ADMIN', 'DIRECTOR', 'TEACHER']} />,
			},
			{
				path: "/mento_mng",
				element: <PrivateRoute element={<MentoMng />} role={['ADMIN', 'DIRECTOR', 'TEACHER']} />,
			},

			// 콘텐츠 관리
			{
				path: "/notice", //공지사항
				element: <PrivateRoute element={<Notice />} role={['ADMIN', 'DIRECTOR']} />,
			},
			{
				path: "/notice_edit",
				element: <PrivateRoute element={<NoticeEdit />} role={['ADMIN', 'DIRECTOR']} />,
			},
			{
				path: "/notice_view",
				element: <PrivateRoute element={<NoticeView />} role={['ADMIN', 'DIRECTOR']} />,
			},

			{
				path: "/profit", //혜택
				element: <PrivateRoute element={<Profit />} role={['ADMIN', 'DIRECTOR']} />,
			},
			{
				path: "/profit_view",
				element: <PrivateRoute element={<ProfitView />} role={['ADMIN', 'DIRECTOR']} />,
			},
			{
				path: "/profit_edit",
				element: <PrivateRoute element={<ProfitEdit />} role={['ADMIN', 'DIRECTOR']} />,
			},

			{
				path: "/curriculum", //커리큘럼
				element: <PrivateRoute element={<CurriCulum />} role={['ADMIN', 'DIRECTOR', 'TEACHER']} />,
			},
			{
				path: "/curriculum_view",
				element: <PrivateRoute element={<CurriCulumView />} role={['ADMIN', 'DIRECTOR', 'TEACHER']} />,
			},
			{
				path: "/curriculum_form",
				element: <PrivateRoute element={<CurriculumForm />} role={['ADMIN', 'DIRECTOR', 'TEACHER']} />,
			},
			{
				path: "/class_video", //실시간 영상 수업
				element: <PrivateRoute element={<ClassVideo />} role={['ADMIN', 'DIRECTOR', 'TEACHER']} />,
			},
			{
				path: "/class_video_view",
				element: <PrivateRoute element={<ClassVideoView />} role={['ADMIN', 'DIRECTOR', 'TEACHER']} />,
			},
			{
				path: "/class_video_form",
				element: <PrivateRoute element={<ClassVideoForm />} role={['ADMIN', 'DIRECTOR', 'TEACHER']} />,
			},

			{
				path: "/online_basic_class", //온라인 기초 학습
				element: <PrivateRoute element={<OnlinebasicClass />} role={['ADMIN', 'DIRECTOR']} />,
			},
			{
				path: "/online_basic_class_form",
				element: <PrivateRoute element={<OnlineBasicClassForm />} role={['ADMIN', 'DIRECTOR']} />,
			},
			{
				path: "/mock_exam", //회차별 모의고사
				element: <PrivateRoute element={<MockExam />} role={['ADMIN', 'DIRECTOR']} />,
			},
			{
				path: "/mock_exam_form",
				element: <PrivateRoute element={<MockExamForm />} role={['ADMIN', 'DIRECTOR']} />,
			},

			// 컨텐츠 URL 및 다운로드
			{
				path: "/contents", // 컨텐츠 URL 및 다운로드
				element: <PrivateRoute element={<Contents />} role={['ADMIN', 'DIRECTOR']} />,
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

	

	// const checkRole = (route) => {
	// 	if (!route.role) {
	// 		// 경로에 역할 정보가 없으면 모두 접근 가능
	// 		return true;
	// 	}
	// 	return route.role.includes(myrole);
	// };

	// const authorizedRoutes = routes.map((route) => {
	// 	const children = route.children?.filter(checkRole);
	// 	if (!children?.length && !checkRole(route)) {
	// 		// 접근 권한이 없는 경로는 null을 반환하여 렌더링되지 않도록 합니다.
	// 		alert('접근 권한이 없습니다');
	// 		navigate(-1);
	// 		return null;
	// 	}
	// 	return {
	// 		...route,
	// 		children,
	// 	};
	// });

	// return useRoutes(authorizedRoutes.filter(Boolean));
}

export default Router;
