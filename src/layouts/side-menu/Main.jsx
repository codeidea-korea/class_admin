import { Transition } from "react-transition-group";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { helper as $h } from "@/utils";
import { sideMenu as useSideMenuStore } from "@/stores/side-menu";
import { useRecoilValue } from "recoil";
import { linkTo, nestedMenu, enter, leave } from "./index";
import { Lucide } from "@/base-components";
import logoUrl from "@/assets/images/logo.svg";
import classnames from "classnames";
import TopBar from "@/components/top-bar/Main";
import SideMenuTooltip from "@/components/side-menu-tooltip/Main";
import { userState } from "@/states/userState";

function Main() {
	const user = useRecoilValue(userState);
	const navigate = useNavigate();
	const location = useLocation();
	const [formattedMenu, setFormattedMenu] = useState([]);
	const sideMenuStore = useRecoilValue(useSideMenuStore);
	const sideMenu = () => nestedMenu($h.toRaw(sideMenuStore.menu), location);

	useEffect(() => {
		if (user.token === '') navigate('/login')
		dom("body").removeClass("error-page").removeClass("login").addClass("main");
		setFormattedMenu(sideMenu());
	}, [sideMenuStore, location.pathname]);

	return (
		<React.Fragment>
			<TopBar />
			<div className="py-2">
			
				<div className="flex mt-[4.7rem]">
				{/* BEGIN: Side Menu */}
				<nav className="side-nav shrink-0">
					<ul>
					{/* BEGIN: First Child */}
					{formattedMenu.map((menu, menuKey) =>
						menu == "devider" ? (
						<li
							className="side-nav__devider my-6"
							key={menu + menuKey}
						></li>
						) : (
						<li key={menu + menuKey}>
							<SideMenuTooltip
							tag="a"
							content={menu.title}
							href={menu.subMenu ? "#" : menu.pathname}
							className={classnames({
								"side-menu": true,
								"side-menu--active": menu.active,
								"side-menu--open": menu.activeDropdown,
							})}
							onClick={(event) => {
								event.preventDefault();
								linkTo(menu, navigate);
								setFormattedMenu($h.toRaw(formattedMenu));
							}}
							>
							<div className="side-menu__icon">
								<Lucide icon={menu.icon} />
							</div>
							<div className="side-menu__title">
								{menu.title}
								{menu.subMenu && (
								<div
									className={classnames({
									"side-menu__sub-icon": true,
									"transform rotate-180": menu.activeDropdown,
									})}
								>
									<Lucide icon="ChevronDown" />
								</div>
								)}
							</div>
							</SideMenuTooltip>
							{/* BEGIN: Second Child */}
							{menu.subMenu && (
							<Transition
								in={menu.activeDropdown}
								onEnter={enter}
								onExit={leave}
								timeout={300}
							>
								<ul
								className={classnames({
									"side-menu__sub-open": menu.activeDropdown,
								})}
								>
								{menu.subMenu.map((subMenu, subMenuKey) => (
									<li key={subMenuKey}>
									<SideMenuTooltip
										tag="a"
										content={subMenu.title}
										href={subMenu.subMenu ? "#" : subMenu.pathname}
										className={classnames({
										"side-menu": true,
										"side-menu--active": subMenu.active,
										})}
										onClick={(event) => {
										event.preventDefault();
										linkTo(subMenu, navigate);
										setFormattedMenu($h.toRaw(formattedMenu));
										}}
									>
										<div className="side-menu__icon">
										<Lucide icon="Activity" />
										</div>
										<div className="side-menu__title">
										{subMenu.title}
										{subMenu.subMenu && (
											<div
											className={classnames({
												"side-menu__sub-icon": true,
												"transform rotate-180":
												subMenu.activeDropdown,
											})}
											>
											<Lucide icon="ChevronDown" />
											</div>
										)}
										</div>
									</SideMenuTooltip>
									{/* BEGIN: Third Child */}
									{subMenu.subMenu && (
										<Transition
										in={subMenu.activeDropdown}
										onEnter={enter}
										onExit={leave}
										timeout={300}
										>
										<ul
											className={classnames({
											"side-menu__sub-open":
												subMenu.activeDropdown,
											})}
										>
											{subMenu.subMenu.map(
											(lastSubMenu, lastSubMenuKey) => (
												<li key={lastSubMenuKey}>
												<SideMenuTooltip
													tag="a"
													content={lastSubMenu.title}
													href={
													lastSubMenu.subMenu
														? "#"
														: lastSubMenu.pathname
													}
													className={classnames({
													"side-menu": true,
													"side-menu--active":
														lastSubMenu.active,
													})}
													onClick={(event) => {
													event.preventDefault();
													linkTo(lastSubMenu, navigate);
													}}
												>
													<div className="side-menu__icon">
													<Lucide icon="Zap" />
													</div>
													<div className="side-menu__title">
													{lastSubMenu.title}
													</div>
												</SideMenuTooltip>
												</li>
											)
											)}
										</ul>
										</Transition>
									)}
									{/* END: Third Child */}
									</li>
								))}
								</ul>
							</Transition>
							)}
							{/* END: Second Child */}
						</li>
						)
					)}
					{/* END: First Child */}
					</ul>
				</nav>
				{/* END: Side Menu */}
				{/* BEGIN: Content */}

				<div className="content">
					<Outlet />
				</div>
				{/* END: Content */}
				</div>
			</div>
		</React.Fragment>
	);
}

export default Main;
