import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: '/api/role',
        method: 'post',
        params: query
    });
};

export const fetchGoods = query => {
    return request({
        url: '/api/goods',
        method: 'get',
        params: query
    });
};


export const getUserGood = (roleId) => {
    return request({
        url: '/api/good/getUserGood?roleId='+roleId,
        method: 'get'
    });
};
export const updGood = (query) => {
    return request({
        url: '/api/good/updGood',
        method: 'post',
        params: query
    });
};

export const agentRole = (query) => {
    return request({
        url: '/api/agentRole',
        method: 'post',
        params: query
    });
};

export const getAgentAll = (query) => {
    return request({
        url: '/api/good/getAgentAll',
        method: 'get',
        params: query
    });
};

export const delAgent = (query) => {
    return request({
        url: '/api/delAgent',
        method: 'post',
        params: query
    });
};
export const getAgentJurisdiction = (query) => {
    return request({
        url: '/api/getAgentJurisdiction',
        method: 'get'
    });
};

export const recharge = (query) => {
    return request({
        url: '/api/recharge',
        method: 'post',
        params: query
    });
};

export const upAgentPwd = (query) => {
    return request({
        url: '/api/upAgentPwd',
        method: 'post',
        params: query
    });
};

export const addAgent = (query) => {
    return request({
        url: '/api/addAgent',
        method: 'post',
        params: query
    });
};

export const getOpenAll = (query) => {
    return request({
        url: '/api/getOpenAll',
        method: 'get',
        params: query
    });
};

export const stat = () => {
    return request({
        headers: {Token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTkxIiwiZXhwIjoxNjk0MzE0NzE2LCJpYXQiOjE2OTQzMTExMTZ9.LqBJPbVMgOSS1Vw_WLEDFZ5sLbsJVx42ZSSC_xfwk2o'},
        url: '/api/stat',
        method: 'get'
    });
};

export const upGrade = (query) => {
    return request({
        url: '/api/upGrade',
        method: 'get',
        params: query
    });
};
export const clear = (query) => {
    return request({
        url: '/api/clear',
        method: 'get',
        params: query
    });
};
export const fullGrade = (query) => {
    return request({
        url: '/api/fullGrade',
        method: 'get',
        params: query
    });
};
export const getAllUserInfo = (query) => {
    return request({
        url: '/api/getAllUserInfo',
        method: 'get',
        params: query
    });
};
export const agentGoods = (query) => {
    return request({
        url: '/api/agentGoods',
        method: 'get',
        params: query
    });
};
export const getUserGoodAll = (query) => {
    return request({
        url: '/api/getUserGood',
        method: 'post',
        params: query
    });
};
export const upAgentSendGoods = (query) => {
    return request({
        url: '/api/upAgentSendGoods',
        method: 'post',
        params: query
    });
};
export const getAgentSendGoods = (query) => {
    return request({
        url: '/api/getAgentSendGoods',
        method: 'get',
        params: query
    });
};
export const agentSendGoods = (query) => {
    return request({
        url: '/api/agentSendGoods',
        method: 'get',
        params: query
    });
};
export const getUserPet = (query) => {
    return request({
        url: '/api/getUserPet',
        method: 'post',
        params: query
    });
};
export const updUserPet = (query) => {
    return request({
        url: '/api/updUserPet',
        method: 'post',
        params: query
    });
};
export const getUserMount = (query) => {
    return request({
        url: '/api/getUserMount',
        method: 'post',
        params: query
    });
};
export const updUserMount = (query) => {
    return request({
        url: '/api/updUserMount',
        method: 'post',
        params: query
    });
};
export const getUserLing = (query) => {
    return request({
        url: '/api/getUserLing',
        method: 'post',
        params: query
    });
};
export const updUserLing = (query) => {
    return request({
        url: '/api/updUserLing',
        method: 'post',
        params: query
    });
};
export const getUserBaby = (query) => {
    return request({
        url: '/api/getUserBaby',
        method: 'post',
        params: query
    });
};
export const updUserBaby = (query) => {
    return request({
        url: '/api/updUserBaby',
        method: 'post',
        params: query
    });
};
export const updUserGood = (query) => {
    return request({
        url: '/api/updUserGood',
        method: 'post',
        params: query
    });
};
