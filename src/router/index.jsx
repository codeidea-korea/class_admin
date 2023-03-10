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
			// ????????????
			{
				path: "/",
				element: <MemberMng />,
			},
			{
				path: "/member_view/:id", //????????? ????????? ???
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

			// ??????????????? ??????
			{
				path: "/coverletter_mng",
				element: <CoverletterMng />,
			},

			// ??????????????? ??????
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

			// ????????? ??????
			{
				path: "/feed_mng",
				element: <FeedMng />,
			},
			{
				path: "/feed_view/:feedId",
				element: <FeedView />,
			},
			{
				path: "/mento_mng",
				element: <MentoMng />,
			},

			// ????????? ??????
			{
				path: "/notice", //????????????
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
				path: "/profit", //??????
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
				path: "/curriculum", //????????????
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
				path: "/class_video", //????????? ?????? ??????
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
				path: "/online_basic_class", //????????? ?????? ??????
				element: <OnlinebasicClass />,
			},
			{
				path: "/online_basic_class_form",
				element: <OnlineBasicClassForm />,
			},

			{
				path: "/mock_exam", //????????? ????????????
				element: <MockExam />,
			},
			{
				path: "/mock_exam_form",
				element: <MockExamForm />,
			},

			// ????????? URL ??? ????????????
			{
				path: "/contents", // ????????? URL ??? ????????????
				element: <Contents />,
			},
		],
		},
		// ?????????
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/join",
			element: <Join />,
		},
		{
			path: "/join_result", //???????????? ??????
			element: <JoinResult />,
		},
		{
			path: "/id_find",
			element: <FindId />,
		},
		{
			path: "/id_find_result", //??????????????? ??????
			element: <FindIdResult />,
		},
		{
			path: "/pw_find_step1", //???????????? ??????
			element: <PwFindstep1 />,
		},
		{
			path: "/pw_find_step2", //???????????? ?????????
			element: <PwFindstep2 />,
		},
		{
			path: "/pw_find_reslut", //???????????? ?????? ??????
			element: <PwFindResult />,
		},
	];

	return useRoutes(routes);
}

export default Router;
