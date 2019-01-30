import axios from "axios";

axios.defaults.baseURL = "https://react-abacus.herokuapp.com";

export default {
  // Get All Teachers
  getTeachers: function() {
    return axios.get("api/teachers");
  },

  // Get specific Teacher
  getTeacher: function(id) {
    return axios.get("api/teachers/" + id);
  },

  // Delete a Teacher
  deleteTeacher: function(id) {
    return axios.delete("api/teachers/" + id);
  },

  // Save a Teacher
  saveTeacher: function(teacherData) {
    return axios.post("/api/teachers", teacherData);
  },

  updateTeacher: function(teacherId, teacherData) {
    return axios.put("/api/teachers/" + teacherId, teacherData);
  },

  // Get All Students
  getStudents: function() {
    return axios.get("api/students");
  },

  // Get specific Student
  getStudent: function(studentId) {
    return axios.get("api/students/" + studentId);
  },

  // Delete a Student
  deleteStudent: function(studentId) {
    return axios.delete("api/students/" + studentId);
  },

  // Save a Student
  saveStudent: function(studentData) {
    return axios.post("/api/students", studentData);
  },

  updateStudent: function(studentId, studentData) {
    return axios.put("/api/students/" + studentId, studentData);
  },

  // Get All Classrooms
  getClassrooms: function() {
    return axios.get("/api/classrooms");
  },

  // Get specific Classroom
  getClassroom: function(classroomId) {
    return axios.get("/api/classrooms/" + classroomId);
  },

  // Create a Classroom with a valid teacher Id
  createClassroom: function(classroomData) {
    return axios.post("/api/classrooms", classroomData);
  },

  // Add a student to a classroom
  addStudentToClassroom: function(classroomId, studentId) {
    return axios.put("/api/classrooms/add/" + classroomId + "/" + studentId);
  },

  // Delete a Classroom
  deleteClassroom: function(classroomId) {
    return axios.delete("/api/classrooms/" + classroomId);
  },
  // Create an attendance with 1.) classroomId and 2.) classDate in format "YYYY-MM-DD"
  createAttendances: function(attendanceData) {
    return axios.post("/api/attendance", attendanceData);
  },

  // Get all attendances, student names, class subject
  // by using classroomId as id and classDate with a format "YYYY-MM-DD"
  // studentId and classroomId will be populated with firstName, lastName, and subject
  getAttendances: function(classroomId, classDate) {
    return axios
      .get("/api/attendance/" + classroomId + "/" + classDate)
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  },

  // Check in all students in that classroom/classDate
  updateAttendancesCheckIn: function(classroomId, classDate) {
    return axios.put(
      "/api/attendance/checkin/" + classroomId + "/" + classDate
    );
  },

  // Check out all students in that classroom/classDate
  updateAttendancesCheckOut: function(classroomId, classDate) {
    return axios.put(
      "/api/attendance/checkout/" + classroomId + "/" + classDate
    );
  },

  // Check in or check out (toggle) a student into a classroom/classDate
  updateAttendanceToggle: function(attendanceId) {
    return axios.put("/api/attendance/" + attendanceId);
  },

  // Delete an attendance of a student into a classroom/classDate
  deleteAttendance: function(attendanceId) {
    return axios.delete("/api/attendance/" + attendanceId);
  },

  // Create an assignment
  createAssignment: function(assignmentData) {
    return axios.post("/api/assignments", assignmentData);
  },

  // Get an assignment in that class
  getAssignments: function(classroomId) {
    return axios.get("/api/assignments/" + classroomId);
  },

  updateAssignment: function(assignmentId, assignmentData) {
    return axios.put("/api/assignments/" + assignmentId, assignmentData);
  },

  deleteAssignment: function(assignmentId) {
    return axios.delete("/api/assignments/" + assignmentId);
  },

  // Get a list of grades for an assignment
  getGrades: function(assignmentId) {
    return axios.get("/api/grades/assignment/" + assignmentId);
  },

  // Get a list of grades for a student
  getGradesOfStudent: function(studentId) {
    return axios.get("/api/grades/student/" + studentId);
  },

  // Create grades for all students in class with classroomId and assignmentId
  createGrades: function(gradeData) {
    return axios.post("/api/grades/", gradeData);
  },

  // Update grade, input is a number between 1-10
  updateGrade: function(gradeId, gradeInput) {
    console.log("updateGrade", gradeId, "grade input", gradeInput);
    return axios.put("/api/grades/" + gradeId, gradeInput);
  },

  deleteGrade: function(gradeId) {
    return axios.delete("/api/grades/" + gradeId);
  }
};
