import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
} from '@/base-components'
import React, { useState, useReducer, useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
import request from '@/utils/request'
import Loading from '@/components/loading'
import useDidMountEffect from '@/hooks/useDidMountEffect'
import _ from 'lodash'
import {useForm} from "react-hook-form";

function Contents() {
  const baseUrl = import.meta.env.VITE_PUBLIC_API_SERVER_URL;

  const [menu, setMenu] = useReducer((prev, next) => ({ ...prev, ...next }), {
    mainMenu: '',
    mainMenuList: [],
    subMenu: '',
    subMenuList: [],
    menuDetailList: [],
    code: '',
  })

  const { getValues, setValue, watch, reset, register, handleSubmit } = useForm({
    defaultValues: {
      list: [],
    },
  })

  const { isLoading: isGetMenus } = useQuery(
    ['getMenus', menu.mainMenu],
    () => request.get('/admin/content-management/menus'),
    {
      select: (data) => data.menuList,
      onSuccess: (data) => {
        let result = {};

        if(menu.mainMenu) {
          result = data.filter(item => item?.ca_code1_name === menu?.mainMenu)[0];
        }else {
          result = data[0];
        }

        setMenu({
          mainMenu: result.ca_code1_name,
          mainMenuList: data,
          subMenu: result.subMenuResponseList[0].ca_code2_name,
          subMenuList: result.subMenuResponseList,
          code: result.subMenuResponseList[0].ca_code2,
        })
      },
    },
  )

  const {
    data: getMenuDetail,
    isLoading: isMutateMenuDetail,
    refetch: refetchMenuDetail,
    isRefetching: isRefetchingMenuDetail,
  } = useQuery(
    ['getMenuDetail', menu.code],
    () => request.get(`/admin/content-management/detail/${menu.code}`),
    {
      enabled: !!menu.code,
      onSuccess: (data) => {
        reset({ list: data })
      },
    },
  )

  const { mutate: updateMenuDetail, isLoading: isUpdateMenuDetail } =
    useMutation(
      (data) => request.post('/admin/content-management/update', data),
      {
        onSuccess: () => {
          alert('저장되었습니다.')
          refetchMenuDetail()
        },
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
      console.log(item)
      formData.append('id', item.id)
      formData.append('link_url', item.link_url)

      if(item.fileId > 0) { // 기존에 등록된 파일이 있으면
        if (item.file && item.file.length) { // 새로 등록할 파일이 있으면
          formData.append('savedFileDelYN', 'Y')
          formData.append('file', item.file[0]);

        }else { // 새로 등록할 파일이 없으면
          if(item.fileName) { // 기존 파일을 유지하는 경우
            formData.append('file', null_file);
            formData.append('savedFileDelYN', 'N')
          }else { // 기존 파일을 삭제하는 경우
            formData.append('file', null_file);
            formData.append('savedFileDelYN', 'Y')
          }
        }

      }else { // 기존에 등록된 파일이 없으면
        formData.append('savedFileDelYN', 'N')

        if (item.file && item.file.length) { // 새로 등록할 파일이 있으면
          formData.append('file', item.file[0]);
        }else {
          formData.append('file', null_file);
        }
      }
    })

    updateMenuDetail(formData)
  }

  return (
    <div className="relative">
      {(isGetMenus ||
        isMutateMenuDetail ||
        isRefetchingMenuDetail ||
        isUpdateMenuDetail) && <Loading />}
      <div className="flex items-center gap-3">
        <Dropdown>
          {({ dismiss }) => (
            <>
              <DropdownToggle className="btn bg-white">
                {menu.mainMenu}
                <Lucide icon="ChevronDown" className="w-4 h-4 ml-3"></Lucide>
              </DropdownToggle>
              <DropdownMenu className="w-40">
                <DropdownContent>
                  {menu.mainMenuList?.map((item) => (
                    <DropdownItem
                      key={item.ca_code1}
                      className={`${
                        menu.mainMenu === item.ca_code1_name && 'drop_active'
                      }`}
                      onClick={() => {
                        setMenu({
                          mainMenu: item.ca_code1_name,
                        })
                        dismiss()
                      }}
                    >
                      {item.ca_code1_name}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </DropdownMenu>
            </>
          )}
        </Dropdown>

        {menu.mainMenu && (
          <Dropdown>
            {({ dismiss }) => (
              <>
                <DropdownToggle className="btn btn-primary">
                  {menu.subMenu}
                  <Lucide icon="ChevronDown" className="w-4 h-4 ml-3"></Lucide>
                </DropdownToggle>
                <DropdownMenu className="w-60">
                  <DropdownContent>
                    {menu.subMenuList.map((item) => (
                      <DropdownItem
                        key={item.ca_code2}
                        className={`${
                          menu.subMenu === item.ca_code2_name && 'drop_active'
                        }`}
                        onClick={() => {
                          setMenu({
                            subMenu: item.ca_code2_name,
                            code: item.ca_code2,
                          })
                          dismiss()
                        }}
                      >
                        {item.ca_code2_name}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </DropdownMenu>
              </>
            )}
          </Dropdown>
        )}
      </div>
      <div className="intro-y p-5 box mt-5">
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="flex justify-end">
            <button
              className="btn btn-sky w-24"
              onClick={() => handleSubmit(menu.menuDetailList)}
            >
              저장
            </button>
          </div>
          <table className="table mt-5 table-bordered">
            <tbody>
            <tr className="bg-slate-100 text-center">
              <td>화면</td>
              <td>버튼 명</td>
              <td>링크/파일</td>
            </tr>
            {watch('list').map((item, index) => (
              <tr key={item.id}>
                <td>{item.screen_name}</td>
                <td>{item.btn_name}</td>
                <td>
                  {item.tf_file ? (
                    item.fileName ? (
                      <div className="flex items-center gap-2">
                        <a
                          href={`${baseUrl}/v1/contents-data/file-download/${item.fileId}`}
                          className="underline text-blue"
                        >
                          {item.fileName}
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
                      <input
                        type="file"
                        className="form-control"
                        {...register(
                          `list.${index}.file`,
                        )}
                      />
                    )
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={item.link_url}
                      {...register(`list.${index}.link_url`)}
                    />
                  )}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  )
}

export default Contents
