import {useEffect, useReducer, useState} from 'react'
import {
    Lucide,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from '@/base-components'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ReadOnlineEdit = () => {
    const [data,setData] = useState([
        {rowId:1,subject:"기타",title:"초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학",link_url:"https://youtube.com/watch?v=rUpaFIOoCY0",fileId:"",fileName:""},
        {rowId:2,subject:"융합",title:"초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학",link_url:"",fileId:"478",fileName:"파일이름"},
        {rowId:3,subject:"기술",title:"초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학",link_url:"https://youtube.com/watch?v=rUpaFIOoCY0",fileId:"",fileName:""},
        {rowId:4,subject:"과학",title:"초등 수학 딱 대. 한번에 끝나는 초등 고학년 수학",link_url:"",fileId:"478",fileName:"파일이름"}
      ])

      const { getValues, setValue, watch, reset, register } = useForm({
        defaultValues: {
          list: [],
        },
      })

      useEffect(()=>{
        reset({ list: data })
      },[])

      // + 버튼 클릭
    const handleAddList = () => {
        const addData = {rowId:data.length+1,subject:"",title:"",link_url:"",fileId:"",fileName:""}
        setData([...data, addData])
        setValue('list',[...data,addData])
    }
    // 삭제
    const deleteHandle = (rowId)=>{
        const result = data.filter((item)=>item.rowId !== rowId)
        setData(result)
        setValue('list', result)
    }

  return (
    <>
        <div className="intro-y box mt-5">
            <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
                <div className="text-lg font-medium flex items-center">
                영재원
                </div>
            </div>
            <div className="intro-y p-5">
                <table className="table table-hover">
                    <thead>
                        <tr className="bg-slate-100 text-center">
                            <td>번호</td>
                            <td>관련과목</td>
                            <td>제목</td>
                            <td>관련 추천 영상</td>
                            <td>읽기자료</td>
                            <td>삭제</td>
                        </tr>
                    </thead>
                    <tbody>
                        {watch('list')?.map((item,index)=>(
                            <tr className="text-center" key={index}>
                                <td>{index+1}</td>
                                <td>
                                <input
                                    type="text"
                                    className="form-control w-28"
                                    defaultValue={item.subject}
                                    key={item.subject}
                                    />
                                </td>
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
                                    defaultValue={item.link_url}
                                    key={item.link_url}
                                    />
                                </td>
                                <td>
                                <div className="input-group justify-center">
                                    {item.fileName ? (
                                        <div className="flex items-center gap-2">
                                        <a
                                            href={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${item.fileId}`}
                                            className="cursor-pointer text-blue underline"
                                        >
                                            {item.fileName}
                                        </a>
                                        <Lucide
                                            icon="X"
                                            className="w-4 h-4 text-danger cursor-pointer"
                                        ></Lucide>
                                        </div>
                                    ) : (
                                        <>
                                        <input
                                            type="file"
                                            className="dp_none"
                                            id={`file-upload-${index}`}
                                            {...register(
                                                `list.${index}.file`,
                                              )}
                                        />
                                        <label htmlFor={`file-upload-${index}`} className="flex items-center">
                                            <input
                                            type="text"
                                            className="form-control file_up bg-white"
                                            placeholder=""
                                            value={item?.file?.length > 0 ? item?.file[0]?.name : ''}
                                            readOnly
                                            />
                                            <div className="input-group-text whitespace-nowrap file_up_btn">
                                            찾기
                                            </div>
                                        </label>
                                        </>
                                    )}
                                    </div>
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
                            <td colSpan={6} className="text-center">
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
                        <Link to="/read_online">
                            <button className="btn bg-white w-24">취소</button>
                        </Link>
                        <button className="btn btn-sky w-24">
                            저장하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
export default ReadOnlineEdit
