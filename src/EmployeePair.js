const employeePair = (textFile) => {
  const projects = toDict(textFile)

  let currentPair = {
    project: [],
    pair: [],
    days: 0
  };
  let totalWorkedTogether = {};
  
  for (const project in projects) {
    projects[project].flatMap(
      (emp1, index) => projects[project].slice(index+1).map(emp2 => { //goes through all possible combinations of employees
        let days = workedTogether(emp1, emp2)

        //Looks quite messy, but it simply creates a dictionary that tracks the total number of days employees have worked together across projects, repeat entries are possible but they do not influence the end result
        totalWorkedTogether[emp1.empId] = totalWorkedTogether[emp1.empId] || {}
        totalWorkedTogether[emp1.empId][emp2.empId] = totalWorkedTogether[emp1.empId][emp2.empId] || {}
        totalWorkedTogether[emp1.empId][emp2.empId].value ? totalWorkedTogether[emp1.empId][emp2.empId].value += days : totalWorkedTogether[emp1.empId][emp2.empId].value = 0 + days
        if (totalWorkedTogether[emp1.empId][emp2.empId].projects) {
          totalWorkedTogether[emp1.empId][emp2.empId].projects.push(project)
        } else {
          totalWorkedTogether[emp1.empId][emp2.empId].projects = []
          totalWorkedTogether[emp1.empId][emp2.empId].projects.push(project)
        }
        return 0 //a return value is required for map
      })
    )
  }

  for (const emp1 in totalWorkedTogether) {
    for (const emp2 in totalWorkedTogether[emp1]) {
      let days = totalWorkedTogether[emp1][emp2].value
      let project = totalWorkedTogether[emp1][emp2].projects
      if (days > currentPair.days) {
        currentPair.days = days
        currentPair.project = project
        currentPair.pair = [emp1, emp2]
        console.log(currentPair)
      }
    }
  }

  return currentPair
}


const toDict = (file) => { //transform the string that is a text file to a workable dict
  const splitInput = file.split('\n')
  let dict = {} //empty dictionary
  splitInput.forEach(element => {
    let splitElement = element.split(', ')
    let key = splitElement[1]  //project id is our key
    
    let tempObject = {
      empId: splitElement[0],
      started: new Date(splitElement[2].trim()),
      //the double new Date() is to get the current date at midnight, to (hopefully) avoid timezone issues
      ended: splitElement[3].trim() === 'NULL' ? new Date(new Date().setHours(0,0,0,0)) : new Date(splitElement[3].trim()) //if NULL take current date
    }

    dict[key] = dict[key] || [] //create a new array if there isnt one yet
    dict[key].push(tempObject)
  })
  return dict
}



const workedTogether = (emp1, emp2) => { //calculate how many days two employees have worked together
  console.log(emp1,emp2)
  if (emp1.started <= emp2.ended && emp1.ended >= emp2.started) { //check for overlap

    return toDays(Math.min(emp1.ended, emp2.ended), Math.max(emp1.started, emp2.started))
  } else {
    return false
  }
}

const toDays = (end, start) => { //convert milliseconds to days
  let day = 1000 * 60 * 60 * 24 //number of milliseconds in a day
  return Math.round((end - start)/day)
}

export default employeePair