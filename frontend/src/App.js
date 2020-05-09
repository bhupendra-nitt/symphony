import React from 'react';
import axios from 'axios';
import './App.scss';
import Table from './Table'
class  App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      delimiter: ',',
      lines: 2,
      data: [],
      error: false
    }
  }

  componentDidMount () {
    const { delimiter, lines } = this.state;
    const response =  this.getList(delimiter, lines);
    if(response) {
      this.setState({ data: response.data })
    }
  }

  getList = (delimiter, lines) => {
    axios.get(`http://localhost:5000/list?delimter=${delimiter}&lines=${lines}`, {
  })
    .then(
      (result) => {
        console.log(result)
        this.setState({
          data: result.data
        });
      },
      (error) => {
        this.setState({
          error: true,
        });
      }
    )
  }

  updateData = _ =>  {
    const { delimiter, lines } = this.state;
    const response = this.getList(delimiter, lines);
    if(response) {
      this.setState({ data: response.data })
    }
  }

  handleUploadFile = (event) => {
    const files = event.target.files
    const formData = new FormData()
    formData.append('file', files[0])
    axios.post('http://localhost:5000/upload-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
  }

  render () {
    const { data, lines, delimiter } = this.state;
    return (
      <div className="app">
            <div className="app__delimiter-container">Delimiter: 
              <input
                value={delimiter}
                onChange={e => this.setState({delimiter: e.target.value})}
              /></div>
            <div className="app__lines-container">Lines: 
              <input
                onChange={e => this.setState({ lines: e.target.value })}
                value={lines}
              /></div>
            <button onClick={this.updateData}>Refetch</button>
            <Table data={data}/>
          <div>
            <input type="file" name="table_file" onChange={(e) => this.handleUploadFile(e)}/>
           <button onClick={this.updateData}>Refresh</button>
          </div>
      </div>
    );
  }
}

export default App;
