import { Lucide } from '@/base-components'
import { Link } from 'react-router-dom'
import React, { useState, useReducer } from 'react'

const GeOnlineMngEdit = () => {
    const [data,setData] = useState([
        {rowId:1,subject:"융합",title:"초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학",link:"https://youtu.be/hwCFXw35ctc"},
        {rowId:2,subject:"융합",title:"초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학",link:"https://youtu.be/hwCFXw35ctc"},
        {rowId:3,subject:"융합",title:"초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학",link:"https://youtu.be/hwCFXw35ctc"},
        {rowId:4,subject:"융합",title:"초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학",link:"https://youtu.be/hwCFXw35ctc"}
    ])
    console.log(data)
    // + 버튼 클릭
    const handleAddList = () => {
        const addData = {rowId:data.length+1,subject:"융합",title:"",link:""}
        setData([...data,addData])
    }
    // 삭제
    const deleteHandle = (rowId)=>{
        const result = data.filter((item)=>item.rowId !== rowId)
        setData(result)
    }
    
    return (<>
    <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium flex items-center">
            영재원 영상 학습 관리
            <Lucide icon="ChevronRight" className="w-6 h-6 mx-3"></Lucide>
            초등학생
            <Lucide icon="ChevronRight" className="w-6 h-6 mx-3"></Lucide>
            융합
          </div>
        </div>
        <div className="intro-y p-5">
          <table className="table table-hover">
            <thead>
              <tr className="bg-slate-100 text-center">
                <td>번호</td>
                <td>과목</td>
                <td>제목</td>
                <td>링크</td>
                <td>삭제</td>
              </tr>
            </thead>
            <tbody>
                {data.map((item,index)=>(
                    <tr className="text-center" key={index}>
                        <td>{index+1}</td>
                        <td>{item.subject}</td>
                        <td>
                            <input
                            type="text"
                            className="form-control"
                            defaultValue={item.title}
                            key={item.title}
                            />
                        </td>
                        <td>
                            <input
                            type="text"
                            className="form-control"
                            defaultValue={item.link}
                            key={item.link}
                            />
                        </td>
                        <td>
                            {index > 0 && 
                                <button 
                                    className="btn btn-outline-danger bg-white btn-sm whitespace-nowrap"
                                    onClick={()=>deleteHandle(item.rowId)}
                                >
                                    삭제 
                                </button>
                            }
                            
                        </td>
                    </tr>
                ))}
              <tr>
                <td colSpan={5} className="text-center">
                  <button
                    className="btn btn-outline-primary border-dotted"
                    onClick={() => handleAddList()}
                  >
                    <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex mt-3 justify-center">
            <div className="flex gap-2">
              <Link to="/ge_online_mng">
                <button className="btn bg-white w-24">취소</button>
              </Link>
              <button className="btn btn-sky w-24" >
                저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>)
}
export default GeOnlineMngEdit;