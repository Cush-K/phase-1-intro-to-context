// Your code here
const employeeInfo = ["Gray", "Worm", "Security", 1]

let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
  ]


function createEmployeeRecord(infoArr) {
    return {
        firstName: infoArr[0],
        familyName: infoArr[1],
        title: infoArr[2],
        payPerHour: infoArr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}
// console.log(createEmployeeRecord(employeeInfo))

function createEmployeeRecords(recordsArr){
    return recordsArr.map(createEmployeeRecord);
}


// console.log(createEmployeeRecords(twoRows))


function createTimeInEvent(emplRecIn, dateTime){
    const [date, hour] = dateTime.split(' ');

    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    };

    emplRecIn.timeInEvents.push(timeInEvent);

    return emplRecIn
}


function createTimeOutEvent(emplRecOut, dateTime){
    const [date, hour] = dateTime.split(' ');

    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    };

    emplRecOut.timeOutEvents.push(timeOutEvent);

    return emplRecOut;
}


function hoursWorkedOnDate(empRecWork, date){
   const timeInEvent = empRecWork.timeInEvents.find(event => event.date === date);
   const timeOutEvent = empRecWork.timeOutEvents.find(event => event.date === date);

   if (timeInEvent && timeOutEvent){
    const hoursWorked= (timeOutEvent.hour - timeInEvent.hour)/100;
    return hoursWorked;
   }else{
    return 0;
   }
}

function wagesEarnedOnDate(empRecWork, date){
    const hoursWorked = hoursWorkedOnDate(empRecWork, date);
    return hoursWorked * empRecWork.payPerHour;
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);

    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);

    return totalWages;
}


function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, record) => {
        return total + allWagesFor(record);
    }, 0);

    return totalPayroll;
}
