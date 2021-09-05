
Feature: Show/hide event details

Scenario: An event element is collapsed by default
Given the user hasn't selected an event
When the user views the list of event
Then the event elements are collapsed

Scenario: User can expand an event to see its details
Given the list of events is displayed
When the user clicks on an event element
Then the event element is expanded to show more details

Scenario: User can collapse an event to hide its details
Given the event element has been expanded
When the user clicks to collapse the event element
Then the event element is collapsed back to its default position
