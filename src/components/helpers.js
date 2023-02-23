export function userStatusName(stat) {
    let str = "";
    switch(stat){
        case "ACTIVE": str = "활동"; break;
        case "SLEEP": str = "휴면"; break;
        case "LEAVE": str = "탈퇴"; break;
    }
    return str;
}

export function userStatusColorClass(stat) {
    let str = "";
    switch(stat){
        case "ACTIVE": str = "text-primary"; break;
        case "SLEEP": str = "ext-slate-400"; break;
        case "LEAVE": str = "text-danger"; break;
    }
    return str;
}

export function userAuthorityName(authority) {
    let str = "";
    switch(authority){
        case "STUDENT": str = "학생"; break;
        case "PARENTS": str = "학부모"; break;
        case "NOMAL": str = "미정"; break;
        case "ADMIN": str = "미정"; break;
        case "TEACHER": str = "미정"; break;
        case "DIRECTOR": str = "미정"; break;
    }
    return str;
}

// 일단 사용안함. 
export function adminStatus(stat) {
    let str = "";
    switch(stat){
        case "ACTIVE": str = "활동"; break;
        case "SLEEP": str = "휴면"; break;
        case "LEAVE": str = "탈퇴"; break;
        case "READY": str = "준비"; break;
    }
    return str;
}

export function userSchoolYear(code) {
    let str = "";
    switch(code){
        case "E1": str = "초1"; break;
        case "E2": str = "초2"; break;
        case "E3": str = "초3"; break;
        case "E4": str = "초4"; break;
        case "E5": str = "초5"; break;
        case "E6": str = "초6"; break;
        case "M1": str = "중1"; break;
        case "M2": str = "중2"; break;
        case "M3": str = "중3"; break;
        case "H1": str = "고1"; break;
        case "H2": str = "고2"; break;
        case "H3": str = "고3"; break;
        case "P": str = "학부모"; break;
    }
    return str;
}

export function convertBirthdayStr(birth) {
    let byear = birth?.substr(0,4);
    let bmonth = birth?.substr(5,2);
    let bday = birth?.substr(8,2);
    let str = byear + "년 " + bmonth + "월 " + bday + "일";
    return str;
}