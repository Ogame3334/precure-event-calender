export default interface Event {
    id: string;
    groupId?: string;
    allDay: boolean;
    start: string;
    end: string;
    startStr?: string;
    endStr?: string;
    title: string;
    url?: string;
    place?: string;
    classNames?: string;
    editable?: boolean;
};
