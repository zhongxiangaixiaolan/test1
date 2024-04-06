const app = Vue.createApp({
    data() {
        return {
            trClass: "tr1",
            searchTriggered: false,
            showModal: false,
            showModal1: false,
            modalData: {
                id: '',
                name: '',
                pass: '',
                author: '',
                index: "",
            },
            //重置密码部分
            resetPasswordData: {
                id: '',
                name: '',
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            },
            keyword: "",
            id: "",
            name: "",
            pass: "",
            author: "普通用户",
            userLists: [
                {
                    id: "20240322184534",
                    name: "亿万少女的梦",
                    pass: "Wang1234567",
                    author: "超级管理员",
                    operation: ['编辑', '删除', '重置密码']
                },
                {
                    id: "20240322180034",
                    name: "程序员",
                    pass: "cxy12345678",
                    author: "管理员",
                    operation: ['编辑', '删除', '重置密码']
                },
                {
                    id: "20240302184534",
                    name: "美艳小马",
                    pass: "mYxm1234567",
                    author: "普通用户",
                    operation: ['编辑', '删除', '重置密码']
                },
            ]
        }
    },

    computed: {
        usersFiltered() {

            if (this.searchTriggered && this.keyword) {
                return this.userLists.filter(user =>
                    Object.values(user).join(' ').toLowerCase()
                        .includes(this.keyword.toLowerCase())
                );
            }
            this.searchTriggered = false;
            return this.userLists;

        }
    },

    methods: {
        add() {
            // 检查用户名、密码、角色是否已输入
            if (!this.name.trim() || !this.pass.trim() || !this.author.trim()) {
                alert('所有用户信息必须填写完整');
                this.clear();
                return;
            }

            // 定义一个密码的正则表达式
            const passwordRegex = /^[A-Za-z0-9]{11}$/;

            // 通过正则表达式检查密码
            if (!passwordRegex.test(this.pass)) {
                alert('密码必须是11位，并且只能包含字母和数字');
                this.clear();
                return;
            }

            // 将新用户添加到用户列表中
            this.userLists.push({
                id: this.formattedDate(),
                name: this.name,
                pass: this.pass,
                author: this.author,
                operation: ['编辑', '删除', '重置密码']
            });

            // 清除输入字段，为下一个用户的输入做准备
            this.clear();
        },
        searchUsers() {

            this.searchTriggered = true;
        },
        clear() {
            this.name = "";
            this.pass = "";
            this.author = "普通用户";
        },
        editUser(index) {
            this.modalData = { ...this.userLists[index] }; // 复制当前用户数据到模态窗口用的变量
            this.modalData.index = index;
            this.showModal = true;
        },
        updateUser() {
            index = this.modalData.index;
            if (!this.modalData.name.trim() || !this.modalData.pass.trim() || !this.modalData.author.trim()) {
                alert('所有用户信息必须填写完整');
                return;
            }

            // 定义密码的正则表达式
            const passwordRegex = /^[A-Za-z0-9]{11}$/;

            // 验证密码
            if (!passwordRegex.test(this.modalData.pass)) {
                alert('密码必须是11位，并且只能包含字母和数字');
                return;
            }

            // 更新用户信息
            this.userLists.splice(index, 1, {
                ...this.modalData,
                operation: ['编辑', '删除', '重置密码']  // 如果这是固定的就不需修改
            });

            // 关闭模态框
            this.showModal = false;
        },
        cancelUpdate() {
            this.showModal = false;
        },
        deleteUser(index) {

            this.userLists.splice(index, 1);
        },

        formattedDate() {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');

            return `${year}${month}${day}${hours}${minutes}${seconds}`;
        },

        //重置密码
        showResetModal(index) {
            const user = this.userLists[index];
            this.resetPasswordData = {
                id: user.id,
                name: user.name,
                currentPassword: user.pass,
                newPassword: '',
                confirmNewPassword: ''
            };
            this.showModal1 = true;
        },
        resetPassword() {
            // 密码格式的正则表达式
            const passwordRegex = /^[A-Za-z0-9]{11}$/;

            if (!passwordRegex.test(this.resetPasswordData.newPassword)) {
                alert('密码格式不正确，必须是11位，并且只能包含字母和数字。');
                return;
            }

            if (this.resetPasswordData.newPassword !== this.resetPasswordData.confirmNewPassword) {
                alert('两次输入的新密码不一致，请重新输入。');
                return;
            }

            // 密码更新的逻辑
            const userIndex = this.userLists.findIndex(user => user.id === this.resetPasswordData.id);
            if (userIndex !== -1) {
                // 更新用户列表中的密码
                this.userLists[userIndex].pass = this.resetPasswordData.newPassword;
                alert('密码重置成功！');
                this.closeResetModal();
            } else {
                alert('发生错误，未找到用户。');
            }
        },
        closeResetModal() {
            this.showModal1 = false;
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
app.mount('#app');