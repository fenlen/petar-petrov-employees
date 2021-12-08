const employeePairWithMap = textFile => {
  const projects = toMap(textFile);
  let pairs = new Map();

  // console.log(projects);
  projects.forEach((value, key) => {
    let employeesInProject = Array.from(value).sort()

    for (let i = employeesInProject.length - 1; i >= 1; i--) {
      let currentEmployee = employeesInProject.pop();
      employeesInProject.map(employee => {
        let haveWorked = workedTogetherwithMap(currentEmployee, employee);
        if (haveWorked) {
          let employeeKey = employee[0]
          let currentEmployeeKey = currentEmployee[0]
          let placeholder = `${employeeKey}-${currentEmployeeKey}` // for readability
          pairs.has(placeholder) ? pairs.set(placeholder, pairs.get(placeholder) + haveWorked) : pairs.set(placeholder, haveWorked)
        }
        return 0
      })
    };
  });
  console.log(pairs)

  let currentPair = {
    project: [0],
    pair: [],
    days: 0
  };
  
  Array.from(pairs, pair => {
    console.log(pair)
    if (pair[1] > currentPair.days) {
      currentPair = {
        project: [0],
        pair: pair[0].split('-'),
        days: pair[1]
      }
    }
    return 0
  })
  return currentPair;
};

const toMap = file => {
  const splitInput = file.split('\n'); //split into lines
  let projects = new Map()

  splitInput.forEach(line => {
    let splitLine = line.split(', '); //split each line
    let key = splitLine[1]; //projectId
    let project;

    projects.has(key) ? project = projects.get(key) : project = new Map(); //if a project exists use it, otherwise make a new one
    let employee = new Map();

    employee.set('started', new Date(convertDate(splitLine[2])));
    employee.set('ended', splitLine[3].trim() === 'NULL' ? new Date(new Date().setHours(0, 0, 0, 0)) : new Date(convertDate(splitLine[3]))) //take current date at midnight if NULL, double Date constructor since setHours messes up the format for some reason

    project.set(splitLine[0], employee);
    projects.set(key, project)
  });

  return projects
};

const convertDate = dateString => {
  let yy, mm, dd;
  [yy, mm, dd] = dateString.split('-');
  return [yy, mm, dd] //January is 0
};

const workedTogetherwithMap = (emp1, emp2) => { //calculate how many days two employees have worked together
  // console.log(emp1, emp2)
  emp1 = emp1[1]
  emp2 = emp2[1]
  if (emp1.get('started') <= emp2.get('ended') && emp1.get('ended') >= emp2.get('started')) { //check for overlap
    return toDays(Math.min(emp1.get('ended'), emp2.get('ended')), Math.max(emp1.get('started'), emp2.get('started')))
  } else {
    return false
  }
}

const toDays = (end, start) => { //convert milliseconds to days
  let day = 1000 * 60 * 60 * 24 //number of milliseconds in a day
  return Math.round((end - start) / day)
}

export default employeePairWithMap