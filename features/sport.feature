Feature: Daily Mail Sport Page Functionality

	Scenario Outline: Retrieve the position and points of a Premier League team.
    	Given I am on the Daily Mail Video Page
    	When I click on the Sport Menu
    	And I retrieve the position and points for "<team>"
    	Then the position of that team should be "<expectedPosition>"
    	And the points of that team should be "<expectedPoints>"

	Examples:
    	| team        | expectedPosition | expectedPoints |
    	| Man Utd     | 5                | 12             |
    	| Chelsea     | 2                | 20             |
    	| Liverpool   | 1                | 22             |