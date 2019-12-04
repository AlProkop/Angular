export interface CourseItem{
    course_id: number;
    name: string;
    start_date: string;
    end_date: string;
}
export interface AssignmentItem{
    assignment_id: number;
    name: string;
    description: string;
    state: string;
    create_date: string;
    due_date: string;
    course_id_FK: number;
}