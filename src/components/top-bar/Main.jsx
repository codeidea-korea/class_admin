import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import { userState } from "@/states/userState";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";

function Main(props) {
	const navigate = useNavigate();
	const userReset = useResetRecoilState(userState);
	const [searchDropdown, setSearchDropdown] = useState(false);
	const showSearchDropdown = () => {
		setSearchDropdown(true);
	};
	const hideSearchDropdown = () => {
		setSearchDropdown(false);
	};

	// 로그아웃
	const handleLogout = () => {
		console.log('test')
        userReset();
        navigate('/login');
    };

	return (
		<>
		{/* BEGIN: Top Bar */}
		<div className="top-bar">
			{/* BEGIN: Breadcrumb */}
			<Link to="">
			<div className="text-2xl font-bold mr-6 text-white">
				WP Apply
			</div>
			</Link>
			
			<nav
			aria-label="breadcrumb"
			className="-intro-x mr-auto hidden sm:flex"
			>
			<ol className="breadcrumb">
				<li className="breadcrumb-item">
				<a href="#" className="text-slate-400">회원관리</a>
				</li>
				<li className="">
				<Lucide icon="ChevronRight" className="w-4 h-4 text-slate-400"></Lucide>
				</li>
				<li className=" text-white " aria-current="page">
				회원관리
				</li>
			</ol>
			</nav>
			{/* END: Breadcrumb */}
			{/* BEGIN: Search */}
			{/* <div className="intro-x relative mr-3 sm:mr-6">
			<div className="search hidden sm:block">
				<input
				type="text"
				className="search__input form-control border-transparent"
				placeholder="Search..."
				onFocus={showSearchDropdown}
				onBlur={hideSearchDropdown}
				/>
				<Lucide
				icon="Search"
				className="search__icon dark:text-slate-500"
				/>
			</div>
			<a className="notification sm:hidden" href="">
				<Lucide
				icon="Search"
				className="notification__icon dark:text-slate-500"
				/>
			</a>
			<div
				className={classnames({
				"search-result": true,
				show: searchDropdown,
				})}
			>
				<div className="search-result__content">
				<div className="search-result__content__title">Pages</div>
				<div className="mb-5">
					<a href="" className="flex items-center">
					<div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full">
						<Lucide icon="Inbox" className="w-4 h-4" />
					</div>
					<div className="ml-3">Mail Settings</div>
					</a>
					<a href="" className="flex items-center mt-2">
					<div className="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full">
						<Lucide icon="Users" className="w-4 h-4" />
					</div>
					<div className="ml-3">Users & Permissions</div>
					</a>
					<a href="" className="flex items-center mt-2">
					<div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full">
						<Lucide icon="CreditCard" className="w-4 h-4" />
					</div>
					<div className="ml-3">Transactions Report</div>
					</a>
				</div>
				<div className="search-result__content__title">Users</div>
				<div className="mb-5">
					{$_.take($f(), 4).map((faker, fakerKey) => (
					<a key={fakerKey} href="" className="flex items-center mt-2">
						<div className="w-8 h-8 image-fit">
						<img
							alt="Midone Tailwind HTML Admin Template"
							className="rounded-full"
							src={faker.photos[0]}
						/>
						</div>
						<div className="ml-3">{faker.users[0].name}</div>
						<div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
						{faker.users[0].email}
						</div>
					</a>
					))}
				</div>
				<div className="search-result__content__title">Products</div>
				{$_.take($f(), 4).map((faker, fakerKey) => (
					<a key={fakerKey} href="" className="flex items-center mt-2">
					<div className="w-8 h-8 image-fit">
						<img
						alt="Midone Tailwind HTML Admin Template"
						className="rounded-full"
						src={faker.images[0]}
						/>
					</div>
					<div className="ml-3">{faker.products[0].name}</div>
					<div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
						{faker.products[0].category}
					</div>
					</a>
				))}
				</div>
			</div>
			</div> */}
			{/* END: Search  */}
			{/* BEGIN: Notifications */}
			<div className="intro-x mr-6">
			<div className="notification notification--bullet cursor-pointer">
			</div>
			<Lucide
				icon="Bell"
				className="notification__icon dark:text-slate-500 text-white"
				/>
			</div>
			{/* END: Notifications  */}
			{/* BEGIN: Account Menu */}
			<div className="mr-3 text-white">홍길동 님</div>
			<Dropdown className="intro-x w-8 h-8">
			<DropdownToggle
				tag="div"
				role="button"
				className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
			>
				<img
				alt="Midone Tailwind HTML Admin Template"
				src={$f()[9].photos[0]}
				/>
			</DropdownToggle>
			<DropdownMenu className="w-56">
				<DropdownContent className="bg-black text-white">
					<DropdownHeader tag="div" className="!font-normal">
						<div className="font-medium">홍길동님</div>
						<div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
						관리자
						</div>
					</DropdownHeader>
					<DropdownDivider className="border-white/[0.08]" />
					<DropdownItem className="hover:bg-white/5">
						<Lucide icon="User" className="w-4 h-4 mr-2" /> 프로필 수정하기
					</DropdownItem>
					<DropdownItem className="hover:bg-white/5" onClick={handleLogout}>
						<Lucide icon="ToggleRight" className="w-4 h-4 mr-2"  /> Logout
					</DropdownItem>
				</DropdownContent>
			</DropdownMenu>
			</Dropdown>
			{/* END: Account Menu */}
		</div>
		{/* END: Top Bar */}
		</>
	);
}

export default Main;
