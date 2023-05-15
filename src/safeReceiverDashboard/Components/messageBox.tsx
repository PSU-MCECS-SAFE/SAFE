import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import {ListItemSecondaryAction} from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MessageControl from './messageControl';
import MessageCard from './MessageCard';

async function fetchMessages() {
  //function to fetchMessages from the database
  //currently not implemented 
  //Some code to get you started (not fully tested!)
  /*   console.log(`in fetch`);
    const response = await fetch('131.252.208.28:3001/message', {
      method: 'GET'
    });
    console.log(`response: ${response}`);
    console.log(`response json: ${response.json()}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const messages = await response.json();
    console.log(`messages: ${messages}`);
    return messages; */
  
    //a different solution to fetch
    /*
    console.log(`in fetch`);
    fetch('131.252.208.28:3001/message', {
      method: 'GET',
    })
      // response from fetch
      .then((response) => {
        console.log(`response: ${response}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(`response json: ${response.json()}`);
        return response.json();
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      }); */
}

const MessageStyles = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: 'calc(100vh - 110px)',
  overflowY: 'auto',
}));

function MessageBox() {
  const [expanded, setExpanded] = useState(false);
  const [dateToDisplay, setDateToDisplay] = useState('05/07/2023');
  const [titleToDisplay, setTitleToDisplay] = useState('hello');
  const [messageToDisplay, setMessageToDisplay] = useState('hello world');
  fetchMessages();

  const handleItemClick = () => {
    setExpanded(!expanded);
    console.log(`clicked`);
    setTitleToDisplay('Hello New World');
    setDateToDisplay('01/01/2020');
    setMessageToDisplay('Hello, this is a new message');
  };

  //This is how handleItemClick should be finally setup after database is connected to the frontend.
  //when a message is clicked the card should be updated to show that specific messages data.
  //that data should be passed in to handleItemClick.
  /*
  const handleItemClick = (title, date, message) => {
    setExpanded(!expanded);
    setTitleToDisplay(title);
    setDateToDisplay(date);
    setMessageToDisplay(message);
  };*/

  function generate(
    element: React.ReactElement,
  ) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((value) =>
      React.cloneElement(element, {
        key: value
      })
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: `90%`,
        maxHeight: '90%',
        mx: 'auto',
      }}
    >
      <MessageControl />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MessageStyles     
           sx={{ 
            mt: 2
           }}>
            <List>
              {generate(
                <ListItem
                  style={{ border: '1px solid #ccc', marginBottom: '10px' }}
                  onClick={handleItemClick}
                >
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: 'green' }}>
                      <SentimentSatisfiedAltIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Subject" secondary="Date" />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </MessageStyles>
        </Grid>
        <Grid item xs={12} md={6}>
          <MessageCard
            date={dateToDisplay}
            title={titleToDisplay}
            message={messageToDisplay}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default MessageBox;
