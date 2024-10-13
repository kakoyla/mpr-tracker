# MPR Tracker

MPR Tracker is a Vue.js application designed to help football coaches and team managers track Minimum Play Requirements (MPR) for their players.

Try it now: [MPR Tracker App](https://kakoyla.github.io/mpr-tracker/#/)

## Features

- **Player Management**: Add, edit, and remove players from your team roster.
- **Lineup Management**: Create, edit, and delete lineups for your team.
- **Play Tracking**: Easily track which players are on the field for each play.
- **MPR Monitoring**: View and manage each player's progress towards meeting their minimum play requirements.
- **Data Import/Export**: Ability to export team data and import it back, facilitating data backup and transfer between devices.
- **Responsive Design**: Works on both desktop and mobile devices for on-the-go tracking.
- **Undo Last Play**: Reverse the most recently saved play to correct errors or adjust for game changes.

## How to Use

1. **Setup**:
   - Add players to your team roster.
   - Set the minimum number of plays required for each player.
   - Create lineups if desired.

2. **Player Tracking**:
   - Toggle between "On Field" and "On Bench" modes.
   - Click on player numbers to mark them as active for the current play.
   - Use the "Load Lineup" feature to quickly select a pre-defined group of players.
   - Click "Save Play" to record the current set of active players.
   - Click "Undo Last Play" to reverse the most recently saved play, for correcting errors, adapting to last-minute changes, or adjusting for flags on the play.

3. **View Team MPR**:
   - Check the progress of each player towards their minimum play requirement.
   - Edit play counts if needed.

4. **Data Management**:
   - Use the Export feature to save your team data.
   - Use the Import feature to load previously saved team data.
   - Clear all plays or remove the entire team as needed.

## Example Roster

To help you get started or test the import feature, we've provided an example roster file:
[Example Team Data (JSON)](./team_data_example.json)

You can download this file and use it to test the import functionality or as a template for creating your own team data.

## Installation for Local Development

1. Clone the repository:
   ```
   git clone https://github.com/your-username/mpr-tracker.git
   ```
2. Navigate to the project directory:
   ```
   cd mpr-tracker
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run the development server:
   ```
   npm run serve
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.