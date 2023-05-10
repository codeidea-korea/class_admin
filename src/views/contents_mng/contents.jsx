import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
} from '@/base-components'
import { useState, useReducer, useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
import request from '@/utils/request'
import Loading from '@/components/loading'
import useDidMountEffect from '@/hooks/useDidMountEffect'
import _ from 'lodash'

function Contents() {
  const [menu, setMenu] = useReducer((prev, next) => ({ ...prev, ...next }), {
    mainMenu: '',
    mainMenuList: [],
    subMenu: '',
    subMenuList: [],
    menuDetailList: [],
    code: '',
  })

  const { isLoading: isGetMenus } = useQuery(
    'getMenus',
    () => request.get('/admin/content-management/menus'),
    {
      select: (data) => data.menuList,
      onSuccess: (data) => {
        setMenu({
          mainMenu: data[0].ca_code1_name,
          mainMenuList: data,
          subMenu: data[0].subMenuResponseList[0].ca_code2_name,
          subMenuList: data[0].subMenuResponseList,
          code: data[0].subMenuResponseList[0].ca_code2,
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
        setMenu({
          menuDetailList: data,
        })
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

  const handleChangeFile = (e, id) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setMenu({
        menuDetailList: menu.menuDetailList.map((child) => {
          if (child.id === id) {
            return {
              ...child,
              savedFileDelYN: 'N',
              file: file,
            }
          } else {
            return {
              ...child,
              savedFileDelYN: 'N',
            }
          }
        }),
      })
    }
  }

  const omit = (obj, ...props) => {
    const result = { ...obj }
    props.forEach((prop) => {
      delete result[prop]
    })
    return result
  }

  const null_blob = new Blob(['null'], { type: 'image/png' })
  const null_file = new File([null_blob], 'null.png', { type: 'image/png' })

  const handleSubmit = (data) => {
    const formData = new FormData()
    const newFileDelYN = []
    data.map((item) => {
      if (item.file) {
        formData.append('file', item.file)
      } else {
        formData.append('file', null_file)
      }
      if (item.fileId) {
        newFileDelYN.push('Y')
      } else {
        newFileDelYN.push('N')
      }
    })
    formData.append('id', _.map(data, 'id').join(','))
    formData.append('link_url', _.map(data, 'link_url').join(','))
    formData.append('savedFileDelYN', newFileDelYN.join(','))
    console.log(formData.get('id'))
    updateMenuDetail(formData)
  }

  // useDidMountEffect(() => {
  //   if (!menu.subMenuList) return
  //   const code = menu.subMenuList?.find(
  //     (item) => item.ca_code2_name === menu.subMenu,
  //   ).ca_code2
  //   refetchMenuDetail()
  // }, [menu.subMenu])

  return (
    <div className="relative">
      {(isGetMenus ||
        isMutateMenuDetail ||
        isRefetchingMenuDetail ||
        isUpdateMenuDetail) && <Loading />}
      <div className="flex items-center gap-3">
        <Dropdown>
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
                  }}
                >
                  {item.ca_code1_name}
                </DropdownItem>
              ))}
            </DropdownContent>
          </DropdownMenu>
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
            {menu.menuDetailList.map((item) => (
              <tr key={item.id}>
                <td>{item.screen_name}</td>
                <td>{item.btn_name}</td>
                <td>
                  {item.tf_file ? (
                    item.fileName ? (
                      <div className="flex items-center">
                        <a
                          href={`https://api.shuman.codeidea.io/v1/contents-data/file-download/${item.fileId}`}
                          className="cursor-pointer text-blue underline"
                        >
                          {item.fileName}
                        </a>
                        <a
                          className="text-danger ml-4 cursor-pointer"
                          onClick={() => {
                            setMenu({
                              menuDetailList: menu.menuDetailList.map((child) =>
                                child.id === item.id
                                  ? {
                                      ...child,
                                      file: '',
                                      tf_file: true,
                                      fileName: false,
                                      savedFileDelYN: 'Y',
                                    }
                                  : child,
                              ),
                            })
                          }}
                        >
                          삭제
                        </a>
                      </div>
                    ) : (
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => handleChangeFile(e, item.id)}
                      />
                    )
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={item.link_url}
                      onChange={(e) =>
                        setMenu({
                          menuDetailList: menu.menuDetailList.map((child) =>
                            child.id === item.id
                              ? { ...child, link_url: e.target.value }
                              : child,
                          ),
                        })
                      }
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Contents
