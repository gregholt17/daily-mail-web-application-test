Feature: Daily Mail Video Page Functionality

    Background:
        Given I am on the Daily Mail Video Page

    Scenario: Start Video Playback
        When I click on the video to begin playback
        Then the video should start playing

    Scenario: Select Next Video
        When I click on the next video button
        Then the next video should be selected

    Scenario: Select Previous Video
        When I click on the previous video button
        Then the previous video should be selected

    Scenario: Pause Video Playback
        When I click the video again to pause playback
        Then the video should pause

    Scenario: Mute and Unmute Video Playback
        When I toggle the main video speaker to mute
        Then the main video volume should be 0
        And I wait for 1 second
        When I toggle the main video speaker to unmute
        Then the main video volume should be 3
