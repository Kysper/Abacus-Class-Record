import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./assets/css/navbar.css";

class AbacusNavbar extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  // That stateless component class defines a function that calls the passed-down function, and that can take an event object as an argument.
  handleChange(e) {
    const differentClassroom = e.target.value;
    this.props.onChange(differentClassroom);
  }

  render() {
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <span className="brand-logo center">
                        <Link to="/teacher/">
                            <i className="far fa-abacus"></i><br/>
                            Abacus
                        </Link>
                    </span>
                    <a href="#" data-target="sidenav" className="sidenav-trigger"><i className="fa fa-bars"></i></a>
                    <ul id="nav-mobile" className="left hide-on-med-and-down nav-icons">
                        <li><Link to="/teacher/attendance"><i className="far fa-bullhorn left"></i> Attendance</Link></li>
                        <li><Link to="/teacher/assignments"><i className="fal fa-file-alt left"></i>Assignments</Link></li>
                        <li><Link to="/teacher/grades"><i className="far fa-book left"></i>Grade Book</Link></li>
                    </ul>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <select onChange={this.handleChange} className="browser-default">
                                <option>Select Class</option>
                                {this.props.classrooms.map((classroom, i) => (
                                    <option key={i} value={classroom._id}>
                                        {classroom.subject}
                                    </option>
                                ))}
                            </select>
                        </li>
                    </ul>
                    <ul className="sidenav" id="sidenav">
                        <li><Link to="/teacher/attendance"><i className="far fa-bullhorn"></i> Attendance</Link></li>
                        <li><Link to="/teacher/assignments"><i className="fal fa-file-alt"></i> Assignments</Link></li>
                        <li><Link to="/teacher/grades"><i className="far fa-book"></i> Grade Book</Link></li>
                        <li>
                            <select onChange={this.handleChange} className="browser-default">
                                <option>Select Class</option>
                                {this.props.classrooms.map((classroom, i) => (
                                    <option key={i} value={classroom._id}>
                                        {classroom.subject}
                                    </option>
                                ))}
                            </select>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
  }
}

export default AbacusNavbar;
