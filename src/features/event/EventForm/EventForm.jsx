import React, { Component } from 'react'
import { reduxForm,Field } from "redux-form";
import { connect } from "react-redux";
import {composeValidators,combineValidators,isRequired,hasLengthGreaterThan} from 'revalidate';
import cuid from 'cuid';
import { Segment,Form,Button,Grid,Header} from 'semantic-ui-react';
import {createEvent,updateEvent} from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import TextArea from '../../../app/common/form/TextArea';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
 
  };

  if(eventId && state.events.length > 0){
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {
    initialValues: event
  }
}

const actions = {
  createEvent,
  updateEvent
}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'Please provide a category'}),
  description: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({message: 'Please provide a category'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
})
class EventForm extends Component {

    // onFormSubmit = (evt)=> {
    //     evt.preventDefault();
    //     if(this.state.event.id){
    //       this.props.updateEvent(this.state.event);
    //       this.props.history.goBack();
    //     }else {
    //       const newEvent = {
    //         ...this.state.event,
    //         id: cuid(),
    //         hostPhotoURL: '/assets/user.png'
    //       }
    //       this.props.createEvent(newEvent);
    //       this.props.history.push('/events')
    //     }
    //     //console.log(this.state.event);
    // }

     onFormSubmit = (values)=> {
        if(this.props.initialValues.id){
          this.props.updateEvent(values);
          this.props.history.goBack();
        }else {
          const newEvent = {
            ...values,
            id: cuid(),
            hostPhotoURL: '/assets/user.png',
            hostedBy: 'Bob'
          }
          this.props.createEvent(newEvent);
          this.props.history.push('/events')
        }
    }

    render() {
      const { invalid, submitting, pristine} = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details'></Header>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                // multiple={true}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                type="text"
                row={3}
                component={TextArea}
                placeholder="Tell us about your event"
              />
              <Header sub color='teal' content='Event Location Details'></Header>
              <Field
                name="city"
                type="text"
                component={TextInput}
                placeholder="Event City"
              />
              <Field
                name="venue"
                type="text"
                component={TextInput}
                placeholder="Event Venue"
              />
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat='YYYY/MM/DD HH:mm'
                timeFormat='HH:mm'
                showTimeSelect
                placeholder="Event Date"
              />
              <Button
               disabled={invalid || submitting || pristine} positive type="submit">
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(mapState,actions)(reduxForm({form: 'eventForm', enableReinitialize:true,validate})(EventForm));