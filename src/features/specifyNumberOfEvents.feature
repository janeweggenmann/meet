
Feature: Specify number of events

Scenario: When user hasn’t specified a number, 32 is the default number
Given the user has not specified a number
When the list of events is displayed
Then the number of events shown is 32 by default

Scenario: User can change the number of events they want to see
Given the list of events is displayed
When the user has entered the number of events they want to see
Then the app shows the number of events the user has entered