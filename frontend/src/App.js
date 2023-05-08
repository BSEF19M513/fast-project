import React from "react";
import { useState , useEffect } from "react";
import Axios from 'axios';
const courses = [
  {
    id: 1,
    name: "SE(BCS-6A)",
    timeSlot: "9am - 12pm",
    instructor: "John Doe",
  },
  {
    id: 2,
    name: "COAL(BCS-3A)",
    timeSlot: "1pm - 4pm",
    instructor: "Jane Smith",
  },
  {
    id: 3,
    name: "LA(BCS-3C)",
    timeSlot: "4pm - 7pm",
    instructor: "Bob Johnson",
  },
  {
    id: 4,
    name: "Discrete(BCS-3B))",
    timeSlot: "9am - 12pm",
    instructor: "John Doe",
  },
  {
    id: 5,
    name: "POL(BCS-4A)",
    timeSlot: "1pm - 4pm",
    instructor: "Jane Smith",
  },
  {
    id: 6,
    name: "OOP(BCS-4B)",
    timeSlot: "4pm - 7pm",
    instructor: "Bob Johnson",
  }
];

const App = () => {

  const [course, setCourse] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [instructor, setInstructor] = useState("");
  const [coursesData, setCoursesData] = useState([]);


  useEffect(() => {
    Axios.get("http://localhost:4000/courses").then((response) => {
      setCoursesData(response.data);
    });
  }, []);

  const getFormData = async (e) => {
    e.preventDefault();
    console.log(instructor + "_" + timeSlot);
    console.log(course, timeSlot, instructor);

    // check if the selected course and time slot is already allocated
    const isCourseAlreadyAllocated = coursesData.some(
      (val) => val.courseName === course && val.timeSlotId === timeSlot
    );

    if (isCourseAlreadyAllocated) {
      // if the course is already allocated, show an error message
      alert("This course is already allocated to this time slot");
    } else {
      // if the course is not already allocated, allocate the course
      Axios.post("http://localhost:4000/courses/allocateCourse", {
        timeSlotId: timeSlot,
        courseName: course,
        slotId: instructor + "_" + timeSlot
      })
        .then(() => {
          // if the allocation is successful, show a success message
          alert("Course allocated successfully");
        })
        .catch((error) => {
          // if there is an error, show an error message
          alert("This course is already allocated to this time slot");
        });
    }

    // reset the form fields
    setCourse("");
    setTimeSlot("");
    setInstructor("");
  }


  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
        Allocation of Instructors
      </h1>
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <form
            onSubmit={getFormData}
            >
            <table className="w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sr.No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Course Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Time Slot
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Instructor

                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Allocate Slot</span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {course.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {
                        course.name
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.timeSlot}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select className="ml-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                        onChange={(e) => setInstructor(e.target.value)}
                      >
                        <option value=""
                        >Select</option>
                        <option value="1">John Doe</option>
                        <option value="2">Jane Smith</option>
                        <option value="3">Bob Johnson</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        // set the both course and time slot in the state
                        onClick={() => {
                          setCourse(course.name);
                          // if the time slot is 9am - 12pm, set the time slot id to 1
                          if (course.timeSlot === "9am - 12pm") {
                            setTimeSlot(11);
                          }
                          // if the time slot is 1pm - 4pm, set the time slot id to 2
                          else if (course.timeSlot === "1pm - 4pm") {
                            setTimeSlot(12);
                          }
                          // if the time slot is 4pm - 7pm, set the time slot id to 3
                          else if (course.timeSlot === "4pm - 7pm") {
                            setTimeSlot(13);
                          }
                        }}

                      >
                        Allocate Slot
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;