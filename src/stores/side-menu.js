import { atom } from 'recoil'

const sideMenu = atom({
  key: 'sideMenu',
  default: {
    menu: [
      {
        icon: 'Users',
        title: '회원관리',
        subMenu: [
          {
            icon: '',
            pathname: '/',
            title: '회원 관리',
          },
          {
            icon: '',
            pathname: '/admin_mng',
            title: '관리자 관리',
          },
        ],
      },

      {
        icon: 'Clipboard',
        pathname: '/coverletter_mng',
        title: '자기소개서 관리',
      },

      {
        icon: 'BookOpen',
        pathname: '/life_record',
        title: '생활기록부 관리',
      },

      {
        icon: 'MessageSquare',
        title: '피드백 관리',
        subMenu: [
          {
            icon: '',
            pathname: '/feed_mng',
            title: '피드백 관리',
          },
          {
            icon: '',
            pathname: '/mento_mng',
            title: '멘토 관리',
          },
        ],
      },

      {
        icon: 'Book',
        title: '컨텐츠 관리',
        subMenu: [
          {
            icon: '',
            pathname: '/notice',
            title: '공지사항',
          },
          {
            icon: '',
            pathname: '/profit',
            title: '혜택',
          },
          {
            icon: '',
            pathname: '/curriculum',
            title: '커리큘럼',
          },
          {
            icon: '',
            pathname: '/classVideo',
            title: '실시간 수업 영상',
          },
          {
            icon: '',
            pathname: '/online_basic_class',
            title: '온라인 기초 학습',
          },
          {
            icon: '',
            pathname: '/mock_exam',
            title: '회차별 모의고사',
          },
          {
            icon: '',
            pathname: '/contents',
            title: '컨텐츠 URL 및 다운로드',
          },
        ],
      },

      {
        icon: 'Bell',
        title: '알림',
      },
      {
        icon: 'Laptop',
        pathname: '/reservation',
        title: '상담 예약 확인',
      },
    ],
  },
})

export { sideMenu }
