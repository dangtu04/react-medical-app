export const adminMenu = [
    { //người dùng
        name: 'menu.admin.user', menus: [            
            { name: 'menu.admin.user-manage-v1', link: '/system/user-manage-v1'},
            { name: 'menu.admin.user-manage-v2', link: '/system/user-manage-v2'}, 
            { name: 'menu.admin.doctor-introduce', link: '/system/doctor-introduce'},
            { name: 'menu.admin.doctor-schedule', link: '/doctor/manage-schedule'},
           

        ],

    },
    {   //phòng khám
        name: 'menu.admin.clinic', menus: [
            { name: 'menu.admin.clinic-manage', link: '/system/clinic-manage'},
        ],
    },
    {   //chuyên khoa
        name: 'menu.admin.specialty', menus: [
            { name: 'menu.admin.specialty-manage', link: '/system/specialty-manage'},
        ],
    },
    {   //phòng khám
        name: 'menu.admin.handbook', menus: [
            { name: 'menu.admin.handbook-manage', link: '/system/handbook-manage'},
        ],
    },
];

export const doctorMenu = [
    { // bác sĩ
        name: 'menu.doctor.doctor', menus: [            
            { name: 'menu.doctor.schedule', link: '/doctor/manage-schedule'},

        ],

    },
];