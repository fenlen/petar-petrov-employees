import React, {useRef, useState} from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import './App.css';
import employeePair from './EmployeePair.js'
import employeePairWithMap from './EmployeePairWithMap'

const App = () => {
  const [employees, setEmployees] = useState('');
  // const inputFile = useRef(null);
  const inputFiletest = useRef(null);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   inputFile.current.files[0].text().then(text => {
  //   setEmployees(employeePair(text))
  // })
  // }

  const submitHandler2 = (e) => {
    e.preventDefault();
    inputFiletest.current.files[0].text().then(text => {
      setEmployees(employeePairWithMap(text))
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={submitHandler2}>
          <label>
            Upload:
            <input type='file' id='file2' ref={inputFiletest} />
          </label>
          <button type="submit">Submit</button>
        </form>
        <Table className="Table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Employee ID #1</TableCell>
              <TableCell align="right">Employee ID #2</TableCell>
              <TableCell align="right">Project ID</TableCell>
              <TableCell align="right">Days worked</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees !== '' && employees.projects.map(project => {
              return <TableRow>
                <TableCell align="right">{employees.pair[0]}</TableCell>
                <TableCell align="right">{employees.pair[1]}</TableCell>
                <TableCell align="right">{project[0]}</TableCell>
                <TableCell align="right">{project[1]}</TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
        <div>Total days worked: {employees.totalDays}</div>
      </header>
    </div>
  );
}

export default App;
