import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}


export function getprofile() {
  return request({
    url: '/sys/profile',
    method: 'get',
  })
}


export function getDepartmet() {
  return request({
    url: "/company/department",
  })
}

export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}


export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}



export function updateDepartment(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取角色列表 

export const getRole = (params) => request.get('/sys/role', { params })

//  更新角色信息
export function putrole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data // 查询参数
  })
}

export function poshadd(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}


export function DELETEsc(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'DELETE',
  })
}

// 员工

export function getemployee(params) {
  return request({
    url: '/sys/user',
    params
  })
}


export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 员工详情页
export function getEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

// 员工编辑 
export function getEmployeebj(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: "PUT",
    data
  })
}


// 导出员工信息表   

export function exportEmployee() {
  return request({
    url: `/sys/user/export`,
    responseType: 'blob', // 默认值
  })
}

// 导入员工的excel sys/user/import
export function importEmployee(data) {
  return request({
    url: `sys/user/import`,
    method: 'POST',
    data   //formData类型  因为要上传文件
  })
}


//获取可用角色   /sys/role/list/enabled
export function getEnabledRoles(id) {
  return request({
    url: `/sys/role/list/enabled`
  })
}

export function getEmployeeid(data) {
  return request({
    url: `/sys/user/${data.id}`,
    data
  })
}

export function getEmplo(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: "PUT",
    data
  })
}




// 获取分配权限数据接口  

export function getrole(data) {
  return request({
    url: `/sys/role/${data.id}`,
  })
}


// 获取分配数据
// https://heimahr.itheima.net/api/sys/permission

export function getroleall() {
  return request({
    url: '/sys/permission',
  })
}

//  确认分配角色
export function putroles(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: "PUT",
    data
  })
}


// 权限 


// https://heimahr.itheima.net/api/sys/permission 

export function getpermission() {
  return request({
    url: '/sys/permission',
  })
}

// 权限添加  

export function poshpermission(data) {
  return request({
    url: 'sys/permission',
    method: 'POST',
    data
  })
}


// 权限编辑 

export function getpermiss(params) {
  return request({
    url: `/sys/permission/${params.id}`,
  })
}


// /sys/permission/49


export function putpermiss(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}
