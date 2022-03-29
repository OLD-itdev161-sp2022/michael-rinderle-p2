import React, { Fragment } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import moment from 'moment';

class GoalManager extends React.Component {
    
    // component state
    state = {
        goal: ``,
        genre: ``,
        goals: new Array()
    }

    // styled components

    GoalManagerContainer = styled.div`
        padding-left: 5%;
        padding-right: 5%;
    `
    GoalHeaderContainer = styled.div`
        font-size: 20px;
        padding-bottom: 2em;
    `
    GoalContainer = styled.div`
        width: 100%;   
    `
    GoalListContainer = styled.div`
        width: 100%;
    `
    GoalActionContainer = styled.div`
        text-align: center;
    `

    // load goals on component mount
    componentDidMount() {
      axios.get(`http://localhost:5000/api/goals`)
      .then((response) => {
        this.setState({goals: response.data}); 
      })
      .catch((error) => {
        alert("Error loading goals!");
      });
    }

    // add a goal to your list
    addGoal = (event:any) => {
        if(this.state.goal.trim() == "" || 
           this.state.genre.trim() == "") {
            alert("Missing field, try again after adding a goal!");
        }   
        
        axios.post(`http://localhost:5000/api/goals`, 
        {
            goal: this.state.goal,
            genre: this.state.genre
        })
        .then((response) => {
            // push new goal
           let arr = this.state.goals;
           arr.push(response.data);
           this.setState({goals: arr}); 
           
           this.setState({goal : ''});
           this.setState({genre: ''});
           alert("Goal added!");          
        })
        .catch((error) => {
            this.setState({output: `Error adding goals!`});
        });  
    }

    // delete a goal in your list
    deleteGoal = (id:any) => {
        axios.delete(`http://localhost:5000/api/goals/${id}`)
        .then((response) => {
            // filter out deleted goal in list
            let goals = this.state.goals.filter((obj) => {
                return obj._id !== id;
            });
            this.setState({goals: goals});
            alert("Goal deleted");
        })
        .catch((error) => {
          alert("Error loading goals!");
        });
    }

    // complete a goal in your list
    completeGoal = (goal:any) => {
        if(goal.completed !== null) {
            alert("Goal already completed");
            return;
        }
        // set completion date
        goal.completed = moment(new Date()).format("YYYY/MM/DD");
        // update goal
        axios.put(`http://localhost:5000/api/goals/${goal._id}`, 
        {
            goal: goal
        })
        .then((response) => {

            // filter stale goal in list
            let goals = this.state.goals.filter((obj) => {
                return obj._id !== goal._id;
            });
            // push updated goal to list
            goals.push(response.data);
            this.setState({goals: goals});
            alert("Goal completed");
        })
        .catch((error) => {
            this.setState({output: `Error adding goals!`});
        });  
    }

    // on change listener for goal text area
    onTextAreaChange = (event:any) => {
        this.setState({goal: event.target.value});
    }

    // on change listener for genera select
    onSelectChange = (event:any) => {
        this.setState({genre: event.target.value});
    }

    // render component
    render() {
        return(
            <this.GoalManagerContainer>
                <this.GoalHeaderContainer>
                    <p>Welcome to your online personal goal manager</p>
                </this.GoalHeaderContainer>
                <this.GoalContainer>
                    <form onSubmit={ this.addGoal } className="form">
                        <label>Goal</label> <br />
                        <textarea name="goal" value={ this.state.goal } onChange={this.onTextAreaChange}/><br />

                        <label>Genre</label> <br />
                        <select value={ this.state.genre } onChange={this.onSelectChange}>
                            <option value="">Select</option>
                            <option value="Business">Business</option>
                            <option value="Personal">Personal</option>
                            <option value="Education">Education</option>
                        </select> <br />

                        <input type="submit" value="Add" />
                    </form>
                </this.GoalContainer>
                <this.GoalListContainer>
                    <table>
                        <thead>
                            <tr className="trHeader">
                                <th className="goalHeader">Goal</th>
                                <th className="genreHeader">Genre</th>
                                <th className="createdHeader">Created</th>
                                <th className="completedHeader">Completed</th>
                                <th className="actionHeader">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.goals[0] ? this.state.goals.map((goal) => {
                                return (
                                    <tr key={goal.created}>
                                        <td>{goal.goal}</td>
                                        <td>{goal.genre}</td>
                                        <td>{goal.created.substring(0, 10)}</td>
                                        <td>{ (goal.completed === null ? "Incomplete" : goal.completed.substring(0, 10)) }</td>
                                        <td>
                                            <this.GoalActionContainer>
                                                <button onClick={() => this.deleteGoal(goal._id)}>Delete</button>
                                                <button onClick={() => this.completeGoal(goal)}>Complete</button>
                                            </this.GoalActionContainer>
                                        </td>
                                    </tr>
                                )
                            }) : null }
                        </tbody>
                    </table>

                </this.GoalListContainer>
            </this.GoalManagerContainer>
        );
    }
}

export default GoalManager;