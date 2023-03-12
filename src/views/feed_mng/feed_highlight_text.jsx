import {Lucide, Modal, ModalBody, ModalHeader, ModalFooter, TabGroup2, TabList2, Tab2, TabPanels2, TabPanel2 } from "@/base-components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { useRecoilValue } from "recoil";
import { userState } from "@/states/userState";

function FeedHighlightText(props) {
	const api = useAxios();
	const navigate = useNavigate();
	const user = useRecoilValue(userState);

 
    //const matchText = props.content.split(new RegExp(`(${searchValue})`, 'gi'));

	return (
		<React.Fragment>
            <p>{props.content}</p>
            <p>{props.feedbackList}</p>
		</React.Fragment>
	);
}

export default FeedHighlightText;
