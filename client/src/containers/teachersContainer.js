import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import TeacherNav from "../components/views/teacher/TeacherNav";
import TeacherHome from "../components/views/teacher/TeacherHome";
import TeacherAssignments from "../components/views/teacher/TeacherAssignments";
import TeacherAttendance from "../components/views/teacher/TeacherAttendance";
import TeacherGrades from "../components/views/teacher/TeacherGrades";
import API from "../utils/API";

class TeacherContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classrooms: [],
      students: [],
      teacher: "",
      currentClassroom: ""
    };
    this.getClassroomsData = this.getClassroomsData.bind(this);
    this.changeClassroom = this.changeClassroom.bind(this);
    this.getTeacherInfo = this.getTeacherInfo.bind(this);
    this.getStudentsInfo = this.getStudentsInfo.bind(this);
  }

  componentDidMount() {
    this.getClassroomsData();
  }

  componentDidUpdate() {}

  getClassroomsData() {
    API.getClassrooms()
      .then(res => {
        console.log(res.data);
        this.setState({
          classrooms: res.data
        });
      })
      .catch(err => console.log(err));
    console.log(this.state.classrooms);
  }

  async changeClassroom(classroomId) {
    await API.getClassroom(classroomId)
      .then(res => {
        console.log("change to new classroom", res.data);
        this.setState({
          currentClassroom: res.data
        });
        this.getTeacherInfo();
        this.getStudentsInfo();
      })
      .catch(err => console.log(err));
  }

  getTeacherInfo() {
    const currentClassroom = this.state.currentClassroom;
    const teacherFirstname = currentClassroom.teacherId.firstName;
    const teacherLastname = currentClassroom.teacherId.lastName;
    console.log("Teacher: ", teacherFirstname + " " + teacherLastname);

    this.setState({
      teacher: currentClassroom.teacherId
    });
    console.log(this.state.teacher);
  }

  getStudentsInfo() {
    const currentClassroom = this.state.currentClassroom;
    const studentFirstname = currentClassroom.studentsId[0].firstName;
    const studentLastname = currentClassroom.studentsId[0].lastName;
    console.log("Student: ", studentFirstname + " " + studentLastname);

    this.setState({
      students: currentClassroom.studentsId
    });
  }

  render() {
    const classroom = this.state.currentClassroom;
    const teacher = this.state.teacher;
    const students = this.state.students;
    return (
      <div>
        <TeacherNav
          classrooms={this.state.classrooms}
          classroom={this.state.currentClassroom}
          onChange={this.changeClassroom}
        />
        <h1>This is teacher container's homepage</h1>
        <div>
          <p>Display Information of selected classroom here</p>
          <p>Subject: {classroom.subject} </p>
          <p>Room: {classroom.roomNumber} </p>
          <img
            src={classroom.imagePath}
            alt={classroom.subject}
            width="200"
            height="150"
          />
          <p>
            Teacher: {teacher.firstName} {teacher.lastName} {teacher.email}
          </p>
          <p>Students in class</p>
          <ul>
            {students.map((student, i) => (
              <li key={i} value={student._id}>
                {student.firstName} {student.lastName}
              </li>
            ))}
          </ul>
        </div>

        <Switch>
          <Route
            exact
            path="/teacher/"
            render={props => (
              <TeacherHome
                {...props}
                user={this.state.user}
                classroom={this.state.currentClassroom}
                tescher={this.state.currentTeacher}
                students={this.state.currentStudentsInClass}
              />
            )}
          />
          <Route
            exact
            path="/teacher/assignments"
            render={props => (
              <TeacherAssignments
                {...props}
                user={this.state.user}
                classroom={this.state.currentClassroom}
                tescher={this.state.currentTeacher}
                students={this.state.currentStudentsInClass}
              />
            )}
          />
          <Route
            exact
            path="/teacher/attendance"
            render={props => (
              <TeacherAttendance
                {...props}
                user={this.state.user}
                classroom={this.state.currentClassroom}
                tescher={this.state.currentTeacher}
                students={this.state.currentStudentsInClass}
              />
            )}
          />
          <Route
            exact
            path="/teacher/grades"
            render={props => (
              <TeacherGrades
                {...props}
                user={this.state.user}
                classroom={this.state.currentClassroom}
                tescher={this.state.currentTeacher}
                students={this.state.currentStudentsInClass}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default TeacherContainer;
