import React,{Component} from 'react';
import { Container } from "semantic-ui-react";
import { Route,Switch } from 'react-router-dom';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import EventForm from '../../features/event/EventForm/EventForm';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import HomePage from '../../features/home/HomePage';
class App extends Component {
  render(){
     return (
       <div>
         <Switch>
            <Route path="/" exact component={HomePage} />
         </Switch>

         <Route path="/(.+)" render={()=> (
          <div>
           <NavBar />
           <Container className="main">
             <Switch>
               <Route path="/events" exact component={EventDashboard} />
               <Route path="/event/:id" exact component={EventDetailedPage}/>
               <Route path="/people" exact component={PeopleDashboard} />
               <Route path="/profile/:id" exact component={UserDetailedPage} />
               <Route path="/settings" exact component={SettingsDashboard} />
               <Route path="/createEvent" exact component={EventForm} />
             </Switch>
           </Container>
         </div>
         )} />
     
       </div>
     ); 
  }
}

export default App;

