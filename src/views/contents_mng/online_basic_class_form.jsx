import { Lucide } from '@/base-components'
import { Link } from 'react-router-dom'
import React, { useState, useReducer } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from 'react-query'
import request from '@/utils/request'

function OnlineBasicClassForm() {
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL;
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { getValues, setValue, watch, reset, register, handleSubmit } = useForm({
    defaultValues: {
      list: [],
    },
  })

  useQuery(
    'getBasicClass',
    () => request.get(`/admin/content-management/basic-class/${id}`),
    {
      onSuccess: (data) => {
        reset({ list: data })
      },
    },
  )

  // 저장
  const { mutate: saveBasicClass } = useMutation(
    (data) => request.put(`/admin/content-management/basic-class/${id}`, data),
    {
      onSuccess: () => {
        alert('저장되었습니다.');
        location.reload();
        /* 같은 페이지라서 navigate가 안먹힘 */
        // navigate(`/online_basic_class_form/${id}?subject=${searchParams.get('subject')}`);
      },
      onError: () => {
        alert('오류가 발생하였습니다.');
      }
    },
  )

  // 저장하기 버튼 클릭
  const handleSave = async (data) => {
    const formData = new FormData();

    const null_blob = new Blob(['null'], {type: 'image/png'});
    const null_file = new File([null_blob], 'null.png', {
      type: 'image/png',
    });

    data.list.map((item) => {
      formData.append('row_id', item?.row_id ?? 0);
      formData.append('gubun', item?.gubun ?? '');
      formData.append('unit', item?.unit ?? '');
      formData.append('content', item?.content ?? '');
      formData.append('link_url', item?.link_url ?? '');

        if(item.fileId > 0) { // 기존에 등록된 파일이 있으면
          if (item.file && item.file.length) { // 새로 등록할 파일이 있으면
            formData.append('savedFileDelYN', 'Y');
            formData.append('file', item.file[0]);

          }else { // 새로 등록할 파일이 없으면
            if(item.fileName) { // 기존 파일을 유지하는 경우
              formData.append('file', null_file);
              formData.append('savedFileDelYN', 'N');
            }else { // 기존 파일을 삭제하는 경우
              formData.append('file', null_file);
              formData.append('savedFileDelYN', 'Y');
            }
          }

        }else { // 기존에 등록된 파일이 없으면
          formData.append('savedFileDelYN', 'N');

          if (item.file && item.file.length) { // 새로 등록할 파일이 있으면
            formData.append('file', item.file[0]);
          }else {
            formData.append('file', null_file);
          }
        }
    })

    saveBasicClass(formData)
  }

  // + 버튼 클릭
  const handleAdd = () => {
    /*
    * 기존에 하던 방식대로 setValue 하면 파일 객체들이 복사가 안되고 사라짐
    * 대충 원인은 알겠으나 해결 방법을 모르겠음
    * 그냥 첫번째 객체 복사하고 시켜서 추가하는 방법으로 대체했음..
    */

    let origin = getValues('list');
    let copy = {};

    for(let key in origin[0]) {
      copy[key] = origin[0][key];
    }

    copy['row_id'] = 0;
    copy['fileId'] = 0;
    copy['fileName'] = '';
    copy['file'] = new DataTransfer().files;
    copy['gubun'] = '';
    copy['unit'] = '';
    copy['content'] = '';
    copy['link_url'] = '';

    origin.push(copy);
    setValue('list',origin);
  }

  // 삭제 버튼 클릭
  const handleRemove = (idx, pk) => {
    if (confirm('삭제하시겠습니까?')) {
      let origin = getValues('list');
      origin.splice(idx, 1);
      setValue('list', origin);
    }
  }

  /* 삭제 기존 소스 */
  /*let removeIndex = 0;

  // 삭제
  const { mutate: removeBasicClass } = useMutation(
    (pk,idx) => request.delete(`/admin/content-management/basic-class/${pk}`),
    {
      onSuccess: () => {
        alert('삭제되었습니다.');

        reset({
          list: getValues('list').filter((_, i) => i !== removeIndex),
        });
      },
      onError: () => {
        alert('오류가 발생하였습니다.');
      }
    },
  )

  // 삭제 버튼 클릭
  const handleRemove = (idx, pk) => {
    if(pk && pk > 0) {
      // 기존 데이터 삭제
      if(confirm('삭제하시겠습니까?')) {
        removeIndex = idx;
        removeBasicClass(pk);
      }
    }else {
      reset({
        list: getValues('list').filter((_, i) => i !== idx),
      });
    }
  }*/

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="intro-y box mt-5">
        <div className="p-3 px-5 flex items-center border-b border-slate-200/60">
          <div className="text-lg font-medium flex items-center">
            영재학교
            <Lucide icon="ChevronRight" className="w-6 h-6 mx-3"></Lucide>
            {searchParams.get('subject')}
          </div>
        </div>
        <div className="intro-y p-5">
          <table className="table table-hover">
            <thead>
              <tr className="bg-slate-100 text-center">
                <td>구분</td>
                <td>단원</td>
                <td>학습 내용</td>
                <td>영상학습URL</td>
                <td>학습자료</td>
                <td>삭제</td>
              </tr>
            </thead>
            <tbody>
              {watch('list').map((item, index) => (
                <tr className="text-center" key={`list-${index}`}>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.gubun}
                      {...register(`list.${index}.gubun`)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.unit}
                      {...register(`list.${index}.unit`)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.content}
                      {...register(`list.${index}.content`)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.link_url}
                      {...register(`list.${index}.link_url`)}
                    />
                  </td>
                  <td>
                    <div className="input-group">
                      {watch(`list.${index}.fileName`) ? (
                        <div className="flex items-center gap-2">
                          <a
                            href={`${baseUrl}/v1/contents-data/file-download/${watch('profileId')}`}
                            className="underline text-blue"
                          >
                            {watch(`list.${index}.fileName`)}
                          </a>
                          <Lucide
                            icon="X"
                            className="w-4 h-4 text-danger cursor-pointer"
                            onClick={() => {
                              let list = getValues('list');
                              list[index].fileName = '';

                              setValue('list', list);
                            }}
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

                    {/*{item.fileName ? (
                      <a
                        href={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${item.fileId}`}
                        className="cursor-pointer text-blue underline"
                      >
                        {item.fileName}
                      </a>
                    ) : (
                      <input
                        type="file"
                        className="form-control"
                        {...register(`list.${index}.file`)}
                      />
                    )}*/}
                  </td>
                  <td>
                    {index !== 0 && (
                      <button
                        type="button"
                        className="btn btn-outline-danger bg-white btn-sm whitespace-nowrap"
                        onClick={() => handleRemove(index,item?.row_id)}
                      >
                        삭제
                      </button>
                    )}
                  </td>
                  {/*<td>
                    {index > 0 &&
                      <button
                        className="btn btn-outline-danger bg-white btn-sm whitespace-nowrap"
                        onClick={() => { handleRemove(item.row_id,index); }}
                      >
                        삭제
                      </button>
                    }
                  </td>*/}
                </tr>
              ))}
              <tr>
                <td colSpan={8} className="text-center">
                  <button
                    type="button"
                    className="btn btn-outline-primary border-dotted"
                    onClick={() => handleAdd()}
                  >
                    <Lucide icon="Plus" className="w-4 h-4"></Lucide>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex mt-3 justify-center">
            <div className="flex gap-2">
              <Link to="/online_basic_class">
                <button className="btn bg-white w-24">취소</button>
              </Link>
              <button className="btn btn-sky w-24">
                저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default OnlineBasicClassForm
