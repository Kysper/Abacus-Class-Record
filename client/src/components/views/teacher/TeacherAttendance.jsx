import React, { Component } from "react";
import moment from "moment";
import AttendanceList from "../../attendanceList";
import DatePicker from "../../datePicker";
import AttendanceOverview from "../../attendanceOverview";

class TeacherAttendance extends Component {
  constructor(props) {
    const css = require("./assets/css/attendance.css").toString();

    super(props);

    this.state = {
      classroom: props.classroom,
      classroomId: props.classroom._id,
      classDate: moment().format("YYYY-MM-DD"),
      attendanceList: [],
      showOverview: false,
      studentsCount: 0
    };

    this.updateClassDate = this.updateClassDate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateCurrentClass = this.updateCurrentClass.bind(this);
  }

  componentWillReceiveProps(props) {
    const { refresh } = this.props;
    if (props.refresh !== refresh) {
      console.log("teacherAttendance refresh");
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.classDate !== nextState.classDate) {
      console.log("shouldComponentUpdate: classDate is changed");
      return true;
    }
    if (this.state.showOverview !== nextState.showOverview) {
      console.log("shouldComponentUpdate: showOverview is changed");
      return true;
    }
    if (this.props.classroom !== nextProps.classroom) {
      return true;
    }
    return false;
  }

  updateClassDate(date) {
    this.setState({
      classDate: date
    });
    console.log("update class to, ", date);
    this.refreshClassDate();
  }

  refreshClassDate() {
    console.log("refresh class date");
    this.setState({ refreshClassDate: !this.state.refreshClassDate });
  }

  handleClick() {
    this.setState(
      prevState => ({
        showOverview: !prevState.showOverview
      }),
      console.log(this.state.showOverview)
    );
  }

  updateCurrentClass(updatedAttendanceList) {
    this.setState(
      {
        attendanceList: updatedAttendanceList
      },
      console.log(this.state.attendanceList)
    );
  }
  render() {
    // const studentsAttendance = this.state.attendanceList;
    return (
      <div>
        <style>${this.css}</style>

        <button
          className="waves-effect waves-light btn-small"
          key={
            this.state.classroomId +
            "_" +
            this.state.classDate +
            "_" +
            this.state.showOverview
          }
          onClick={this.handleClick}
        >
          {this.state.showOverview
            ? "Close Attendance Overview"
            : "Show Attendance Overview"}
        </button>
        {this.state.showOverview && (
          <AttendanceOverview
            key={
              this.state.classroomId +
              "_" +
              this.state.showOverview +
              "_" +
              this.state.classDate
            }
            showOverview={this.state.showOverview}
            attendanceList={this.state.attendanceList}
            classroomId={this.state.classroomId}
            classDate={this.state.classDate}
          />
        )}

        {this.state.classroom && (
          <div>
            <p>
              Attendance of {this.state.classroom.subject} on
              {this.state.classDate}
            </p>
            <DatePicker onChange={this.updateClassDate} />
            <AttendanceList
              key={this.state.classroomId + "_" + this.state.classDate}
              classroomId={this.state.classroomId}
              classDate={this.state.classDate}
              onClassUpdate={this.updateCurrentClass}
              refresh={this.refreshClassDate}
            />
          </div>
        )}
      </div>
    );
  }
}

export default TeacherAttendance;
