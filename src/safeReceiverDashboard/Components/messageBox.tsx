import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemSecondaryAction,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MessageControl from './messageControl';
import MessageCard from './MessageCard';
//7 total sentiment icons. If sentiment analysis is expanded upon to have more ranges, more icons can be imported and used

async function fetchMessages() {
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
    });
}

// ###################################################################################################################################################

const MessageStyles = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  //   border: '1px solid #ccc',
  height: 'calc(100vh - 110px)', //Height = viewport height minus 110px
  //   marginTop: '-20px',
  overflowY: 'auto',
}));

function generate(
  element: React.ReactElement,
  handleClick: Function,
  isExpanded: boolean
) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((value) =>
    React.cloneElement(element, {
      key: value,
      handleClick,
      isExpanded,
    })
  );
}

function MessageBox() {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [dateToDisplay, setDateToDisplay] = useState('05/07/2023');
  const [titleToDisplay, setTitleToDisplay] = useState('hello');
  const [messageToDisplay, setMessageToDisplay] = useState('hello world');
  fetchMessages();
  /*   useEffect(() => {
      const getMessages = async () => {
        try {
          const data = await fetchMessages();  
          setMessages(data);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
      getMessages();
    }, []); */

  const handleItemClick = () => {
    setExpanded(!expanded);
    console.log(`clicked`);
    setMessageToDisplay('hello new world');
  };

  // set it up so the data loaded to for the chosen message
  /*
  const handleItemClick = (title, date, message) => {
    setExpanded(!expanded);
    setTitleToDisplay(title);
    setDateToDisplay(date);
    setMessageToDisplay(message);
  };*/

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
          <MessageStyles>
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
                </ListItem>,
                handleItemClick,
                expanded
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
