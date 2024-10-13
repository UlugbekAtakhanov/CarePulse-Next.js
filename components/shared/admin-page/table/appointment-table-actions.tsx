import AppointmentModal from "../../modals/appointment-modal";

const AppointmentTableActions = ({ data }: { data: AppointmentProps }) => {
    return (
        <div className="flex gap-4">
            <AppointmentModal type="schedule" userId={data.userId} appointment={data} />
            <AppointmentModal type="cancel" userId={data.userId} appointment={data} />
        </div>
    );
};

export default AppointmentTableActions;
