// 1. Create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

// 2. Create multiple employee records
function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

// 3. Add a TimeIn event
function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date
  });
  return employee;
}

// 4. Add a TimeOut event
function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date
  });
  return employee;
}

// 5. Calculate hours worked on a given date
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date);
  const timeOut = employee.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// 6. Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

// 7. Calculate total wages for one employee
function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, event) => {
    return total + wagesEarnedOnDate(employee, event.date);
  }, 0);
}

// 8. Calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}

const employees = createEmployeeRecords([
  ["Maggie", "Coder", "Engineer", 30],
  ["Alex", "Designer", "UX", 25]
]);

createTimeInEvent(employees[0], "2025-06-27 0800");
createTimeOutEvent(employees[0], "2025-06-27 1600");

createTimeInEvent(employees[1], "2025-06-27 0900");
createTimeOutEvent(employees[1], "2025-06-27 1700");

console.log(allWagesFor(employees[0])); // 240
console.log(allWagesFor(employees[1])); // 200
console.log(calculatePayroll(employees)); // 440
