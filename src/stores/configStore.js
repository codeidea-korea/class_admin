import {atom} from 'recoil';

const configStore = atom({
  key: 'configStore',
  default: {
    menuType: {
      pathToText: {
        '': ['회원 관리', '회원 관리'],
        'member_view': ['회원 관리', '회원 관리'],
        'member_edit': ['회원 관리', '회원 관리'],
        'member_edit2': ['회원 관리', '회원 관리'],
        'admin_mng': ['회원 관리', '관리자 관리'],
        'coverletter_mng': ['자기소개서 관리', ''],
        'life_record': ['생활기록부 관리', ''],
        'life_record_view': ['생활기록부 관리', ''],
        'life_record_edit': ['생활기록부 관리', ''],
        'feed_mng': ['피드백 관리', '피드백 관리'],
        'feed_view': ['피드백 관리', '피드백 관리'],
        'mento_mng': ['피드백 관리', '멘토 관리'],
        'notice': ['컨텐츠 관리', '공지사항'],
        'profit': ['컨텐츠 관리', '혜택'],
        'curriculum': ['컨텐츠 관리', '커리큘럼'],
        'classVideo': ['컨텐츠 관리', '실시간 영상 수업'],
        'online_basic_class': ['컨텐츠 관리', '온라인 기초 학습'],
        'online_basic_class_form': ['컨텐츠 관리', '온라인 기초 학습'],
        'mock_exam': ['컨텐츠 관리', '회차별 모의고사'],
        'mock_exam_form': ['컨텐츠 관리', '회차별 모의고사'],
        'contents': ['컨텐츠 관리', '컨텐츠 URL 및 다운로드'],
        'contents2': ['컨텐츠 관리', '컨텐츠 URL 및 다운로드'],
        'ge_online_mng' : ['컨텐츠관리','영재원 영상학습 관리'],
        'sh_online_mng' : ['컨텐츠관리','과학고 영상학습 관리'],
        'read_online' : ['컨텐츠관리','읽기자료 & 학습영상 링크'],
        'pw_change' : ['비밀번호 변경',''],
      },
    },
  },
});

export {configStore};
