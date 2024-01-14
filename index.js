/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }


function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    // Creating and returning an employee record object with the provided details
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],   // Initializing empty array for time in events
        timeOutEvents: []   // Initializing empty array for time out events
    };
}

function createEmployeeRecords(employeeData) {
    // Map through the array of employee data and creating employee records for each
    return employeeData.map(createEmployeeRecord);
}


function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');

    // Adding a time in event to the employee's record and returning the updated record
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    });

    return employee;
}


function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');

    // Adding a time out event to the employee's record and returning the updated record
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    });

    return employee;
}

function hoursWorkedOnDate(employee, date) {
    // Finding the time in and time out events for the given date and calculate hours worked
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100; // Assuming time is provided in 24-hour format
}


function wagesEarnedOnDate(employee, date) {
    // Calculating the pay owed for a specific date using the hours worked
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
    // Getting all the dates worked by the employee, calculating wages for each, and summing them up
    const datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
    // Finding an employee record in the array with the matching first name
    return srcArray.find(employee => employee.firstName === firstName);
}

// Function 9
function calculatePayroll(employeeRecords) {
    // Calculating the total payroll by summing up wages for all employees in the array
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}
