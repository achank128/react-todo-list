import React , { Component } from 'react';

class TarkForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id:'',
            name: '',
            status: false,
        }
    }
    componentWillMount(){
        if(this.props.taskEditing){
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status,
            })
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps&&nextProps.taskEditing){
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status,
            })
        }
    }
    onChange = (event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value  === 'true' ? true : false
        }
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event)=>{
        event.preventDefault()
        this.props.onSubmit(this.state);
        //close
        this.onClear();
    }
    onClear = ()=>{
        this.setState({
            name: '',
            status: false
        })
    }
    render(){
        var { id } = this.state;
        return (
            
            <div className={id !== '' ? "panel panel-primary" : "panel panel-warning"}>
            <div className="panel-heading">
                <h3 className="panel-title">
                    {id !== '' ? "Cập Nhật Công Việc" : "Thêm Công Việc"}
                </h3>
            </div>
            <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input type="text" className="form-control" 
                        name="name" value={this.state.name} onChange={this.onChange} />
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control" 
                    name="status" value={this.state.status} onChange={this.onChange} >
                        <option value={false}>Chưa Làm</option>
                        <option value={true}>Đã Làm</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success">Lưu</button>&nbsp;
                        <button type="submit" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
        );
    }
}

export default TarkForm;