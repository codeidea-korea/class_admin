const PwChange = () => {
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
            className="login__input form-control px-4 block mt-1"
            placeholder="기존 비밀번호를 입력해주세요."
          />
          <div className="font-medium mt-5">새 비밀번호</div>
          <input
            type="password"
            className="login__input form-control px-4 block mt-1"
            placeholder="새 비밀번호를 입력해주세요."
          />
          <div className="font-medium mt-5">새 암호를 확인합니다</div>
          <input
            type="password"
            className="login__input form-control px-4 block mt-1"
            placeholder="새 비밀번호를 입력해주세요."
          />
          <button className="btn btn-primary mt-7">비밀번호 변경</button>
        </div>
      </div>
    </>
  )
}
export default PwChange
