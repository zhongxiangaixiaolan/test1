const app = Vue.createApp({
    data() {
        return {
            newNotice: {
                title: '',
                content: '',
                author: '',
                date: this.getCurrentDateTime(), // 发布日期自动获取当前时间
                expiry: '',
                contact: '',
                id: this.getCurrentDate(),
                contactType: 'phone'
            },
            notices: [{
                title: '新的安全更新可用',
                content: '我们已经发布了最新的安全更新来增强您的设备的保护。建议您尽早安装这些更新以保护您的数据安全。',
                author: '安全更新小组',
                date: "2024-03-24T16:41",
                expiry: "2025-03-24T16:41",
                contact: "12345678901",
            },
            {
                title: '维护通知',
                content: '我们会在明日凌晨进行系统维护，期间可能会出现短暂无法使用的情况，请您知悉。',
                author: '系统维护团队',
                date: "2024-05-24T09:00",
                expiry: "2025-05-24T09:00",
                contact: "13998765432"
            },
            {
                title: '节假日通知',
                content: '鉴于即将到来的国庆节，客服部门将在节日期间暂停服务，给您带来的不便，我们深表歉意。',
                author: '客服部门',
                date: "2024-09-30T06:30",
                expiry: "2025-09-30T06:30",
                contact: "13712349876"
            }

            ],
            isEditModalOpen: false, // 编辑弹窗是否显示
            editingIndex: -1, // 正在编辑的公告的索引
            keyword: "",
            searchTriggered: false,
            minDateTime: this.getMinDateTime(),
            contactPlaceholder: "请输入电话号码(例如：12345678901）"
        }
    },

    computed: {

        latestNotice() {
            if (this.notices.length) {
                return this.notices[this.notices.length - 1];
            }
            return {};
        }
    },

    methods: {
        getMinDateTime() {
            return new Date().toISOString().slice(0, 16);
        },

        getCurrentDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');

            return `${year}-${month}-${day}T${hours}:${minutes}`;
        },

        getCurrentDate() {
            const now = new Date();
            return Date.now();
        },

        openEditModal(index) {
            this.editingIndex = index;
            this.newNotice = { ...this.notices[index] }; // 复制当前公告到 newNotice 用于编辑
            this.isEditModalOpen = true;
        },

        updateNotice() {
            if (this.editingIndex >= 0) {
                this.notices[this.editingIndex] = { ...this.newNotice };
                this.closeEditModal();
            }
        },

        closeEditModal() {
            this.isEditModalOpen = false;
            this.resetForm();
        },

        validateContact(type, value) {
            if (type === 'email') {
                const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegEx.test(value);
            } else if (type === 'phone') {
                const phoneRegEx = /^\+?(\d{10,15})$/;
                return phoneRegEx.test(value);
            }
            return false;
        },

        addNotice() {
            if (this.newNotice.title && this.newNotice.content) {
                if (!this.validateContact(this.newNotice.contactType, this.newNotice.contact)) {
                    alert('联系方式格式错误！');
                    return;
                }
                this.newNotice.date = this.getCurrentDateTime();
                this.newNotice.id = this.getCurrentDate();
                this.notices.push({ ...this.newNotice });
                this.resetForm();
            } else {
                alert("标题和内容是必填项。");
            }
        },

        deleteNotice(index) {
            this.notices.splice(index, 1);
        },

        resetForm() {
            this.newNotice = {
                title: '',
                content: '',
                author: '',
                date: this.getCurrentDateTime(),
                expiry: '',
                contact: '',
                id: this.getCurrentDate(),
                contactType: 'phone'
            };
            this.contactPlaceholder = this.newNotice.contactType === 'email' ? '请输入电子邮件地址(例如：user@example.com）' : '请输入电话号码(例如：12345678901）';
        }
    },

    mounted() {
        this.minDateTime = this.getMinDateTime();
        this.contactPlaceholder = this.newNotice.contactType === 'phone' ? '请输入电话号码(例如：12345678901）' : '请输入电子邮件地址(例如：user@example.com）';
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