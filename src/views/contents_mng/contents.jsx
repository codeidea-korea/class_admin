import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@/base-components'
import { useState, useReducer, useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
import request from '@/utils/request'
import Loading from '@/components/loading'
import useDidMountEffect from '@/hooks/useDidMountEffect'

function Contents() {
  const [menu, setMenu] = useReducer((prev, next) => ({ ...prev, ...next }), {
    mainMenu: '',
    mainMenuList: [],
    subMenu: '',
    subMenuList: [],
    menuDetailList: [],
  })
  const subMenuCode = new Map()
  const [fileName, setFileName] = useState('')

  const handleChange = (event) => {
    setFileName(event.target.files[0].name)
  }

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
        })
      },
    },
  )

  const { mutate: getMenuDetail, isLoading: isMutateMenuDetail } = useMutation(
    () =>
      request.get(
        `/admin/content-management/detail/${subMenuCode.get('code')}`,
      ),
    {
      onSuccess: (data) => {
        setMenu({
          menuDetailList: data,
        })
      },
    },
  )

  const { mutate: updateMenuDetail, isLoading: isUpdateMenuDetail } =
    useMutation(
      (data) => request.put('/admin/content-management/update', data),
      {
        onSuccess: () => {
          alert('저장되었습니다.')
        },
      },
    )

  useDidMountEffect(() => {
    if (!menu.subMenuList) return
    const code = menu.subMenuList?.find(
      (item) => item.ca_code2_name === menu.subMenu,
    ).ca_code2
    subMenuCode.set('code', code)
    getMenuDetail()
  }, [menu.subMenu])

  return (
    <div className="relative">
      {(isGetMenus || isMutateMenuDetail || isUpdateMenuDetail) && <Loading />}
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
                  onClick={() => setMenu({ mainMenu: item.ca_code1_name })}
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
            onClick={() => updateMenuDetail(menu.menuDetailList)}
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
                  {/* <div className="grid input-group">
                    <input type="file" className="dp_none" id="file-upload" />
                    <label htmlFor="file-upload" className="flex items-center">
                      <input
                        type="text"
                        className="form-control file_up bg-white border-r-0 !text-left"
                        placeholder="파일을 선택해주세요."
                        value={fileName}
                        readOnly
                      />
                      <div className="input-group-text whitespace-nowrap file_up_btn cursor-pointer">
                        파일찾기
                      </div>
                    </label>
                  </div> */}
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
