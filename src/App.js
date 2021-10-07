import React, { Component } from 'react';
import './App.css';
import Taskform from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1
      },
      keywork: '',

      sortBy: 'name',
      sortValue: 1,
    }
  }
componentDidMount(){
  if(localStorage&&localStorage.getItem('tasks')){
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    this.setState({
      tasks: tasks
    })
  }
}

  onGenderateData = () => {
    var tasks = [
      {
        id: this.generateID(),
        name: 'Hoc Lap Trinh',
        status: true,
      },
      {
        id: this.generateID(),
        name: 'Hoc toan',
        status: true,
      },
      {
        id: this.generateID(),
        name: 'Hoc tieng anh',
        status: false,
      },
    ]
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  s4(){
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }
  generateID(){
    return this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4();
  }
  onCloseForm = ()=>{
    this.setState({
      isDisplayForm: false
    })
  }
  onShowForm = ()=>{
    this.setState({
      isDisplayForm: true
    })
  }
  onToggleForm = ()=>{
    this.setState({
      isDisplayForm : !this.state.isDisplayForm
    });
  }
  onSubmit = (data)=>{
    
    var { tasks } =this.state;
    if(data.id === ''){
      data.id = this.generateID;
      tasks.push(data);
    }else{
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.onCloseForm();
  }
  onUpdateStatus = (id)=>{
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  findIndex = (id)=>{
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task,index)=>{
      if(task.id === id){
        result = index;
      }
    });
    return result;
  }
  onDelete = (id)=>{
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  onUpdate = (id)=>{
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    })
    this.onShowForm();
  }
  onFilter =(filterName, filterStatus)=>{
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }
  onSearch = (keywork)=>{
    this.setState({
      keywork: keywork
    })
  }
  onSort = (sortBy, sortValue)=>{
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    })
    
  }


  render(){
    var { tasks, isDisplayForm, taskEditing, filter, keywork, sortBy, sortValue } = this.state;
    if(filter){
      if(filter.name){
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        })
      }
      tasks = tasks.filter((task) => {
        if(filter.status === -1){
          return task;
        }else{
          return task.status === (filter.status === 0 ? true : false)
        }
      })
    }
    if(keywork){
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keywork) !== -1;
      })
    }
    if(sortBy==='name'){
      tasks.sort((a,b)=>{
        if(a.name>b.name) return sortValue;
        else if(a.name<b.name) return -sortValue;
        else return 0;
      })  
    }else{
      tasks.sort((a,b)=>{
        if(a.status>b.status) return sortValue;
        else if(a.status<b.status) return -sortValue;
        else return 0;
      })  
    }

    var elmTasksForm = isDisplayForm === true ?  <Taskform taskEditing={taskEditing} onSubmit={this.onSubmit} /> : '';
    return(
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={isDisplayForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                {elmTasksForm}
            </div>
            <div className={isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" 
            :"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                <button type="button" className={isDisplayForm === true ? "btn btn-warning" : "btn btn-primary" } onClick= {this.onToggleForm}>
                    <span className="fa fa-plus mr-5"></span>
                    {isDisplayForm === true ? "Tắt Cửa Sổ" 
                    :"+Thêm Công Việc"}
                </button>
                <button type="button" className="btn btn-danger ml-5" onClick = {this.onGenderateData}>
                    <span className="fa fa-plus mr-5"></span>Hiện Dữ Liệu
                </button>

                <Control
                onSearch={this.onSearch}
                onSort={this.onSort}
                ></Control>
                
                <TaskList
                tasks={tasks} 
                onUpdateStatus={this.onUpdateStatus} 
                onDelete={this.onDelete}
                onUpdate={this.onUpdate}
                onFilter={this.onFilter}
                ></TaskList>
            </div>
        </div>
    </div>
    );
  }
}

export default App;
