import StatCard from "@/components/shared/admin-page/stat-card";
import AppointmentsTable from "@/components/shared/admin-page/table/appointments-table";
import { columns } from "@/components/shared/admin-page/table/columns";
import Logo from "@/components/shared/Logo";
import { getAppointmentsList } from "@/lib/actions/appointment.actions";
import React from "react";

const AdminPage = async () => {
    const appointments = await getAppointmentsList()
    return (
        <div className="max-w-7xl mx-auto pt-2">
            {/* navbar */}
            <nav className="flex items-center gap-2 justify-between bg-black p-4 rounded-lg">
                <Logo />
                <p>Admin Dashboard</p>
            </nav>

            {/* header */}
            <div className="my-8 px-4">
                <h1 className="text-3xl font-bold">Welcome Admin 👋</h1>
                <p className="text-muted-foreground">Start day with managing new appointments.</p>
            </div>

            {/* card */}
            <div className="px-4 grid grid-cols-3 gap-4">
                <StatCard type="scheduled" count={appointments.scheduledCount} label="Scheduled Appointments" icon="/assets/icons/appointments.svg" />
                <StatCard type="pending" count={appointments.pendingCount} label="Pending Appointments" icon="/assets/icons/pending.svg" />
                <StatCard type="cancelled" count={appointments.cancelledCount} label="Cancelled Appointments" icon="/assets/icons/cancelled.svg" />
            </div>

            {/* table */}
            <AppointmentsTable columns={columns} data={appointments.documents} />
        </div>
    );
};

export default AdminPage;
