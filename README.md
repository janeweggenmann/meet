# Achievement 4 Project: Meet App
Last Updated: August 29, 2021

## Objective
The objective of this project is to build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

### Key Features
1. Filter events by city.
2. Show/hide event details.
3. Specify number of events.
4. Use the app when offline.
5. Add an app shortcut to the home screen.
6. View a chart showing the number of upcoming events by city.

### User Stories
1. As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city.
2. As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.
3. As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.
4. As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.
5. As a user, I would like to be able to add the app shortcut to my home screen so that I can open the app faster.
6. As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

### Scenarios
#### Feature: Show/hide event details
Scenario 1: An event element is collapsed by default
  > **Given** the user hasn't selected an event  
  > **When** the user views the list of event  
  > **Then** the event elements are collapsed  

Scenario 2: User can expand an event to see its details
  > **Given** the list of events is displayed    
  > **When** the user clicks on an event element    
  > **Then** the event element is expanded to show more details  

Scenario 3: User can collapse an event to hide its details
  > **Given** the event element has been expanded  
  > **When** the user clicks to collapse the event element    
  > **Then** the event element is collapsed back to its default position    

#### Feature: Specify number of events
Scenario 1: When user hasn’t specified a number, 32 is the default number
  > **Given** the user has not specified a number  
  > **When** the list of events is displayed    
  > **Then** the number of events shown is 32 (default). 

Scenario 2: User can change the number of events they want to see
  > **Given** the list of events is displayed  
  > **When** the user has entered the number of events they want to see    
  > **Then** the app shows the number of events the user has entered    

#### Feature: Use the app when offline
Scenario 1: Show cached data when there’s no internet connection
  > **Given** there is no internet connection   
  > **When** the user opens the app  
  > **Then** use cached data to display information  

Scenario 2: Show error when user changes the settings (city, time range)
  > **Given** there is no internet connection  
  > **When** the user changes the settings  
  > **Then** show an error message that the user is offline

#### Feature: Data visualization
Scenario 1: Show a chart with the number of upcoming events in each city
  > **Given** the user would like a visual representation of upcoming events  
  > **When** the user clicks on charts  
  > **Then** show a chart with the number of upcoming events in each city

