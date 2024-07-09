
import Dashboard from "../../../component/Dashboard/Dashboard";
import FooterAdmin from "../../../layout/Admin/Footer/Footer";
import HeaderAdmin from "../../../layout/Admin/Header/Header";
import Taskbara from "../../../layout/Admin/Taskbar/TaskBara";
import TaskbarAdmin from "../../../layout/Admin/Taskbar/taskbar";

import React, { useState } from 'react';




export default function TrangchuAdmin() {


    return (
        <>
            <HeaderAdmin />
            <div class="container-fluid">
                <div class="row">
                    <Taskbara />
                    <Dashboard />
                </div>
            </div>
            <FooterAdmin />
            </>
            )
}