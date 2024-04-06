const departmentApp = Vue.createApp({
    data() {
        return {
            // 绑定的模型数据，用于新建和编辑部门时的输入
            departmentInput: {
                id: '',
                name: '',
                leader: '',
                viceLeader: '',
                membersCount: 0
            },
            // 添加编辑部门的输入
            departmentEditInput: {
                id: '',
                name: '',
                leader: '',
                viceLeader: '',
                membersCount: 0
            },
            showEditDepartmentModal: false, // 添加了模态框显示状态的数据
            // 预定义初始部门数据
            departmentsData: [
                {
                    id: 'dep1',
                    name: '研发部',
                    leader: '张三',
                    viceLeader: '李四',
                    membersCount: 10
                },
                {
                    id: 'dep2',
                    name: '市场部',
                    leader: '王五',
                    viceLeader: '赵六',
                    membersCount: 8
                },
                {
                    id: 'dep3',
                    name: '人事部',
                    leader: '孙七',
                    viceLeader: '周八',
                    membersCount: 7
                }
            ],
            // 预定义组长和副组长选项
            leaders: ['张三', '王五', '孙七'],
            viceLeaders: ['李四', '赵六', '周八']
        };
    },
    methods: {
        createDepartment() {
            // 创建部门并添加到部门列表
            if (this.departmentInput.name && this.departmentInput.leader && this.departmentInput.viceLeader && this.departmentInput.membersCount >= 0) {
                this.departmentsData.push({
                    id: `dep${Date.now()}`,  // 更安全地生成唯一ID
                    name: this.departmentInput.name,
                    leader: this.departmentInput.leader,
                    viceLeader: this.departmentInput.viceLeader,
                    membersCount: this.departmentInput.membersCount
                });

                // 清空输入框
                Object.assign(this.departmentInput, {
                    id: '',
                    name: '',
                    leader: '',
                    viceLeader: '',
                    membersCount: 0
                });
            } else {
                alert('请填写完整的部门信息');
            }
        },
        editDepartment(department) {
            // 打开模态框并加载部门数据到编辑输入而不是创建部门的输入
            this.showEditDepartmentModal = true;
            Object.assign(this.departmentEditInput, {
                id: department.id,
                name: department.name,
                leader: department.leader,
                viceLeader: department.viceLeader,
                membersCount: department.membersCount
            });
        },
        updateDepartment() {
            // 更新部门信息
            const index = this.departmentsData.findIndex(dept => dept.id === this.departmentEditInput.id);
            if (index !== -1) {
                Object.assign(this.departmentsData[index], { ...this.departmentEditInput });

                // 清空编辑输入
                Object.assign(this.departmentEditInput, {
                    id: '',
                    name: '',
                    leader: '',
                    viceLeader: '',
                    membersCount: 0
                });

                this.closeEditDepartmentModal();
            }
        },
        closeEditDepartmentModal() {
            // 关闭编辑模态框
            this.showEditDepartmentModal = false;
        },
        deleteDepartment(index) {
            // 通过索引删除部门
            if (index !== -1 && confirm('确定要删除这个部门吗？')) {
                this.departmentsData.splice(index, 1);
            }
        },
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var backButton = document.getElementById('backButton');
    backButton.onclick = function () {
        // 返回 managementSystem.html
        window.location.href = 'managementSystem.html';
    };
});

departmentApp.mount('#app');